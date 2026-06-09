import { useState } from "react";
import { getTasksHistory } from "../services/tasksService";

export const useTaskHistory = () => {
  const [taskHistory, setTaskHistory] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);

  const fetchTaskHistory = async (projectId, taskId) => {
    setTaskLoading(true);

    try {
      const res = await getTasksHistory(projectId, taskId);
      console.log("history data for task", res);
      if (res.success) {
        setTaskHistory(res.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setTaskLoading(false);
    }
  };

  return {
    taskHistory,
    taskLoading,
    fetchTaskHistory,
  };
};
