const User = require("../models/user.model")

const searchUser = async (req, res, next) => {
    try {
        const { q } = req.params

        if (!q || q.length < 2) {
            return res.status(400).json({ success: false, message: "Enter minimum 2 characters" })
        }

        const users = await User.find({
            username: { $regex: q, $options: "i" }
        })
            .select("username avatar_url email")
            .limit(10)

        res.json({ success: true, users })


        


    } catch (err) {
        next(err)
    }
}

module.exports = { searchUser }