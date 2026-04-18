const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { assignTask, getProjectTasks, getProjectTaskCommits, updateTask } = require("../controllers/task.controller")
const router = express.Router()

router.post("/task/assign",userTokenMiddleware, assignTask)
router.get("/task/project/:id" , userTokenMiddleware , getProjectTasks)
router.get("/task/project/:projectId/commits" , userTokenMiddleware , getProjectTaskCommits)
router.patch("/task/:taskId", userTokenMiddleware, updateTask)

module.exports = router
