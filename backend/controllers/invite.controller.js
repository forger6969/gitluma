const User = require("../models/user.model")

const inviteByUsername = async (req , res ,next)=>{

    try {
        
        const {username} = req.body
        const {id} = req.user

        if (!username) {
            return res.status(400).json({success:false , message:"Username is required"})
        }

        if (!id) {
            return res.status(401).json({success:false , message:"invalid token"})
        }

        const user = await User.find({username})

        if (!user) {
            return res.status(404).json({success:false , message:"User not found"})
        }

        

    } catch (err) {
        next(err)
    }

}