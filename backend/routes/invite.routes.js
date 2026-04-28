const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { inviteByUsername, acceptInvite } = require("../controllers/invite.controller")
const router = express.Router()

router.post("/invite/send" , userTokenMiddleware , inviteByUsername)
router.get("/invite/accept" , acceptInvite)

module.exports = router