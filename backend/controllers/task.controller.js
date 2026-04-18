const { generateTaskKey } = require("../utils/generate");
const Project = require("../models/projects.model");
const User = require("../models/user.model");
const Task = require("../models/task.model");
const Notification = require("../models/notification.model");
const { sendNotifyByID } = require("../socket");

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

    const task = await Task.findById(createdTask._id)
      .populate("assigned_user", "username avatar_url email")
      .populate("assigned_by", "username avatar_url")
      .populate("completedAt_user.user", "username avatar_url");

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
      .populate("completedAt_user.user", "username avatar_url")

res.json({success:true , tasks})

  } catch (err) {
    next(err)
  }

}

module.exports = {
  assignTask,
  getProjectTasks
};
