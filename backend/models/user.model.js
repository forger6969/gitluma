const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String , requried:true},
    github_id:{type:String , required:true},
    github_token:{type:String , required:true},
    avatar_url:{type:String},
    email:{type:String , required:true},
    name:{type:String},
    bio:{type:String}
},{
    timestamps:true
})

const User = mongoose.model("User" , userSchema)
module.exports = User