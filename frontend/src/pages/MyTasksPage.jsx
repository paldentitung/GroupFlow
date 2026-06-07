import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import TaskTable from "../components/TaskTable.jsx";
import { useTasksContext } from "../contexts/TasksContext.jsx";
import { useUserTasks } from "../hooks/useUserTasks.js";
import { Outlet } from "react-router-dom";
function MyTasksPage() {
  const {
    loading,
    pagination,
    page,
    setPage,
    filteredTasks,
    setStatus,
    setSearch,
  } = useUserTasks();

  return (
    <>
      <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary)">
        <Header title="Tasks" showButton={false} />

        <div className="p-4 md:p-6">
          <TaskTable
            tasks={filteredTasks}
            pagination={pagination}
            onPageChange={setPage}
            setSearch={setSearch}
            setStatus={setStatus}
          />
        </div>
      </div>

      <div className="fixed top-0 right-0 h-screen z-50">
        <Outlet /> {/* ✅ removed context prop, no longer needed */}
      </div>
    </>
  );
}

export default MyTasksPage;
