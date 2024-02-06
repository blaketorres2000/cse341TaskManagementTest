const express = require("express");
const router = express.Router();
const commentsControllers = require("../controllers/commentsControllers");
const { commentValidation, validateComment } = require("../middleware/commentsValidation");

// Route to get all comments
router.get("/", commentsControllers.getAllComments);

// Route to get a comment by commentId
router.get("/:id", commentsControllers.getCommentById);

// Route to get all comments by a specific user
router.get("/user/:id", commentsControllers.getCommentsByUser);

// Route to get all comments on a specific task
router.get("/task/:id", commentsControllers.getCommentsByTask);

// Route to create a new comment
router.post("/", commentsControllers.createComment);

// Route to update a comment
router.put("/:id", commentsControllers.updateComment);

// Route to delete a comment
router.delete("/:id", commentsControllers.deleteComment);

module.exports = router;