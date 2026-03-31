const User = require("../models/user.model")
const crypto = require("crypto")
const axios = require("axios")
const Project = require("../models/projects.model")

const createProject = async (req , res , next)=>{
    try {
        
        const {fullname} = req.body
        const {id} = req.user

        const user = await User.findById(id)

        const repo = await axios.get(`https://api.github.com/repos/${fullname}`,
            {
                headers:{
                    Authorization:`Bearer ${user.github_token}`,
                     Accept: "application/vnd.github+json"
                }
            }
        )

        const secret = crypto.randomBytes(20).toString("hex")

        const webhook = await axios.post(`https://api.github.com/repos/${fullname}/hooks`, {
            name:"web",
            active:true,
            events:["push"],
             config: {
      url: `${process.env.BACKEND_URL}/api/webhook/github`,
      content_type: "json",
      secret
    }
        },{
    headers: {
      Authorization: `Bearer ${user.github_token}`,
      Accept: "application/vnd.github+json"
    }
  })

  const project = await Project.create({
repo_id:repo.id,
repo_name:repo.name,
repo_fullname:repo.full_name,
repo_owner:user.github_id,
repo_owner_user:user._id,
default_branch:repo.data.default_branch,
webhook_id:webhook.data.id
  })

  console.log(project);

  res.json(project)
  

    } catch (err) {
        next(err)
    }

}

module.exports = {
    createProject
}