const { default: mongoose, Schema } = require("mongoose");

const notificationSchema = mongoose.Schema({
    title:{type:String , required:true},
    text:{type:String , default:null},
    type:{type:String , enum:["info" , "warning" , "error","success","commit"]},
    redirect_url:{type:String , default:null},
additional_data:[
    {
        key:{type:String},
        value:{type:String}
    },
],

    createdAt:{type:Date,default: Date.now },
    user:{type:Schema.Types.ObjectId , ref:"User"}
})

notificationSchema.index({createdAt:1} , {expirseAfterSeconds: 7 * 24 * 60 * 60})

const Notification = mongoose.model("Notification" , notificationSchema)

module.exports = Notification