const { generateTaskKey } = require("../utils/generate");
const Project = require("../models/projects.model");
const User = require("../models/user.model");
const Task = require("../models/task.model");
const Commit = require("../models/commit.model");
const Notification = require("../models/notification.model");
const { sendNotifyByID } = require("../socket");

const getPopulatedTaskById = (taskId) =>
  Task.findById(taskId)
    .populate("assigned_user", "username avatar_url email")
    .populate("assigned_by", "username avatar_url")
    .populate("completedAt_user.user", "username avatar_url email")
    .populate("linked_commit", "commit_id commit_message author_username commit_date task");

const assignTask = async (req, res, next) => {
  try {
    const {
      task_deadline,
      assigned_user,
      project_id,
      task_name,
      task_describe,
      priority,
    } = req.body;
    const { id } = req.user;

    if (!task_deadline || !task_name || !task_describe) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await Project.findByIdAndUpdate(
  project_id,
  { $inc: { taskCounter: 1 } },
  { returnDocument: "after" }
);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const isOwner = project.members.find(
      (f) => f.user.equals(id) && f.role === "owner",
    );

    if (!isOwner) {
      return res
        .status(403)
        .json({ success: false, message: "You dont have permission" });
    }

    const findAssignedUser = await User.findById(assigned_user);

    if (!findAssignedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMember = project.members.some((m) =>
      m.user.equals(findAssignedUser._id),
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ success: false, message: "User is not member project" });
    }

    const deadline = new Date(task_deadline);

    if (isNaN(deadline)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    const key = generateTaskKey(findAssignedUser.username, project.taskCounter);

    const createdTask = await Task.create({
      assigned_user,
      assigned_by: id,
      project_id,
      task_name,
      task_describe,
      task_deadline: deadline,
      priority,
      key,
    });

    const task = await getPopulatedTaskById(createdTask._id);

    const notify = await Notification.create({
      title:"У вас новое задание!",
      text:`Задание:${task_name} , нажмите чтобы посмотреть`,
      redirect_url:"/",
      type:"task",
      user:findAssignedUser._id
    })

    sendNotifyByID(assigned_user , notify)

    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};


const getProjectTasks = async (req ,res ,next)=>{

  try {
    
    const {id} = req.params

    const tasks = await Task.find({project_id:id})
      .populate("assigned_user", "username avatar_url email")
      .populate("assigned_by", "username avatar_url")
      .populate("completedAt_user.user", "username avatar_url email")
      .populate("linked_commit", "commit_id commit_message author_username commit_date task")

res.json({success:true , tasks})

  } catch (err) {
    next(err)
  }

}

const getProjectTaskCommits = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const commits = await Commit.find({ project: projectId })
      .sort({ commit_date: -1, createdAt: -1 })
      .populate("task", "task_name key status");

    res.json({ success: true, commits });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { id } = req.user;
    const { status, priority, task_name, task_describe, task_deadline, completed_by, commit_id } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    const project = await Project.findById(task.project_id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    const isOwner = project.members.some((m) => m.user.equals(id) && m.role === "owner");
    if (!isOwner) return res.status(403).json({ success: false, message: "Only project owner can update tasks" });

    const VALID_STATUSES = ["todo", "in_progress", "done", "verified", "overdue"];
    const VALID_PRIORITIES = ["low", "medium", "high"];
    const completionStatuses = ["done", "verified"];
    const previousLinkedCommitId = task.linked_commit?.toString() || null;

    let linkedCommit = null;
    if (commit_id !== undefined && commit_id !== null && commit_id !== "") {
      linkedCommit = await Commit.findById(commit_id);

      if (!linkedCommit) {
        return res.status(404).json({ success: false, message: "Commit not found" });
      }

      if (linkedCommit.project.toString() !== project._id.toString()) {
        return res.status(400).json({ success: false, message: "Commit does not belong to this project" });
      }

      if (linkedCommit.task && linkedCommit.task.toString() !== task._id.toString()) {
        return res.status(400).json({ success: false, message: "Commit is already attached to another task" });
      }
    }

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status))
        return res.status(400).json({ success: false, message: `Invalid status. Use: ${VALID_STATUSES.join(", ")}` });
      task.status = status;

      if (completionStatuses.includes(status)) {
        const ownerMember = project.members.find((member) => member.role === "owner");
        const completedByUserId = completed_by || ownerMember?.user || project.repo_owner_user;

        if (completedByUserId) {
          const isProjectMember = project.members.some((member) => member.user.equals(completedByUserId));
          if (!isProjectMember) {
            return res.status(400).json({ success: false, message: "Selected completed_by user is not a project member" });
          }
          task.completedAt_user = { user: completedByUserId, github_username: null };
        }

        task.completedAt = task.completedAt || new Date();
        if (status === "verified") {
          task.verifiedAt = new Date();
        }

        if (commit_id !== undefined) {
          task.linked_commit = linkedCommit?._id || null;
        }
      } else {
        task.verifiedAt = null;
      }
    }

    if (priority !== undefined) {
      if (!VALID_PRIORITIES.includes(priority))
        return res.status(400).json({ success: false, message: `Invalid priority. Use: ${VALID_PRIORITIES.join(", ")}` });
      task.priority = priority;
    }

    if (task_name !== undefined) task.task_name = task_name;
    if (task_describe !== undefined) task.task_describe = task_describe;
    if (task_deadline !== undefined) {
      const deadline = new Date(task_deadline);
      if (isNaN(deadline)) return res.status(400).json({ success: false, message: "Invalid date" });
      task.task_deadline = deadline;
    }

    await task.save();

    if (previousLinkedCommitId && previousLinkedCommitId !== task.linked_commit?.toString()) {
      await Commit.findByIdAndUpdate(previousLinkedCommitId, { task: null });
    }

    if (task.linked_commit) {
      await Commit.findByIdAndUpdate(task.linked_commit, { task: task._id });
    }

    const updated = await getPopulatedTaskById(task._id);

    res.json({ success: true, task: updated });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  assignTask,
  getProjectTasks,
  getProjectTaskCommits,
  updateTask,
};
