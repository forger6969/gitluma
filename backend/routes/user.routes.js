const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { getMe, getProfile, getRecentCommits } = require("../controllers/user.controller")
const router = express.Router()

router.get("/user/me", userTokenMiddleware, getMe)
router.get("/user/profile", userTokenMiddleware, getProfile)
router.get("/user/recent-commits", userTokenMiddleware, getRecentCommits)

module.exports = router
