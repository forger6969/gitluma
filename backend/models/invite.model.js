const { default: mongoose, Schema } = require("mongoose");

const inviteSchema = mongoose.Schema({
    project:{type:Schema.Types.ObjectId , ref:"Project" , required:true},
    invitedUser:{type:Schema.Types.ObjectId , ref:"User" , required:true},
    inviteBy:{type:Schema.Types.ObjectId , ref:"User" , required:true},
    token:{type:String,required:true},
    

})