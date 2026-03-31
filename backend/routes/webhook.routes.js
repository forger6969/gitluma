const express = require("express")
const { githubWebhook } = require("../controllers/webhook.controller")
const router = express.Router()

router.post("/webhook/github" , githubWebhook)

module.exports = router