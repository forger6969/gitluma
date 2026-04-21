const { sendNotifyByID } = require("../socket")

const fakeSendSocketMessage = async (req , res , next)=>{

    try {
        
        const {userId , title , text ,type , redirect_url,additional_data } = req.body
        console.log("Sending notification to userId:", userId, "type:", typeof userId);
        sendNotifyByID(String(userId) , {title , text , type , redirect_url , additional_data})
        res.json({success:true})

    } catch (err) {
     next(err)
    }

}



module.exports = {
    fakeSendSocketMessage
}