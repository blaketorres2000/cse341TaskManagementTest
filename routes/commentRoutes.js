const express = require("express");
const router = express.Router();
const commentControllers = require("../controllers/commentControllers");
const { commentValidation, validateComment } = require("../middleware/commentValidation");

// Route to get all comments
router.get("/", commentValidation('getAllComments'), commentControllers.getAllComments);

// Route to get a comment by commentId
router.get("/:id", commentValidation('getCommentById'), commentControllers.getCommentById);

// Route to get all comments by a specific user
router.get("/user/:id", commentValidation('getCommentsByUser'), commentControllers.getCommentsByUser);

// Route to get all comments on a specific task
router.get("/task/:id", commentValidation('getCommentsByTask'), commentControllers.getCommentsByTask);

// Route to create a new comment
router.post("/", commentValidation('createComment'), validateComment, commentControllers.createComment);

// Route to update a comment
router.put("/:id", commentValidation('updateComment'), validateComment, commentControllers.updateComment);

// Route to delete a comment
router.delete("/:id", commentValidation('deleteComment'), validateComment, commentControllers.deleteComment);

module.exports = router;