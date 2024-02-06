const Category = require('../models/categoryModel');

const categoryController = {};

/*********************************************************
 * Function to get a list of all categories from the database.
 * *******************************************************/
categoryController.getAllCategories = async function (req, res) {
    //#swagger.tags = ['Category Management']
    //#swagger.description = ['This is to get a list of all categories from the database.']

    try {
        const categories = await Category.find({});
        return res.json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get a single category by id from the database.
 * *******************************************************/
categoryController.getCategoryById = async function (req, res) {
    //#swagger.tags = ['Category Management']
    //#swagger.description = ['This is to get a single category by id from the database.']

    try {
        const categoryId = req.params.id;
        const category = await Category.findOne({ _id: categoryId });

        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: "Category not found." });
        }
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to create a new category in the database.
 * *******************************************************/
categoryController.createCategory = async function (req, res) {
    //#swagger.tags = ['Category Management']
    //#swagger.description = ['This is to create a new category in the database.']

    try {
        const { categoryName, categoryDescription } = req.body;

        const newCategory = new Category({
            categoryName,
            categoryDescription,
        });

        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to update a category in the database.
 * *******************************************************/
categoryController.updateCategory = async function (req, res) {
    //#swagger.tags = ['Category Management']
    //#swagger.description = ['This is to update a category in the database.']

    try {
        const categoryId = req.params.id;
        const { categoryName, categoryDescription } = req.body;

        updateFields = {
            categoryName,
            categoryDescription,
        };

        const updatedCategory = await Category.findOneAndUpdate(
            { _id: categoryId },
            updateFields,
            { new: true }
        );

        if (updatedCategory) {
            res.json(updatedCategory);
        } else {
            res.status(404).json({ error: "Category not found." });
        }
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to delete a category from the database.
 * *******************************************************/
categoryController.deleteCategory = async function (req, res) {
    //#swagger.tags = ['Category Management']
    //#swagger.description = ['This is to delete a category from the database.']

    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.findOneAndDelete({ _id: categoryId });

        if (deletedCategory) {
            res.json(deletedCategory);
        } else {
            res.status(404).json({ error: "Category not found." });
        }
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = categoryController;