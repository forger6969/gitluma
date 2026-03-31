const crypto = require("crypto");
const axios = require("axios");
const Project = require("../models/projects.model");

// функция проверки подписи GitHub
function verifySignature(req, secret) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", secret);
  // GitHub подписывает "raw body", поэтому нужно убедиться, что express не парсит JSON до проверки
  const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  return signature === digest;
}

function escapeMarkdown(text) {
  return text.replace(/([_*[\]()~`>#+-=|{}.!])/g, "\\$1");
}

// вебхук для GitHub
async function githubWebhook(req, res, next) {
  try {
    const payload = req.body;
    const event = req.headers["x-github-event"];

    if (!payload || !payload.repository) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // ищем проект по репо fullname
    const project = await Project.findOne({ repo_fullname: payload.repository.full_name });
    if (!project) return res.status(404).json({ message: "Project not found" });

    // проверяем подпись
    if (!verifySignature(req, project.webhook_secret)) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    console.log("GitHub event:", event);
    console.log("Payload:", payload);

    // обработка push события
if (event === "push") {
  const commits = payload.commits.map(
    c => `• ${escapeMarkdown(c.author.name)}: ${escapeMarkdown(c.message)}`
  ).join("\n");

  const repoName = escapeMarkdown(payload.repository.full_name);

  const text = `📦 Push в репозиторий *${repoName}*\n${commits}`;

  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "MarkdownV2"
    }
  );
}


    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  githubWebhook
};