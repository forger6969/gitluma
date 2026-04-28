const jwt = require("jsonwebtoken")


const userTokenMiddleware = async (req, res , next)=>{

    try {
        
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({success:false , message:"token is required"})
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = decoded
    next()
    } catch (err) {
        res.status(401).json({success:false , message:"Invalid token"})
    }

}

module.exports = {
    userTokenMiddleware
}