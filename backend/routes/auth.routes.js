const express = require("express")
const { auth_github, callback_github, refreshToken, logout, logoutAll } = require("../controllers/auth.controller")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const router = express.Router()

router.get("/auth/github", auth_github)
router.get("/auth/github/callback", callback_github)
router.post("/auth/refresh", refreshToken)
router.post("/auth/logout", userTokenMiddleware, logout)
router.post("/auth/logout-all", userTokenMiddleware, logoutAll)

module.exports = router