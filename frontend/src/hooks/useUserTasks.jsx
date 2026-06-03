// hooks/useUserTasks.js
import { useEffect, useState } from "react";
import { useTasksContext } from "../contexts/TasksContext";

export function useUserTasks() {
  const { fetchCurrentUserTasks } = useTasksContext();
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCurrentUserTasks();
      setUserTasks(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    load();
  }, []);

  return { userTasks, loading };
}
