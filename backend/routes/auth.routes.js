const express = require("express")
const { auth_github, callback_github } = require("../controllers/auth.controller")
const router = express.Router()

router.get("/auth/github" , auth_github)
router.get("/auth/github/callback" , callback_github)

module.exports = router