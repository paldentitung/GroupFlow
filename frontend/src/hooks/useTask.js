// hooks/useTask.js
import { useState, useEffect } from "react";
import { getTaskById } from "../services/tasksService.js";

export const useTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;
    getTaskById(taskId)
      .then((res) => setTask(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [taskId]);

  return { task, loading };
};
