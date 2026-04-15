const User = require("../models/user.model")

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
 

module.exports = {
    getMe
}