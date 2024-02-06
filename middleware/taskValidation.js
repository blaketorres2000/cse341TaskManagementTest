const { body, param, validationResult } = require("express-validator");

const taskValidation = (method) => {
    switch (method) {
        case "getAllTasks":
            return [];

        case "getTaskById":
            return [param("id").isMongoId().withMessage("Invalid task ID")];

        case "getTasksByCategory":
            return [param("categoryId").isMongoId().withMessage("Invalid category ID")];

        case "getTasksByUser":
            return [param("githubUserId").isString().withMessage("Invalid user ID")];

        case "createTask":
            return [
                body("taskName").isString().trim().escape(),
                body("taskDescription").optional().isString().trim().escape(),
                body("taskCategory").isString().trim().escape(),
                body("taskStatus").isString().trim().escape(),
                body("taskDueDate").optional().isDate(),
            ];

        case "updateTask":
            return [
                param("id").isMongoId().withMessage("Invalid task ID"),
                body("taskName").isString().trim().escape(),
                body("taskDescription").optional().isString().trim().escape(),
                body("taskCategory").isString().trim().escape(),
                body("taskStatus").isString().trim().escape(),
                body("taskDueDate").optional().isDate(),
            ];

        case "deleteTask":
            return [param("id").isMongoId().withMessage("Invalid task ID")];
    }
}

const validateTask = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { taskValidation, validateTask };