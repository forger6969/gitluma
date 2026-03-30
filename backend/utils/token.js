require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { default: mongoose } = require("mongoose")
const User = require("../models/user.model")


const generate_access_token = (payload)=>{

const token = jwt.sign(payload , process.env.JWT_SECRET, {expiresIn:"6h"})
return token 

}

const check_access_token = (token) =>{

    try {
const decoded = jwt.verify(token,process.env.JWT_SECRET)
return {
    success:true,
    payload:decoded,
    error:null
}
        
    } catch (err) {
return {
    success:false,
    payload:null,
    error:"invalid token"
}
        
    }

}


const generate_refresh_token = async (payload)=>{

  try {
      if (!payload.id) {
        return {
success:false ,
error:"id in payload is required!",
token:null
        }
    }

    const user = await User.findById(payload.id)

    if (!user) {
            return {
success:false ,
error:"user is not found",
token:null
        }
    }

    const refresh_token = jwt.sign(payload , process.env.JWT_REFRESH_SECRET , {expiresIn:"7d"})
    const hashed_refresh_token = await bcrypt.hash(refresh_token , 10)
    user.refresh_tokens.push({tokenHash:hashed_refresh_token})
    await user.save()
  } catch (err) {
        return {
success:false ,
error:err.message
,
token:refresh_token
        }
  }
    
}

const refresh_access_token = async (token)=>{

    try {


        const payload = jwt.verify(token , process.env.JWT_REFRESH_SECRET)

        const user = await User.findById(payload.id)
        if (!user) {
             return {
success:false ,
error:"user not found",
token:null
        }
        }

        let tokenIsValid = false
        
        for (const rt of user.refresh_tokens) {
            
            if (await bcrypt.compare(token,rt.tokenHash)) {
                tokenIsValid = true
                break
            }

        }

        if (!tokenIsValid) {
              return { success: false, error: "Token is not valid", token: null };
        }

        const new_access_token = jwt.sign({id:user._id},process.env.JWT_SECRET , {expiresIn:"6h"})
          return { success: true, error: null, token: new_access_token };
    } catch (error) {
        
    }

}


module.exports = {
    generate_access_token,
    check_access_token,
    generate_refresh_token,
    refresh_access_token
}