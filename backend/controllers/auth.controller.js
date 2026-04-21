const axios = require("axios");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generate_access_token, generate_refresh_token, refresh_access_token } = require("../utils/token");

// ─── Шаг 1: Редирект на GitHub OAuth страницу ───────────────────────────────
// Фронт делает: window.location.href = `${API_URL}/api/auth/github`
// Бэкенд генерирует случайный state (защита от CSRF), сохраняет в cookie,
// и перенаправляет пользователя на страницу авторизации GitHub
const auth_github = async (req, res, next) => {
  try {
    const state = crypto.randomBytes(16).toString("hex");

    // state сохраняем в httpOnly cookie — проверим его при callback
    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 5 * 60 * 1000, // 5 минут — дольше не нужно
      sameSite: "lax"
    });

    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.BACKEND_URL}/api/auth/github/callback`)}&scope=repo%20read:user%20user:email&state=${state}`;

    return res.redirect(redirectUri);
  } catch (error) {
    next(error);
  }
};

// ─── Шаг 2: GitHub возвращает code → получаем токен → логиним/регаем юзера ──
// GitHub редиректит сюда после того как пользователь нажал "Authorize"
// Фронт этот URL не вызывает напрямую — только GitHub
const callback_github = async (req, res, next) => {
  try {
    const code = req.query.code;
    const githubState = req.query.state;
    const cookieState = req.cookies.oauth_state;

    // CSRF проверка: state из URL должен совпасть с тем что сохранили в cookie
    if (!githubState || githubState !== cookieState) {
      return res.status(403).send("Invalid state");
    }

    // Меняем code на GitHub access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const access_token_github = tokenResponse.data.access_token;

    // Получаем данные профиля GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token_github}` },
    });

    const githubUser = userResponse.data;

    // Email может быть скрыт в публичном профиле — запрашиваем отдельно
    let email = githubUser.email;
    if (!email) {
      const emailResponse = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${access_token_github}` },
      });
      const primaryEmail = emailResponse.data.find(e => e.primary && e.verified);
      email = primaryEmail?.email || null;
    }

    const existingUser = await User.findOne({ github_id: githubUser.id });

    if (existingUser) {
      // ── Существующий юзер — обновляем данные профиля с GitHub ──────────────
      // Аватар, имя, email, bio могут измениться — синхронизируем при каждом логине
      existingUser.github_token = access_token_github;
      existingUser.avatar_url   = githubUser.avatar_url;
      existingUser.name         = githubUser.name;
      existingUser.bio          = githubUser.bio;
      if (email) existingUser.email = email;
      await existingUser.save();

      const access_token = generate_access_token({ id: existingUser._id });
      const refresh_token = await generate_refresh_token({ id: existingUser._id });

      if (!access_token.success)
        return res.status(500).json({ success: false, error: access_token.error || "Access token error" });
      if (!refresh_token.success)
        return res.status(500).json({ success: false, error: refresh_token.error || "Refresh token error" });

      // is_new_user=false → фронт пропускает onboarding, идёт на /dashboard
      return res.redirect(
        `${process.env.FRONTEND_URL}/github/callback?access_token=${access_token.token}&refresh_token=${refresh_token.token}&is_new_user=false`
      );
    }

    // ── Новый юзер — создаём аккаунт ─────────────────────────────────────────
    const newUser = await User.create({
      github_id:    githubUser.id,
      username:     githubUser.login,
      github_token: access_token_github,
      avatar_url:   githubUser.avatar_url,
      email,
      name:         githubUser.name,
      bio:          githubUser.bio,
    });

    const access_token = generate_access_token({ id: newUser._id });
    const refresh_token = await generate_refresh_token({ id: newUser._id });

    if (!access_token.success)
      return res.status(500).json({ success: false, error: access_token.error || "Access token error" });
    if (!refresh_token.success)
      return res.status(500).json({ success: false, error: refresh_token.error || "Refresh token error" });

    // is_new_user=true → фронт показывает onboarding wizard перед dashboard
    return res.redirect(
      `${process.env.FRONTEND_URL}/github/callback?access_token=${access_token.token}&refresh_token=${refresh_token.token}&is_new_user=true`
    );

  } catch (err) {
    next(err);
  }
};

// ─── Обновление access token через refresh token ─────────────────────────────
// Фронт вызывает когда access token истёк (обычно перехватывается в axios interceptor)
// POST /api/auth/refresh  body: { refresh_token: "..." }
const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    await refresh_access_token(refresh_token, req, res);
  } catch (err) {
    next(err);
  }
};

// ─── Выход из аккаунта ────────────────────────────────────────────────────────
// Удаляет конкретный refresh token из базы — токен становится невалидным
// POST /api/auth/logout  body: { refresh_token: "..." }
// Фронт должен также удалить токены из localStorage/cookie на своей стороне
const logout = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ success: false, message: "refresh_token is required" });
    }

    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // bcrypt.compare каждый токен — находим нужный и удаляем по _id
    let targetId = null;
    for (const rt of user.refresh_tokens) {
      if (await bcrypt.compare(refresh_token, rt.tokenHash)) {
        targetId = rt._id;
        break;
      }
    }

    if (targetId) {
      await User.findByIdAndUpdate(id, {
        $pull: { refresh_tokens: { _id: targetId } }
      });
    }

    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

// ─── Выход со всех устройств ──────────────────────────────────────────────────
// Удаляет ВСЕ refresh токены пользователя — разлогинивает на всех устройствах
// POST /api/auth/logout-all
const logoutAll = async (req, res, next) => {
  try {
    const { id } = req.user;

    await User.findByIdAndUpdate(id, { $set: { refresh_tokens: [] } });

    res.json({ success: true, message: "Logged out from all devices" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  auth_github,
  callback_github,
  refreshToken,
  logout,
  logoutAll,
};