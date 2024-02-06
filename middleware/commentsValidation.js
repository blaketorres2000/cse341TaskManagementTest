const { body, param, validationResult } = require("express-validator");
const User = require("../models/userModels");

const commentValidation = (method) => {
    switch (method) {
        case "getAllComments":
            return [];
        
        case "getCommentById":
            return [param("id").isMongoId().withMessage("Invalid comment ID")];
        
        case "getCommentsByUser":
            return [param("githubUserId").isString().withMessage("Invalid githubUserId")]; 

        case "getCommentsByTask":
            return [param("taskId").isString().withMessage("Invalid taskId")];
            
        case "createComment":
            return [
                body("comment").isString().trim().escape(),
                body("taskId").isString().trim().escape(),
                body("githubUserId").custom(async (value) => {
                    // Check if the githubUserId exists in the users collection
                    const user = await User.findOne({ githubUserId: value });
                    if (!user) {
                        throw new Error("Invalid githubUserId");
                    }
                    return true;
                }),
                body("date").optional().isDate(),
            ];

        case "updateComment":
            return [
                param("id").isMongoId().withMessage("Invalid comment ID"),
                body("comment").isString().trim().escape(),
                body("taskId").isString().trim().escape(),
                body("githubUserId").custom(async (value) => {
                    // Check if the githubUserId exists in the users collection
                    const user = await User.findOne({ githubUserId: value });
                    if (!user) {
                        throw new Error("Invalid githubUserId");
                    }
                    return true;
                }),
                body("date").optional().isDate(),
            ];

        case "deleteComment":
            return [param("id").isMongoId().withMessage("Invalid comment ID")];
    }
};

const validateComment = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    commentValidation,
    validateComment,
};
