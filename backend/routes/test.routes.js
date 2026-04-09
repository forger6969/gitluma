const express = require("express")
const { fakeSendSocketMessage } = require("../controllers/test.controller")
const router = express.Router()

router.post("/test" , fakeSendSocketMessage)

module.exports = router