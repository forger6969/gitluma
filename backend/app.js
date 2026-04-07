const express = require("express")
const cors = require("cors")
const errorHandler = require("./middlewares/ErrorHandler.middleware")
const connectRoutes = require("./routes/connectRoutes")
const cookieParser = require("cookie-parser")
const { globalLimiter } = require("./utils/rate-limiter")

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(globalLimiter)

connectRoutes(app)

app.use(errorHandler)

module.exports = app

