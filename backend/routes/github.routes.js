const express = require("express")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const { getActiveRepos } = require("../controllers/github.controller")
const router = express.Router()

router.get("/github/repos/actives" , userTokenMiddleware , getActiveRepos)

module.exports = router