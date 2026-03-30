const express = require("express")
const cors = require("cors")
const errorHandler = require("./middlewares/ErrorHandler.middleware")
const connectRoutes = require("./routes/connectRoutes")

const app = express()

app.use(cors())
app.use(express.json())

connectRoutes(app)
app.use(errorHandler)

module.exports = app