import { useEffect, useState } from "react";
import { getTasks } from "../services/tasksService.js";

export function useProjectTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((t) => {
    const matchStatus = status ? t.status === status : true;
    const matchSearch = search
      ? t.title.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchStatus && matchSearch;
  });

  useEffect(() => {
    if (!projectId) return;
    const load = async () => {
      setLoading(true);
      const res = await getTasks(projectId, page);
      console.log("tasks data", res);
      setTasks(res.data || []);
      setPagination(res.data.pagination || null);
      setLoading(false);
    };
    load();
  }, [projectId, page]);

  return {
    tasks,
    filteredTasks,
    pagination,
    loading,
    page,
    setPage,
    setStatus,
    setSearch,
  };
}
