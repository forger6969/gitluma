const { default: mongoose, Schema } = require("mongoose");

const taskSchema = mongoose.Schema({

    assigned_user:{type:Schema.ObjectId , ref:"User"},
    project_id:{type:Schema.ObjectId , ref:"Project"},
    task_name:{type:String , required:true},
    task_describe:{type:String , default:null},
    task_deadline:{type:String,default:null}
})

const Task = mongoose.model("Task",taskSchema)
module.exports = Task