
const authRouter = require("./auth.routes")
const userRouter = require("./user.routes")
const githubRouter = require("./github.routes")
const webhookRouter = require('./webhook.routes')
const projectRouter = require("./project.routes")

const connectRoutes = (app)=>{
app.use("/api",authRouter)
app.use("/api" , userRouter)
app.use("/api" , githubRouter)
app.use("/api",webhookRouter)
app.use("/api",projectRouter)
}

module.exports =connectRoutes