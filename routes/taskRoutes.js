import express from "express";
import {
	getTaskById,
	getTasks,
	createTask,
	updateTask,
	deleteTask,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.get("/", getTasks); // Retrieve all tasks.
router.post("/", createTask); // Create a new task
router.get("/:id", getTaskById); // Retrieve a specific task by its ID.
router.put("/:id", updateTask); // Update an existing task by its ID
router.delete("/:id", deleteTask); // Delete a task by its ID

export default router;
