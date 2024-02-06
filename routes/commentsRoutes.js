const express = require("express");
const router = express.Router();
const commentsControllers = require("../controllers/commentsControllers");
const { commentValidation, validateComment } = require("../middleware/commentsValidation");

// Route to get all comments
router.get("/", commentValidation('getAllComments'), commentsControllers.getAllComments);

// Route to get a comment by commentId
router.get("/:id", commentValidation('getCommentById'), commentsControllers.getCommentById);

// Route to get all comments by a specific user
router.get("/user/:id", commentValidation('getCommentsByUser'), commentsControllers.getCommentsByUser);

// Route to get all comments on a specific task
router.get("/task/:id", commentValidation('getCommentsByTask'), commentsControllers.getCommentsByTask);

// Route to create a new comment
router.post("/", commentValidation('createComment'), validateComment, commentsControllers.createComment);

// Route to update a comment
router.put("/:id", commentValidation('updateComment'), validateComment, commentsControllers.updateComment);

// Route to delete a comment
router.delete("/:id", commentValidation('deleteComment'), validateComment, commentsControllers.deleteComment);

module.exports = router;