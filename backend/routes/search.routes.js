const express = require("express")
const { searchUser } = require("../controllers/search.controller")
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware")
const router = express.Router()

router.get("/search/users/:q", userTokenMiddleware, searchUser)

module.exports = router
