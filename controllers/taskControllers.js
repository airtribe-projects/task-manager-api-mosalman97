import { tasks } from "../models/taskModel.js";

let idCounter = 120;

const createTask = (req, res) => {
	try {
		const { title, description, completed } = req.body;
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
		if (typeof completed !== "boolean") {
			return res.status(400).json({
				error: "completed must be a boolean value",
			});
		}

		const newTask = {
			id: idCounter++,
			title,
			description,
			completed,
		};
		tasks.push(newTask);
		res.status(200).json({
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
		res.status(200).json({
			data: tasks,
			message: "Tasks fetched successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: "failed to fetch tasks",
		});
	}
};
const getTaskById = (req, res) => {
	const { id } = req.params;
	if(!id){
		return res.status(400).json({
			error: "title is required",
		});
	}
};
const updateTask = (req, res) => {};
const deleteTask = (req, res) => {};

export { createTask, getTaskById, getTasks, updateTask, deleteTask };
