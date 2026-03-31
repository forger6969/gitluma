const crypto = require("crypto");
const axios = require("axios");

const verifySignature = (req, secret) => {
  const signature = req.headers["x-hub-signature-256"];
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  return signature === digest;
};

const githubWebhook = async (req, res, next) => {
  try {
    const projectSecret = req.headers["x-project-secret"]; // например, можно передавать секрет проекта в заголовке или хранить в БД по repo id
    if (!verifySignature(req, projectSecret)) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    const event = req.headers["x-github-event"];
    const payload = req.body;

    console.log("GitHub event:", event);
    console.log("Payload:", payload);

    // если это push, отправляем сообщение в Telegram
    if (event === "push") {
        
      const commits = payload.commits.map(
        (c) => `• ${c.author.name}: ${c.message}`
      ).join("\n");

      const text = `📦 Push в репозиторий *${payload.repository.full_name}*\n${commits}`;

      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID, // укажи ID чата или пользователя
          text,
          parse_mode: "Markdown"
        }
      );
    }

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  githubWebhook
};