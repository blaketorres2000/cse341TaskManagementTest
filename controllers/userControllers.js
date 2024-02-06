const User = require("../models/userModels.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersController = {};

/*********************************************************
 * Function to get a list of all user profiles from the database.
 ********************************************************/
usersController.getAllProfiles = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = ['This is to get a list of all user profiles from the database.']
    try {
        const profiles = await User.find({});
        return res.json(profiles);
    } catch (err) {
        console.error("Error fetching medications:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get a single user profile by githubId from the database.
 ********************************************************/
usersController.getUserProfileByGitHubId = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = ['This is to get a single user from the database.']
    try {
        const githubUserId = req.params.id;
        const user = await User.findOne({ githubUserId: githubUserId});

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to update the user's profile
 *********************************************************/
usersController.updateUserProfile = async function (req, res) {
    //#swagger.tags = ['Profile Management']
    //#swagger.description = ['This is to update a user in the database.']
    try {
        const githubUserId = req.params.id;
        const { username, displayName, firstName, lastName, userRole, email, password, profilePic } = req.body;

        updateFields = {
            username,
            displayName,
            firstName,
            lastName,
            userRole,
            email,
            password,
            profilePic,
        };

        if (password && password !== "not provided") {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        const updatedProfile = await User.findOneAndUpdate(
            { githubUserId: githubUserId },
            updateFields,
            {
                new: true,
            }
        );

        if (updatedProfile) {
            res.json({
                message: `${updatedProfile.displayName} has been updated successfully!`,
            });
        } else {
            res.status(404).json({ error: "User profile not found." });
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = usersController;
