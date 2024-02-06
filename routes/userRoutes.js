const userControllers = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();
const { userValidation, validateUser } = require("../middleware/userValidation");

// Route to get all user profiles
router.get("/", userControllers.getAllProfiles);

// Route to get a user profile by githubUserId
router.get("/:id", userControllers.getUserProfileByGitHubId);

// Route to update the user's profile
router.put("/:id", userValidation, validateUser, userControllers.updateUserProfile);

module.exports = router;
