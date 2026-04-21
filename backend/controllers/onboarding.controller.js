const User = require("../models/user.model");

const VALID = {
    role:            ["frontend", "backend", "fullstack", "lead", "designer", "student"],
    experience:      ["junior", "mid", "senior", "staff"],
    goal:            ["ship", "collab", "learn", "manage"],
    workspace_style: ["focused", "power", "visual", "social"],
};

const saveOnboarding = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { role, stack, experience, goal, workspace_style } = req.body;

        if (!role || !stack || !experience || !goal || !workspace_style) {
            return res.status(400).json({ success: false, message: "All 5 answers are required" });
        }

        if (!VALID.role.includes(role))
            return res.status(400).json({ success: false, message: `Invalid role. Use: ${VALID.role.join(", ")}` });

        if (!VALID.experience.includes(experience))
            return res.status(400).json({ success: false, message: `Invalid experience. Use: ${VALID.experience.join(", ")}` });

        if (!VALID.goal.includes(goal))
            return res.status(400).json({ success: false, message: `Invalid goal. Use: ${VALID.goal.join(", ")}` });

        if (!VALID.workspace_style.includes(workspace_style))
            return res.status(400).json({ success: false, message: `Invalid workspace_style. Use: ${VALID.workspace_style.join(", ")}` });

        const user = await User.findByIdAndUpdate(
            id,
            {
                onboarding: {
                    completed: true,
                    completedAt: new Date(),
                    role,
                    stack,
                    experience,
                    goal,
                    workspace_style,
                },
            },
            { new: true, select: "-github_token -refresh_tokens" }
        );

        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

const getOnboardingStatus = async (req, res, next) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id).select("onboarding");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, onboarding: user.onboarding });
    } catch (err) {
        next(err);
    }
};

module.exports = { saveOnboarding, getOnboardingStatus };
