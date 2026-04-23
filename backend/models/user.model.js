const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String , required:true},
    github_id:{type:Number , required:true},
    github_token:{type:String , required:true},
    avatar_url:{type:String},
    email:{type:String  },
    name:{type:String},
    bio:{type:String},
    refresh_tokens: [{
        tokenHash: String,
        createdAt: {
            type: Date,
            default: Date.now,
            index: { expires: 60 * 60 * 24 * 8 }
        }
    }],
    onboarding: {
        completed:       { type: Boolean, default: false },
        completedAt:     { type: Date,    default: null  },
        role:            { type: String,  default: null  },
        stack:           { type: String,  default: null  },
        experience:      { type: String,  default: null  },
        goal:            { type: String,  default: null  },
        workspace_style: { type: String,  default: null  },
    }
},{
    timestamps:true
})

const User = mongoose.model("User" , userSchema)
module.exports = User