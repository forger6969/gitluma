const User = require("../models/user.model");

const searchUser = async (req ,res , next)=>{

    try {
        
        const {q} = req.params

        if (q.length < 3) {
            return res.status(400).json({success:false , message:"Enter minimum 3 characters"})
        }

        const users = await User.find({
            $or: [
                { username: { $regex: q, $options: "i" } },
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } }
            ]
        }).select("username name avatar_url email").limit(10)

        res.status(200).json({success:true, data:users})

    } catch (err) {
        next(err)
    }

}

module.exports = { searchUser }