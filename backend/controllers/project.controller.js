const User = require("../models/user.model")
const crypto = require("crypto")
const axios = require("axios")
const Project = require("../models/projects.model")

const createProject = async (req, res, next) => {
    try {

        const { fullname } = req.body
        const { id } = req.user

        const user = await User.findById(id)

        const projectCheck = await Project.findOne({ repo_fullname: fullname }).populate()

        if (projectCheck) {
            return res.status(400).json({ success: false, message: "Проект с етим репозиторием уже создан" })
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
                url: `/api/webhook/github`,
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

        console.log(project);

        res.json(project)


    } catch (err) {
        next(err)
    }

}

const getProjectById = async (req , res , next)=>{

    try {
        
        const {id} = req.params

        const project = await Project.findById(id).populate({
            path:"commits"
        })

        if (!project) {
            return res.status(404).json({success:false , message:"project not found"})
        }

        res.json({success:true , project})

    } catch (err) {
        
    }

}

module.exports = {
    createProject,
    getProjectById
}
