const { sendNotifyByID } = require("../socket")

const fakeSendSocketMessage = async (req , res , next)=>{

    try {
        
        const {userId , data} = req.body
        console.log("Sending notification to userId:", userId, "type:", typeof userId);
        sendNotifyByID(String(userId) , data)
        res.json({success:true})

    } catch (err) {
     next(err)
    }

}

module.exports = {
    fakeSendSocketMessage
}