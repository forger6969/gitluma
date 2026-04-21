const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { inviteByUsername, acceptInvite, getProjectInvites } = require("../controllers/invite.controller")
const router = express.Router()

router.post("/invite/send" , userTokenMiddleware , inviteByUsername)
router.get("/invite/accept" , acceptInvite)
router.get("/invite/invites" , userTokenMiddleware , getProjectInvites)

module.exports = router