const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/userModels.js");
const session = require("express-session");
const bcrypt = require("bcrypt");

// Initialize Passport and set up session management
const initializePassport = () => {
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
                scope: ["user", "user:email"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let email = profile.email || "email not provided";
                    const existingUser = await User.findOne({
                        githubUserId: profile.id,
                    });
                    if (existingUser) {
                        return done(null, existingUser);
                    }
                    const newUser = new User({
                        githubUserId: profile.id,
                        username: profile.username,
                        displayName: profile.displayName,
                        firstName: profile.displayName
                            ? profile.displayName.split(" ")[0] ||
                                "not provided"
                            : "not provided",
                        lastName: profile.displayName
                            ? profile.displayName.split(" ")[1] ||
                                "not provided"
                            : "not provided",
                        userRole: "not provided",
                        registrationDate: new Date(),
                        password: "not provided",
                        email: profile.email || "not provided",
                        profilePic:
                            profile.photos && profile.photos.length > 0
                                ? profile.photos[0].value
                                : "not provided",
                    });
                    const savedUser = await newUser.save();
                    return done(null, savedUser);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
    // Serialize and deserialize user for session management
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

// Express session configuration
const expressSession = session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
});

const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res
            .status(401)
            .json("Unauthorized, you do not have access permissions.");
    }
    next();
};

module.exports = { initializePassport, expressSession, isAuthenticated };
