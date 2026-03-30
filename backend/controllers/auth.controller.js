const { default: axios } = require("axios");
const crypto = require("crypto");
const User = require("../models/user.model");
const { generate_access_token, generate_refresh_token } = require("../utils/token");

const auth_github = async (req, res, next) => {
  try {
    const state = crypto.randomBytes(16).toString("hex");

    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: false, // true для HTTPS
      maxAge: 5 * 60 * 1000,
      sameSite: "lax"
    });

    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent('https://gitluma.onrender.com/api/auth/github/callback')}&scope=repo%20read:user%20user:email&state=${state}`;
    
    return res.redirect(redirectUri); // обязательно return, чтобы функция завершилась
  } catch (error) {
    next(error);
  }
};

const callback_github = async (req , res ,next)=>{

    try {
        
        const code = req.query.code
        const githubState = req.query.state
        const cookieState = req.cookies.oauth_state
        console.log(code,githubState,cookieState);
        

        if (!githubState || githubState !== cookieState) {
              return res.status(403).send("Invalid state");
        }

        const tokenResponse = await axios.post("https://github.com/login/oauth/access_token", {
             client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        },{
            headers: { Accept: "application/json" }
        })

        const access_token_github = tokenResponse.data.access_token
        console.log("token response🔑",tokenResponse.data);
        

        const user_respoonse = await axios.get("https://api.github.com/user",{
            headers:{
                Authorization:`Bearer ${tokenResponse.data.access_token}`
            }
        })

        const githubUser = user_respoonse.data

        const checkIsAuth = await User.findOne({github_id:githubUser.id})

        if (checkIsAuth) {
           const access_token = await generate_access_token({id:checkIsAuth._id})
           const refresh_token = await generate_refresh_token({id:checkIsAuth._id})

           if (!access_token.success) {
           return res.status(500).json({success:false , error:access_token.error || "Access token error"})
           }

           if (!refresh_token.success) {
          return  res.status(500).json({success:false , error:refresh_token.error || "refresh token error"})
           }

         return  res.status(200).json({success:true , refresh_token:refresh_token.token , access_token:access_token.token})
        }

const newUser = await User.create({
    github_id:githubUser.id,
    username:githubUser.login,
    github_token:access_token_github,
    avatar_url:githubUser.avatar_url,
    email:githubUser.email,
    name:githubUser.name,
    bio:githubUser.bio
})

const refresh_token = await  generate_refresh_token({id:newUser._id})
const access_token =  generate_access_token({id:newUser._id})
console.log(refresh_token , access_token);


        console.log(githubUser);
      res.redirect(
       `${process.env.FRONTEND_URL}/github/callback?access_token=${access_token.token}&refresh_token=${refresh_token.token}`
       
      )  

    } catch (err) {
        next(err)
    }

}


module.exports = {
    auth_github,
    callback_github
}