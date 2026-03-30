
const authRouter = require("./auth.routes")

const connectRoutes = (app)=>{
app.use("/api",authRouter)
}

module.exports =connectRoutes