const { body, param, validationResult } = require("express-validator");

const categoryValidation = (method) => {
    switch (method) {
        case "getAllCategories":
            return [];

        case "getCategoryById":
            return [param("id").isMongoId().withMessage("Invalid category ID")];

        case "createCategory":
            return [
                body("categoryName").isString().trim().escape(),
                body("categoryDescription").optional().isString().trim().escape(),
            ];

        case "updateCategory":
            return [
                param("id").isMongoId().withMessage("Invalid category ID"),
                body("categoryName").isString().trim().escape(),
                body("categoryDescription").optional().isString().trim().escape(),
            ];

        case "deleteCategory":
            return [param("id").isMongoId().withMessage("Invalid category ID")];
    }
}

const validateCategory = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { categoryValidation, validateCategory };