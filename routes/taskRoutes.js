const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");
const { taskValidation, validateTask } = require("../middleware/taskValidation");

// Route to get all tasks
router.get("/", taskValidation('getAllTasks'), validateTask, taskControllers.getAllTasks);

// Route to get a task by taskId
router.get("/:id", taskValidation('getTaskById'), validateTask, taskControllers.getTaskById);

// Route to get all tasks in a specific category
router.get("/category/:id", taskValidation('getTasksByCategory'), validateTask, taskControllers.getTasksByCategory);

// Route to get all tasks by a specific user
router.get("/user/:id", taskValidation('getTasksByUser'), validateTask, taskControllers.getTasksByUser);

// Route to create a new task
router.post("/", taskValidation('createTask'), validateTask, taskControllers.createTask);

// Route to update a task
router.put("/:id", taskValidation('updateTask'), validateTask, taskControllers.updateTask);

// Route to delete a task
router.delete("/:id", taskValidation('deleteTask'), validateTask, taskControllers.deleteTask);

module.exports = router;