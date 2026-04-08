const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { getNotifications } = require("../controllers/notifications.controller")
const router = express.Router()

router.get("/notification/my" , userTokenMiddleware , getNotifications)

module.exports = router