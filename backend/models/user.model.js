const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String , requried:true},
    github_id:{type:Number , required:true},
    github_token:{type:String , required:true},
    avatar_url:{type:String},
    email:{type:String , required:true},
    name:{type:String},
    bio:{type:String},
     refresh_tokens: [{
    tokenHash: String,
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 60 * 60 * 24 * 8 } // TTL: 8 дней (в секундах)
    }
  }]
},{
    timestamps:true
})

const User = mongoose.model("User" , userSchema)
module.exports = User