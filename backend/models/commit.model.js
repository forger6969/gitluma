const { default: mongoose, Schema } = require("mongoose");

const commitSchema = mongoose.Schema({
    commit_id:{type:String, required:true,unique:[true,"Этот коммит уже сохранен"]},
    task:{type:Schema.Types.ObjectId , ref:"Task"},
    commit_author:{type:Schema.Types.ObjectId , ref:"User"},
    author_username:{type:String , required:true},
    author_github_id:{type:String , required:true},
    commit_message:{type:String , required:true},
    project:{type:Schema.Types.ObjectId , ref:"Project",required:true},
    commit_date:{type:Date ,default:Date.now },
    repo_id:{type:Number , required:true},
    repo_fullname:{type:String }
},{ timestamps: true })

commitSchema.index({ project: 1, commit_date: -1 })
commitSchema.index({ task: 1 })
commitSchema.index({ commit_author: 1 })

const Commit = mongoose.model("Commit", commitSchema)
module.exports = Commit