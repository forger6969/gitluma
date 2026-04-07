const express = require("express")
const { auth_github, callback_github, refreshToken } = require("../controllers/auth.controller")
const router = express.Router()

router.get("/auth/github" , auth_github)
router.get("/auth/github/callback" , callback_github)
router.post("/auth/refresh" , refreshToken)

module.exports = router