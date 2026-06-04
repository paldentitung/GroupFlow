import { createContext, useContext, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  respondToTask,
  getCurrentUserTasks,
} from "../services/tasksService.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const tasksData = await getTasks(projectId);
      setTasks(tasksData.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    const { projectId, ...rest } = taskData;
    try {
      const response = await createTask(projectId, rest);
      setTasks((prev) => [...prev, response.data]);
      return response;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };
  const handleDeleteTask = async (taskId, projectId) => {
    try {
      const response = await deleteTask(taskId);
      if (response.success) {
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        navigate(`/projects/${projectId}`);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const response = await updateTask(taskId, updatedData);
      if (response.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? { ...t, ...updatedData } : t)),
        );

        toast.success("Task updated");

        navigate(`/projects/${response.data.projectId}`);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleRespondToTask = async (taskId, response) => {
    try {
      const res = await respondToTask(taskId, response);
      if (res.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? { ...t, ...res.data } : t)),
        );
        toast.success(
          response === "accepted" ? "Task accepted!" : "Task rejected",
        );
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchCurrentUserTasks = async (page = 1, limit = 10) => {
    try {
      const response = await getCurrentUserTasks(page, limit);

      return {
        tasks: response.tasks || [],
        pagination: response.pagination || null,
      };
    } catch (error) {
      toast.error(error.message || "Failed to fetch tasks");

      return { tasks: [], pagination: null };
    }
  };
  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        handleCreateTask,
        handleDeleteTask,
        handleUpdateTask,
        handleRespondToTask,
        fetchCurrentUserTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("useTasksContext must be used within TasksProvider");
  return context;
};
