const { default: mongoose } = require("mongoose");

const projectSchema = mongoose.Schema({

    repo_id:{type:String ,required:[true , "Айди репозитория обязятельно"]},
    name:{type:String,required:[true , "Название репозитория обязательно"]},
    repo_fullname:{type:String , required:[true , "repo_fullname обязательно для сохранения"]},
    default_branch:{type:String },
    repo_owner:{type:String , required:[true , "Сохранение repo_owner обязательно"]},
    webhook_id:{type:String , required:[true , "Сохранение webhook id обязательно"]},
webhook_secret:{type:String , required:[true , "webhook_secret обязателен для сохранения"]},
last_updated_commit:{type:String , default:null}
})

const Project = mongoose.model("Project",projectSchema)
module.exports = Project