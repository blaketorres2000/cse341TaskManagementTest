const { body, param, validationResult } = require("express-validator");
const User = require("../models/userModels");
const Category = require("../models/categoryModels");

const taskValidation = (method) => {
    switch (method) {
        case "getAllTasks":
            return [];

        case "getTaskById":
            return [param("id").isMongoId().withMessage("Invalid task ID")];

        case "getTasksByCategory":
            return [
                param("id").custom(async (value) => {
                    // Check if the category exists in the tasks collection
                    const category = await Category.findOne({
                        category: value,
                    });
                    if (!category) {
                        throw new Error("Invalid category ID");
                    }
                    return true;
                }),
            ];

        case "getTasksByUser":
            return [
                param("id").custom(async (value) => {
                    // Check if the githubUserId exists in the users collection
                    const user = await User.findOne({ githubUserId: value });
                    if (!user) {
                        throw new Error("Invalid githubUserId");
                    }
                    return true;
                }),
            ];

        case "createTask":
            return [
                body("title").isString().trim().escape(),
                body("description").optional().isString().trim().escape(),
                body("category").isString().trim().escape(),
                body("priorityLevel").isString().trim().escape(),
                body("status").isString().trim().escape(),
                body("dueDate").optional(),
                body("githubUserId").custom(async (value) => {
                    // Check if the githubUserId exists in the users collection
                    const user = await User.findOne({ githubUserId: value });
                    if (!user) {
                        throw new Error("Invalid githubUserId");
                    }
                    return true;
                }),
            ];

        case "updateTask":
            return [
                param("id").isMongoId().withMessage("Invalid task ID"),
                body("title").isString().trim().escape(),
                body("description").optional().isString().trim().escape(),
                body("category").isString().trim().escape(),
                body("priorityLevel").isString().trim().escape(),
                body("status").isString().trim().escape(),
                body("dueDate").optional().isDate(),
                body("githubUserId").custom(async (value) => {
                    // Check if the githubUserId exists in the users collection
                    const user = await User.findOne({ githubUserId: value });
                    if (!user) {
                        throw new Error("Invalid githubUserId");
                    }
                    return true;
                }),
            ];

        case "deleteTask":
            return [param("id").isMongoId().withMessage("Invalid task ID")];
    }
};

const validateTask = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { taskValidation, validateTask };
