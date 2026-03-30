const { default: axios } = require("axios");
const crypto = require("crypto")

const auth_github = async (req , res,next)=>{
    try {
        
console.log(req.route);

        const state = crypto.randomBytes(16).toString("hex")

        res.cookie("oauth_state", state, {
  httpOnly: true, 
  secure: false,   
  maxAge: 5 * 60 * 1000, 
  sameSite: "lax"   
});

          const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/github/callback')}&scope=repo%20read:user%20user:email&state=${state}`;
res.redirect(redirectUri);
    } catch (error) {
        next(error)
    }
}

const callback_github = async (req , res ,next)=>{

    try {
        
        const code = req.query.code
        const githubState = req.query.state
        const cookieState = req.cookie.oauth_state
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

        const user_respoonse = await axios.get("https://api.github.com/user",{
            headers:{
                Authorization:`Bearer ${access_token_github}`
            }
        })

        const githubUser = user_respoonse.data
        console.log(githubUser);
        
        res.json(githubUser )

    } catch (err) {
        
    }

}


module.exports = {
    auth_github,
    callback_github
}