import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskTable from "../components/TaskTable";
import { useTasksContext } from "../contexts/TasksContext";

function TasksPage() {
  const { fetchCurrentUserTasks } = useTasksContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCurrentUserTasks();
      setTasks(Array.isArray(data) ? data : []);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary)">
      <Header title="Tasks" buttonName="New Task" />

      <div className="p-4 md:p-6">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
}

export default TasksPage;
