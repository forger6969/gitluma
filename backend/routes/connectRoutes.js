
const authRouter = require("./auth.routes")
const userRouter = require("./user.routes")
const githubRouter = require("./github.routes")

const connectRoutes = (app)=>{
app.use("/api",authRouter)
app.use("/api" , userRouter)
app.use("/api" , githubRouter)
}

module.exports =connectRoutes