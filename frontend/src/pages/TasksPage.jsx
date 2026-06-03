import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskTable from "../components/TaskTable";
import { useTasksContext } from "../contexts/TasksContext";
import { useUserTasks } from "../hooks/useUserTasks.js";

function TasksPage() {
  const { userTasks, loading } = useUserTasks();

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary)">
      <Header title="Tasks" buttonName="New Task" />

      <div className="p-4 md:p-6">
        <TaskTable tasks={userTasks} />
      </div>
    </div>
  );
}

export default TasksPage;
