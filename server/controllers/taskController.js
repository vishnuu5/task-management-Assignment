import Task from "../models/taskModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  const task = await Task.create({
    title,
    description,
    priority: priority || "medium",
    user: req.user._id,
  });

  res.status(201).json(task);
});

// @desc    Get a task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the task belongs to the user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to access this task");
  }

  res.json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the task belongs to the user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this task");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the task belongs to the user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this task");
  }

  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Task removed" });
});
