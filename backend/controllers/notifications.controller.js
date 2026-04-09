const Notification = require("../models/notification.model")

const getNotifications = async (req , res , next)=>{

    try {
        
        const {id} = req.user

        const notifications = await Notification.find({user:id})

        res.json({success:true , notifications })

    } catch (err) {
        next(err)
    }

}


module.exports = {
    getNotifications
}