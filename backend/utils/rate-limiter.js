const rateLimit = require("express-rate-limit")

const globalLimiter  = rateLimit({
    windowMs:4 * 60 * 1000,
    max:process.env.REQUEST_COUNT,
    message:{
        success:false,
        message:"Too many requests. Try again"
    },
    standardHeaders:true,
    legacyHeaders:false
})

module.exports = {
    globalLimiter
}