import { tasks } from "../models/taskModel.js";
import { v4 as uuidv4 } from "uuid";

const createTask = (req, res) => {
	try {
		const { title, description, completed, priority } = req.body;
		const created = new Date();
		if (!title) {
			return res.status(400).json({
				error: "title is required",
			});
		}
		if (!description) {
			return res.status(400).json({
				error: "description is required",
			});
		}
		if (!priority) {
			return res.status(400).json({
				error: "priority is required",
			});
		}
		if (completed !== undefined && typeof completed === "boolean") {
			return res.status(400).json({
				error: "completed must be a boolean value",
			});
		}

		const newTask = {
			id: uuidv4(),
			title,
			description,
			completed: completed ?? false,
			priority: priority ?? "low",
			createdAt: created,
		};
		tasks.push(newTask);
		res.status(201).json({
			data: newTask,
			message: "create new task successfully",
		});
	} catch (error) {
		return res.status(500).json({
			error: "failed to create task",
		});
	}
};

const getTasks = (req, res) => {
	try {
		const { completed } = req.query;

		const sortTasks = tasks.sort(
			(itemOne, itemTwo) => itemOne.createdAt - itemTwo.createdAt,
		);

		let filteredTasks = [...sortTasks];

		if (completed !== undefined) {
			// filtering useing completed
			if (completed != "true" && completed != "false") {
				return res.status(400).json({
					error: "completed must be true or false",
				});
			}
			filteredTasks = tasks
				.filter((item) => item.completed.toString() === completed)
				.sort(
					(itemOne, itemTwo) => itemOne.createdAt - itemTwo.createdAt,
				);
		}
		res.status(200).json({
			data: filteredTasks,
			message: "tasks fetched successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: "failed to fetch tasks",
		});
	}
};

const getTaskById = (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				error: "task id is missing",
			});
		}

		if (!/^\d+$/.test(id)) {
			return res.status(400).json({ error: "task id must be a number" });
		}

		const taskId = Number(id);

		if (Number.isNaN(taskId)) {
			return res.status(400).json({
				error: "task id must be a number",
			});
		}

		const task = tasks.find((item) => item.id === taskId);

		if (!task) {
			return res.status(404).json({
				error: "Task not found",
			});
		}

		return res.status(200).json({
			message: "task fetched successfully",
			data: task,
		});
	} catch (error) {
		res.status(500).json({
			error: "failed to fetch task",
		});
	}
};

const updateTask = (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				error: "task id is missing",
			});
		}
		const updates = req.body;

		const taskId = Number(id);
		if (Number.isNaN(taskId)) {
			return res.status(400).json({
				error: "task id must be a number",
			});
		}

		const task = tasks.find((item) => item.id === taskId);

		if (!task) {
			return res.status(404).json({
				error: "task not found",
			});
		}

		const allowedUpdates = [
			"title",
			"description",
			"completed",
			"priority",
		];

		for (const key in updates) {
			if (allowedUpdates.includes(key)) {
				task[key] = updates[key];
			}
		}

		return res.status(200).json({
			message: "task updated successfully",
			data: task,
		});
	} catch (error) {
		res.status(500).json({
			error: "failed to update task",
		});
	}
};
const deleteTask = (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				error: "task id is missing",
			});
		}
		const taskId = Number(id);

		if (Number.isNaN(taskId)) {
			return res.status(400).json({
				error: "task id must be a number",
			});
		}

		const taskFilter = tasks.filter((item) => item.id !== taskId);

		return res.status(200).json({
			message: "task deleted successfully",
			data: taskFilter,
		});
	} catch (error) {
		res.status(500).json({
			error: "failed to delete task",
		});
	}
};

const getTaskByPriority = (req, res) => {
	const { level } = req.params;
	try {
		if (level !== undefined) {
			const allowed = ["low", "medium", "high"];
			if (!allowed.includes(level.toLowerCase())) {
				return res.status(400).json({
					error: "priority must be one of low, medium, high",
				});
			}
		}

		let filterTasks = tasks.filter(
			(item) => item.priority.toLowerCase() === level.toLowerCase(),
		);

		res.status(200).json({
			data: filterTasks,
			message: `tasks fetched by level ${level} successfully`,
		});
	} catch (error) {
		res.status(500).json({
			error: "failed to delete task",
		});
	}
};

export {
	createTask,
	getTaskById,
	getTasks,
	updateTask,
	deleteTask,
	getTaskByPriority,
};
