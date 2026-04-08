const crypto = require("crypto");
const axios = require("axios");
const Project = require("../models/projects.model");
const Commit = require("../models/commit.model");
const User = require("../models/user.model");
const { sendNotifyByID } = require("../socket");
// функция проверки подписи GitHub
function verifySignature(req, secret) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  return signature === digest;
}

function escapeMarkdown(text) {
  return text.replace(/([_*[\]()~`>#+-=|{}.!])/g, "\\$1");
}

async function githubWebhook(req, res, next) {
  try {
    const payload = req.body;
    const event = req.headers["x-github-event"];

    if (!payload || !payload.repository) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const project = await Project.findOne({ repo_fullname: payload.repository.full_name });
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!verifySignature(req, project.webhook_secret)) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    console.log("GitHub event:", event);
    console.log("Payload:", payload);

if (event === "push") {
 
  const user = await User.findOne({github_id:payload.sender.id})
  sendNotifyByID(user._id , {message:"text test"})
  for (const c of payload.commits){


   const commit = await Commit.create({
      commit_id:c.id,
      author_username:c.author.username || c.author.name,
      author_github_id:payload.sender.id,
      commit_author:user?._id || null,
      commit_message:c.message,
      project:project._id,
      repo_id:payload.repository.id,
      repo_fullname:payload.repository.full_name,
      commit_date:c.timestamp
    })

    project.commits.push(commit._id)
    await project.save()

  }

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