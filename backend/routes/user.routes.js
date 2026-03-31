const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { getMe } = require("../controllers/user.controller")
const router = express.Router()

router.get("/user/me" , userTokenMiddleware , getMe)

module.exports = router