const crypto = require("crypto");
const axios = require("axios");
const Project = require("../models/projects.model");
const Commit = require("../models/commit.model");
const User = require("../models/user.model");
const { sendNotifyByID, sendCommitToPorjectRoom, putTask } = require("../socket");
const Notification = require("../models/notification.model");
const Task = require("../models/task.model");

function verifySignature(req, secret) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;
  const body = req.rawBody ?? Buffer.from(JSON.stringify(req.body));
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
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

    const project = await Project.findOne({
      repo_fullname: payload.repository.full_name,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!verifySignature(req, project.webhook_secret)) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    if (event === "push") {
      const user = await User.findOne({ github_id: payload.sender.id });

      const savedCommits = [];
      for (const c of payload.commits) {
        const existing = await Commit.findOne({ commit_id: c.id });
        if (existing) continue;

        const newCommit = await Commit.create({
          commit_id: c.id,
          author_username: c.author.username || c.author.name,
          author_github_id: payload.sender.id,
          commit_author: user?._id || null,
          commit_message: c.message,
          project: project._id,
          repo_id: payload.repository.id,
          repo_fullname: payload.repository.full_name,
          commit_date: c.timestamp,
        });

        project.commits.push(newCommit._id);
        savedCommits.push(newCommit);
      }

      if (savedCommits.length === 0) {
        return res.status(200).json({ success: true, skipped: true });
      }

      await project.save();

      let notification = null;
      if (user) {
        notification = await Notification.create({
          title: "Новый коммит!",
          text: `В проекте ${project.repo_name} новые коммиты! Нажмите, чтобы посмотреть`,
          redirect_url: `${process.env.FRONTEND_URL}/dashboard/project/${project._id}`,
          user: user._id,
          type: "commit",
        });
      }

      const tasks = await Task.find({
        project_id: project._id,
        status: { $in: ["todo", "in_progress"] },
      });

      for (const commit of savedCommits) {
        for (let index = 0; index < tasks.length; index++) {
          const element = tasks[index];

          const isThere = commit.commit_message.includes(element.key);

          if (isThere) {
            element.status = "done";
            element.completedAt = new Date();
            element.linked_commit = commit._id;

            if (user) {
              element.completedAt_user.user = user._id;
            } else {
              element.completedAt_user.github_username = commit.author_username;
            }

            await element.save();
            commit.task = element._id;
            await commit.save();

            const populatedTask = await element.populate([
              { path: "assigned_user", select: "username avatar_url email" },
              { path: "assigned_by", select: "username avatar_url" },
              { path: "completedAt_user.user", select: "username avatar_url" },
            ]);

            putTask(project._id.toString(), populatedTask)
          }
        }
        sendCommitToPorjectRoom(project._id.toString(), { commit });
      }

      if (user && notification) {
        sendNotifyByID(user._id.toString(), notification);
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    next(err);
  }
}

module.exports = {
  githubWebhook,
};




