const Project = require("../models/projects.model");

const githubWebhook = async (req, res, next) => {
  try {
    const payload = req.body;
    const event = req.headers["x-github-event"];

    // Получаем проект по репозиторию
    const project = await Project.findOne({ repo_fullname: payload.repository.full_name });
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Проверяем подпись
    if (!verifySignature(req, project.webhook_secret)) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    console.log("GitHub event:", event);
    console.log("Payload:", payload);

    // Push -> отправка в Telegram
    if (event === "push") {
      const commits = payload.commits.map(c => `• ${c.author.name}: ${c.message}`).join("\n");
      const text = `📦 Push в репозиторий *${payload.repository.full_name}*\n${commits}`;

      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
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