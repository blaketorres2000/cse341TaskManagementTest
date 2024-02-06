const mongoose = require("mongoose");

/**********************************************
 * Schema for the task collection in MongoDB
 * **********************************************/
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    priorityLevel: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date, required: true },
    githubUserId: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;