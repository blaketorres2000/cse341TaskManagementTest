const mongoose = require("mongoose");

/**********************************************
* Schema for the comment collection in MongoDB
* **********************************************/
const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    taskId: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;