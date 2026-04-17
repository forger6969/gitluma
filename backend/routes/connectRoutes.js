
const authRouter = require("./auth.routes")
const userRouter = require("./user.routes")
const githubRouter = require("./github.routes")
const webhookRouter = require('./webhook.routes')
const projectRouter = require("./project.routes")
const testRouter = require("./test.routes")
const notifyRouter = require("./notifications.routes")
const inviteRouter = require("./invite.routes")
const searchRouter = require("./search.routes")

const connectRoutes = (app)=>{
app.use("/api",authRouter)
app.use("/api" , userRouter)
app.use("/api" , githubRouter)
app.use("/api",webhookRouter)
app.use("/api",projectRouter)
app.use("/api" , testRouter)
app.use("/api" , notifyRouter)
app.use("/api" ,inviteRouter)
app.use("/api" ,searchRouter)
}

module.exports = connectRoutes