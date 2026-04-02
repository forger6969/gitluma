const { default: mongoose, Schema } = require("mongoose");

const projectSchema = mongoose.Schema({

    repo_id:{type:Number ,required:[true , "Айди репозитория обязятельно"]},
    repo_name:{type:String,required:[true , "Название репозитория обязательно"]},
    repo_fullname:{type:String , required:[true , "repo_fullname обязательно для сохранения"]},
    default_branch:{type:String },
    repo_owner:{type:String , required:[true , "Сохранение repo_owner обязательно"]},
    repo_owner_user:{type:Schema.Types.ObjectId,ref:"User"},
    webhook_id:{type:String , required:[true , "Сохранение webhook id обязательно"]},
webhook_secret:{type:String , required:[true , "webhook_secret обязателен для сохранения"]},
last_updated_commit:{type:String , default:null},
commits:[
    {
        type:Schema.Types.ObjectId , ref:"Commit"
    }
],
members:[
    {
        user:{type:Schema.Types.ObjectId , ref:"User"},
        role:{type:String , enum:["member","owner"]}
    }
]
})

const Project = mongoose.model("Project",projectSchema)
module.exports = Project