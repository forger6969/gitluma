const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { createProject, getProjectById, getMyProjects, updateMemberRole, removeMember } = require("../controllers/project.controller")
const { inviteByUsername } = require("../controllers/invite.controller")
const router = express.Router()

router.post("/project/create" , userTokenMiddleware , createProject)
router.get("/project/my" , userTokenMiddleware , getMyProjects)
router.get("/project/:id",  getProjectById)
router.post("/project/invite" , userTokenMiddleware , inviteByUsername)
router.patch("/project/:projectId/members/:memberId/role", userTokenMiddleware, updateMemberRole)
router.delete("/project/:projectId/members/:memberId", userTokenMiddleware, removeMember)

module.exports = router