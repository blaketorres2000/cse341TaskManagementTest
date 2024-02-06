const Task = require("../models/taskModels");

const taskController = {};

/*********************************************************
 * Function to get a list of all tasks from the database.
 * *******************************************************/
taskController.getAllTasks = async function (req, res) {
    //#swagger.tags = ['Task Management']
    //#swagger.description = ['This is to get a list of all tasks from the database.']

    try {
        const tasks = await Task.find({});
        return res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get a single task by id from the database.
 * *******************************************************/
taskController.getTaskById = async function (req, res) {
    //#swagger.tags = ['Task Management']
    //#swagger.description = ['This is to get a single task by id from the database.']

    try {
        const taskId = req.params.id;
        const task = await Task.findOne({ _id: taskId });

        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: "Task not found." });
        }
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get all tasks by a specific category from the database.
 * *******************************************************/
taskController.getTasksByCategory = async function (req, res) {
    //#swagger.tags = ['Task Management']
    //#swagger.description = ['This is to get all tasks by a specific category from the database.']

    try {
        const taskCategory = req.params.category;
        const tasks = await Task.find({ taskCategory: taskCategory });

        if (tasks) {
            res.json(tasks);
        } else {
            res.status(404).json({ error: "Category not found." });
        }
    } catch (error) {
        console.error("Error fetching tasks by category:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to get all tasks by a specific user from the database.
 * *******************************************************/
taskController.getTasksByUser = async function (req, res) {
    //#swagger.tags = ['Task Management']
    //#swagger.description = ['This is to get all tasks by a specific user from the database.']

    try {
        const taskUser = req.params.user;
        const tasks = await Task.find({ taskUser: taskUser });

        if (tasks) {
            res.json(tasks);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        console.error("Error fetching tasks by user:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to create a new task in the database.
 * *******************************************************/
taskController.createTask = async function (req, res) {
    //#swagger.tags = ['Task Management']
    //#swagger.description = ['This is to create a new task in the database.']

    try {
        const { taskName, taskDescription, taskCategory, taskDueDate, taskStatus } = req.body;

        const newTask = new Task({
            taskName,
            taskDescription,
            taskCategory,
            taskDueDate,
            taskStatus,
        });

        await newTask.save();
        res.json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to update a task in the database.
 * *******************************************************/
taskController.updateTask = async function (req, res) {
    //#swagger.tags = ['Task Management']
    //#swagger.description = ['This is to update a task in the database.']

    try {
        const taskId = req.params.id;
        const { taskName, taskDescription, taskCategory, taskDueDate, taskStatus } = req.body;

        updateFields = {
            taskName,
            taskDescription,
            taskCategory,
            taskDueDate,
            taskStatus,
        };

        const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, updateFields, { new: true });

        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: "Task not found." });
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/*********************************************************
 * Function to delete a task from the database.
 * *******************************************************/
taskController.deleteTask = async function (req, res) {
    //#swagger.tags = ['Task Management']
    //#swagger.description = ['This is to delete a task from the database.']

    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findOneAndDelete({ _id: taskId });

        if (deletedTask) {
            res.json(deletedTask);
        } else {
            res.status(404).json({ error: "Task not found." });
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = taskController;