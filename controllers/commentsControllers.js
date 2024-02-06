const User = require("../models/userModels.js");
const Comment = require("../models/commentsModels.js");
const mongoose = require("mongoose");

const commentsController = {};

/*********************************************************
* Function to get a list of all comments from the database.
*********************************************************/
commentsController.getAllComments = async function (req, res) {
    //#swagger.tags = ['Comment Management']
    //#swagger.description = ['This is to get all comments from the database.']

    try {
        const comments = await Comment.find({});
        return res.json(comments);
    } catch (err) {
        console.error("Error fetching all comments:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get a comment in the database by object _id.
 * *******************************************************/
commentsController.getCommentById = async function (req, res) {
    //#swagger.tags = ['Comment Management']
    //#swagger.description = ['This is to get a single comment by id from the database.']

    try {
        const commentId = req.params.id;
        const comment = await Comment.findOne({ _id: commentId });

        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: "Comment not found." });
        }
    } catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
}

/*********************************************************
 * Function to get all comments from a single user.
 * *******************************************************/
commentsController.getCommentsByUser = async function (req, res) {
    //#swagger.tags = ['Comment Management']
    //#swagger.description = ['This is to get all comments by a specific user from the database.']

    try {
        const githubUserId = req.params.id;
        const userComment = await Comment.find({ githubUserId: githubUserId});

        if (userComment) {
            res.json(userComment);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
            console.error("Error fetching user comments:", error);
            res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get all comments on a specific task.
 * *******************************************************/
commentsController.getCommentsByTask = async function (req, res) {
    //#swagger.tags = ['Comment Management']
    //#swagger.description = ['This is to get all comments on a specific task from the database.']

    try {
        const taskId = req.params.id;
        const comments = await Comment.find({ taskId: taskId });

        if (comments) {
            res.json(comments);
        } else {
            res.status(404).json({ error: "Comments not found." });
        }
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to create a new comment in the database.
 * *******************************************************/
commentsController.createComment = async function (req, res) {
    //#swagger.tags = ['Comment Management']
    //#swagger.description = ['This is to create a new comment in the database.']

    try {
        const { comment, taskId, githubUserId } = req.body;
        const newComment = new Comment({ comment, taskId, githubUserId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to update a comment in the database.
 * *******************************************************/
commentsController.updateComment = async function (req, res) {
    //#swagger.tags = ['Comment Management']
    //#swagger.description = ['This is to update a comment by _id in the database.']

    try {
        const commentId = req.params.id;
        const { comment, taskId, githubUserId } = req.body;
        const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, { comment, taskId, githubUserId }, { new: true });
        res.json(updatedComment);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to delete a comment from the database.
 * *******************************************************/
commentsController.deleteComment = async function (req, res) {
    //#swagger.tags = ['Comment Management']
    //#swagger.description = ['This is to delete a comment by _id from the database.']

    try {
        const commentId = req.params.id;
        await Comment.deleteOne({_id: commentId});
        res.json({ message: "Comment deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = commentsController;