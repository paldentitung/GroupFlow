import { useEffect, useState } from "react";
import { useTasksContext } from "../contexts/TasksContext";

export function useUserTasks() {
  const { fetchCurrentUserTasks } = useTasksContext();

  const [userTasks, setUserTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredTasks = userTasks.filter((t) => {
    const matchStatus = status ? t.status === status : true;

    const matchSearch = search
      ? t.title.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchStatus && matchSearch;
  });
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const res = await fetchCurrentUserTasks(page, 10);

      setUserTasks(res.tasks || []);
      setPagination(res.pagination || null);

      setLoading(false);
    };
    load();
  }, [page]);

  return {
    userTasks,
    pagination,
    loading,
    page,
    setPage,
    filteredTasks,
    setSearch,
    setStatus,
  };
}
