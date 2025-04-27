import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData);
      setTasks([...tasks, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
      throw err;
    }
  };

  const toggleTaskStatus = async (id, completed) => {
    try {
      const response = await api.put(`/tasks/${id}`, { completed });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task status");
      throw err;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // 'all'
  });

  return {
    tasks: filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refreshTasks: fetchTasks,
  };
};
