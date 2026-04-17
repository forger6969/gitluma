const User = require("../models/user.model")
const axios = require("axios")

const getActiveRepos = async (req , res, next)=>{

try {
    
    const {id} = req.user

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({success:false , message:"user not found"})
    }

    const github_access_token = user.github_token

    const request = await axios.get("https://api.github.com/user/repos",{
        headers:{
            Authorization:`Bearer ${github_access_token}`
        },
        params:{
            sort:"updated",
            direction:"desc",
            per_page:100,
              affiliation: "owner,collaborator,organization_member"
        }
    })


    

    res.json({success:true , repos:request.data})

} catch (err) {
    next(err)
}

}



module.exports = {
    getActiveRepos
}