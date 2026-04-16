const { default: mongoose, Schema } = require("mongoose");

const taskSchema = mongoose.Schema({

    assigned_user:{type:Schema.ObjectId , ref:"User"},
    project_id:{type:Schema.Types.ObjectId , ref:"Project"},
    task_name:{type:String , required:true},
    task_describe:{type:String , default:null},
    task_deadline:{type:Date,default:null},
    status:{type:String , enum:["todo", "in_progress", "done", "verified", "overdue"],default:"todo"},
    priority:{type:String , enum:["low","medium","high"] , default:"medium"},
    key:{type:String , required:true,unique:true},
    completedAt:{type:Date,default:null},
    verifiedAt:{type:Date , default:null}
},{ timestamps: true })

const Task = mongoose.model("Task",taskSchema)
module.exports = Task

