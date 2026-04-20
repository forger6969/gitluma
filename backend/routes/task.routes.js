const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { assignTask, getProjectTasks, updateTask, getProjectCommits, getMyTasks } = require("../controllers/task.controller")
const router = express.Router()

router.post("/task/assign",userTokenMiddleware, assignTask)
router.get("/task/project/:id" , userTokenMiddleware , getProjectTasks)
router.get("/task/project/:projectId/commits" , userTokenMiddleware , getProjectTaskCommits)
router.patch("/task/:taskId", userTokenMiddleware, updateTask)
router.get("/task/project/:id/commits", userTokenMiddleware, getProjectCommits)
router.get("/task/my", userTokenMiddleware, getMyTasks)

module.exports = router
