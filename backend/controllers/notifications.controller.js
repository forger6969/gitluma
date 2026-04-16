const mongoose = require("mongoose")
const Notification = require("../models/notification.model")

const getNotifications = async (req , res , next)=>{

    try {
        
        const {id} = req.user


const notifications = await Notification.find({
    user: new mongoose.Types.ObjectId(id)
});
        console.log(notifications);
        

        res.json({success:true , notifications })

    } catch (err) {
        next(err)
    }

}


module.exports = {
    getNotifications
}