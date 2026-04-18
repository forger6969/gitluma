const express = require("express");
const { userTokenMiddleware } = require("../middlewares/tokenMIddleware");
const { saveOnboarding, getOnboardingStatus } = require("../controllers/onboarding.controller");

const router = express.Router();

router.post("/onboarding", userTokenMiddleware, saveOnboarding);
router.get("/onboarding/status", userTokenMiddleware, getOnboardingStatus);

module.exports = router;
