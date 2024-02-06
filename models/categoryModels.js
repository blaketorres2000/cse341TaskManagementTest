const mongoose = require("mongoose");

/**********************************************
 * Schema for the category collection in MongoDB
 * **********************************************/
const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    description: { type: String },
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
