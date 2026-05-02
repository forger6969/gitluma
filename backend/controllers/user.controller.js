const User = require("../models/user.model")
const Task = require("../models/task.model")
const Commit = require("../models/commit.model")
const Project = require("../models/projects.model")

const getMe = async (req , res , next)=>{
    try {
        const {id} = req.user
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({success:false , message:"User not found"})
        }
        res.json({success:true , user})
    } catch (err) {
        next(err)
    }
}

const getProfile = async (req, res, next) => {
    try {
        const { id } = req.user

        const [user, tasksCompleted, totalCommits, projectsCount, recentCommits] = await Promise.all([
            User.findById(id).select("-github_token -refresh_tokens"),

            Task.countDocuments({
                assigned_user: id,
                status: { $in: ["done", "verified"] }
            }),

            Commit.countDocuments({ commit_author: id }),

            Project.countDocuments({ "members.user": id }),

            Commit.find({ commit_author: id })
                .sort({ commit_date: -1 })
                .limit(5)
                .populate("project", "repo_name repo_fullname")
                .select("commit_message commit_date repo_fullname project")
        ])

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.json({
            success: true,
            user,
            stats: {
                tasksCompleted,
                totalCommits,
                projectsCount,
            },
            recentCommits
        })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    getMe,
    getProfile
}