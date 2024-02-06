const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryControllers");
const { categoryValidation, validateCategory } = require("../middleware/categoryValidation");

// Route to get all categories
router.get("/", categoryValidation('getAllCategories'), validateCategory, categoryControllers.getAllCategories);

// Route to get a category by categoryId
router.get("/:id", categoryValidation('getCategoryById'), validateCategory, categoryControllers.getCategoryById);

// Route to create a new category
router.post("/", categoryValidation('createCategory'), validateCategory, categoryControllers.createCategory);

// Route to update a category
router.put("/:id", categoryValidation('updateCategory'), validateCategory, categoryControllers.updateCategory);

// Route to delete a category
router.delete("/:id", categoryValidation('deleteCategory'), validateCategory, categoryControllers.deleteCategory);

module.exports = router;