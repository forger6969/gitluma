const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { createProject } = require("../controllers/project.controller")
const router = express.Router()

router.post("/project/create" , userTokenMiddleware , createProject)

module.exports = router
