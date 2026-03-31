const express = require("express")
const { githubWebhook } = require("../controllers/webhook.controller")
const router = express.Router()

router.post("/webhook/github" ,  express.raw({ type: "application/json" }), githubWebhook)

module.exports = router