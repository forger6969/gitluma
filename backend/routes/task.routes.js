const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { assignTask, getProjectTasks, updateTask, getProjectCommits } = require("../controllers/task.controller")
const router = express.Router()

router.post("/task/assign",userTokenMiddleware, assignTask)
router.get("/task/project/:id" , userTokenMiddleware , getProjectTasks)
router.patch("/task/:taskId", userTokenMiddleware, updateTask)
router.get("/task/project/:id/commits", userTokenMiddleware, getProjectCommits)

module.exports = router