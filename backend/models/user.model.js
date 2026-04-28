const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String , required:true},
    github_id:{type:Number , required:true},
    github_token:{type:String , required:true},
    avatar_url:{type:String},
    email:{type:String  },
    name:{type:String},
    bio:{type:String},
    onboarding:{
        completed:{type:Boolean , default:false},
        completedAt:{type:Date},
        role:{type:String},
        stack:{type:String},
        experience:{type:String},
        goal:{type:String},
        workspace_style:{type:String}
    },
     refresh_tokens: [{
    tokenHash: String,
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 60 * 60 * 24 * 8 }
    }
  }]
},{
    timestamps:true
})

const User = mongoose.model("User" , userSchema)
module.exports = User