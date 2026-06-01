import { useState, useEffect } from "react";
import { getTasks } from "../services/tasksService.js";
import { createTask } from "../services/tasksService.js";
export const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const fetchTasks = async (projectId) => {
    try {
      const tasksData = await getTasks(projectId);
      console.log("tasksData:", tasksData);

      setTasks(tasksData.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handlecreateTask = async (taskData) => {
    try {
      const response = await createTask(projectId, taskData);
      console.log("created task response:", response);
      addTask(response.data);
      return response;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks(projectId);
  }, [projectId]);

  return {
    tasks,
    addTask,
    handlecreateTask,
  };
};
