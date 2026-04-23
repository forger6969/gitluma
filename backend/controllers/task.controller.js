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

    const project = await Project.findById(project_id);

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

    project.taskCounter += 1;
    await project.save();

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

      if (status === "done" || status === "verified") {
        task.completedAt = task.completedAt || new Date();

        // who actually did the task — can be any project member, defaults to owner
        const doerId = completed_by || id;
        const isMember = project.members.some((m) => m.user.equals(doerId));
        if (!isMember) return res.status(400).json({ success: false, message: "completed_by user is not a project member" });
        task.completed_by = doerId;
        task.completedAt_user = { user: doerId };
      }

      if (status === "verified") {
        task.verifiedAt = new Date();
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

    // link a commit to this task
    if (commit_id !== undefined) {
      if (commit_id === null) {
        // allow unlinking
        if (task.linked_commit) {
          await Commit.findByIdAndUpdate(task.linked_commit, { $unset: { task: 1 } });
        }
        task.linked_commit = null;
      } else {
        // reuse already-fetched commit (validated above)
        if (!linkedCommit.project.equals(task.project_id))
          return res.status(400).json({ success: false, message: "Commit does not belong to this project" });

        // unlink previous commit if any
        if (task.linked_commit && !task.linked_commit.equals(commit_id)) {
          await Commit.findByIdAndUpdate(task.linked_commit, { $unset: { task: 1 } });
        }

        linkedCommit.task = task._id;
        await linkedCommit.save();
        task.linked_commit = linkedCommit._id;
      }
    }

    await task.save();

    const updated = await Task.findById(task._id)
      .populate("assigned_user", "username avatar_url email")
      .populate("assigned_by", "username avatar_url")
      .populate("completed_by", "username avatar_url")
      .populate("completedAt_user.user", "username avatar_url")
      .populate("linked_commit", "commit_message commit_id author_username createdAt");

    res.json({ success: true, task: updated });
  } catch (err) {
    next(err);
  }
};

const getProjectCommits = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).select("members");
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    const { id: userId } = req.user;
    const isMember = project.members.some((m) => m.user.equals(userId));
    if (!isMember) return res.status(403).json({ success: false, message: "Access denied" });

    const commits = await Commit.find({ project: id })
      .populate("commit_author", "username avatar_url")
      .populate("task", "key task_name status")
      .sort({ createdAt: -1 });

    res.json({ success: true, commits });
  } catch (err) {
    next(err);
  }
};

const KANBAN_COLUMNS = ["todo", "in_progress", "done", "verified", "overdue"];

const getMyTasks = async (req, res, next) => {
  try {
    const { id } = req.user;

    const tasks = await Task.find({ assigned_user: id })
      .populate("assigned_user", "username avatar_url email")
      .populate("assigned_by", "username avatar_url")
      .populate("completed_by", "username avatar_url")
      .populate("completedAt_user.user", "username avatar_url")
      .populate("linked_commit", "commit_message commit_id author_username createdAt")
      .populate("project_id", "repo_name repo_fullname default_branch")
      .sort({ createdAt: -1 });

    // group by status for kanban
    const kanban = KANBAN_COLUMNS.reduce((acc, col) => {
      acc[col] = tasks.filter((t) => t.status === col);
      return acc;
    }, {});

    res.json({ success: true, tasks, kanban });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  assignTask,
  getProjectTasks,
  getProjectTaskCommits,
  updateTask,
  getProjectCommits,
  getMyTasks,
};
