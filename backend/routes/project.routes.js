const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { createProject, getProjectById, getMyProjects } = require("../controllers/project.controller")
const router = express.Router()

router.post("/project/create" , userTokenMiddleware , createProject)
router.get("/project/my" , userTokenMiddleware , getMyProjects)
router.get("/project/:id",  getProjectById)

module.exports = router