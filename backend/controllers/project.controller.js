const User = require("../models/user.model")
const crypto = require("crypto")
const axios = require("axios")
const Project = require("../models/projects.model")

const createProject = async (req, res, next) => {
    try {

        const { fullname } = req.body
        const { id } = req.user

        const user = await User.findById(id)

        if (!user) {
            return res.status(401).json({success:false , message:"User not found"})
        }

        const projectCheck = await Project.findOne({ repo_fullname: fullname })
        console.log(projectCheck);
        

        if (projectCheck) {
            return res.status(400).json({ success: false, message: "A project with this repository already exists" })
        }

        const repo = await axios.get(`https://api.github.com/repos/${fullname}`,
            {
                headers: {
                    Authorization: `Bearer ${user.github_token}`,
                    Accept: "application/vnd.github+json"
                }
            }
        )

        const secret = crypto.randomBytes(20).toString("hex")

        const webhook = await axios.post(`https://api.github.com/repos/${fullname}/hooks`, {
            name: "web",
            active: true,
            events: ["push"],
            config: {
                url: `${process.env.WEBHOOK_URL}/api/webhook/github`,
                content_type: "json",
                secret
            }
        }, {
            headers: {
                Authorization: `Bearer ${user.github_token}`,
                Accept: "application/vnd.github+json"
            }
        })

        const project = await Project.create({
            repo_id: repo.data.id,
            repo_name: repo.data.name,
            repo_fullname: repo.data.full_name,
            repo_owner: user.github_id,
            repo_owner_user: user._id,
            default_branch: repo.data.default_branch,
            webhook_id: webhook.data.id,
            webhook_secret: secret,
            members: [
                {
                    role: "owner",
                    user: user._id
                }
            ]
        })

        res.json(project)

    } catch (err) {
        next(err)
    }

}

const getProjectById = async (req , res , next)=>{

    try {

        const {id} = req.params

        const project = await Project.findById(id).populate("repo_owner_user").populate("commits").populate("members.user")

        if (!project) {
            return res.status(404).json({success:false , message:"project not found"})
        }

        res.json({success:true , project})

    } catch (err) {
        next(err)
    }

}


const getMyProjects = async (req , res  , next)=>{

try {

 const {id} = req.user

 const projects = await Project.find({"members.user":id})

 res.json({success:true , projects})

 

} catch (err) {
    next(err)
}

}


const updateMemberRole = async (req, res, next) => {
    try {
        const { projectId, memberId } = req.params
        const { role } = req.body
        const { id } = req.user

        if (!["member", "owner"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role" })
        }

        const project = await Project.findById(projectId)
        if (!project) return res.status(404).json({ success: false, message: "Project not found" })

        if (project.repo_owner_user.toString() !== id) {
            return res.status(403).json({ success: false, message: "Only the owner can change roles" })
        }

        const member = project.members.id(memberId)
        if (!member) return res.status(404).json({ success: false, message: "Member not found" })

        if (member.user.toString() === id) {
            return res.status(400).json({ success: false, message: "Cannot change your own role" })
        }

        member.role = role
        await project.save()

        res.json({ success: true, message: "Role updated" })
    } catch (err) {
        next(err)
    }
}

const removeMember = async (req, res, next) => {
    try {
        const { projectId, memberId } = req.params
        const { id } = req.user

        const project = await Project.findById(projectId)
        if (!project) return res.status(404).json({ success: false, message: "Project not found" })

        if (project.repo_owner_user.toString() !== id) {
            return res.status(403).json({ success: false, message: "Only the owner can remove members" })
        }

        const member = project.members.id(memberId)
        if (!member) return res.status(404).json({ success: false, message: "Member not found" })

        if (member.user.toString() === id) {
            return res.status(400).json({ success: false, message: "Cannot remove yourself" })
        }

        project.members.pull(memberId)
        await project.save()

        res.json({ success: true, message: "Member removed" })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createProject,
    getProjectById,
    getMyProjects,
    updateMemberRole,
    removeMember
}
