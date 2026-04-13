const crypto = require("crypto");
const axios = require("axios");
const Project = require("../models/projects.model");
const Commit = require("../models/commit.model");
const User = require("../models/user.model");
const { sendNotifyByID, sendCommitToPorjectRoom } = require("../socket");
const Notification = require("../models/notification.model");
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
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const notfication = await Notification.create({
    title:"Новый коммит!",
    text:`В проекте ${project.repo_name} новые коммиты! нажмите чтобы посмотреть`,
    redirect_url:`${process.env.FRONTEND_URL}/dashboard/project/${project._id}`,
    user:user._id,
    type:"commit"
  })

  const commit = await Commit.create({
    commit_id:payload.head_commit.id,
    author_username:payload.head_commit.author.username || payload.head_commit.author.name,
    author_github_id:payload.sender.id,
    commit_author:user?._id || null,
    commit_message:payload.head_commit.message,
    project:project._id,
    repo_id:payload.repository.id,
    repo_fullname:payload.repository.full_name,
    commit_date:payload.head_commit.timestamp
  })

sendCommitToPorjectRoom(project._id , {
  commit
})    
project.commits.push(commit._id);
await project.save();
  sendNotifyByID(user._id , notfication)

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

    console.log(commit);
    

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