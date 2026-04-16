const { default: mongoose, Schema } = require("mongoose");

const inviteSchema = mongoose.Schema({
    project:{type:Schema.Types.ObjectId , ref:"Project" , required:true},
    invitedUser:{type:Schema.Types.ObjectId , ref:"User" , required:true},
    inviteBy:{type:Schema.Types.ObjectId , ref:"User" , required:true},
    tokenId:{type:String , unique:true},
    status:{type:String , enum:["pending" , "accepted" , "rejected"]},
    role:{type:String , enum:["member" , "owner"]}
}, { timestamps: true })

const Invite = mongoose.model("Invite" , inviteSchema)

module.exports = Invite
