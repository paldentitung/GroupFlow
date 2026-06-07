import Header from "../components/Header.jsx";
import TaskTable from "../components/TaskTable.jsx";
import { useEffect } from "react";
import { getTasks } from "../services/tasksService.js";
import toast from "react-hot-toast";
import { useProjects } from "../hooks/useProjects.js";
import { useProjectTasks } from "../hooks/useProjectTasks.js";

function TasksPage() {
  const { activeProject } = useProjects();
  const { filteredTasks, pagination, setPage, setStatus, setSearch } =
    useProjectTasks(activeProject?._id);

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary)">
      <Header title="Tasks" buttonName="New Task" />
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
  );
}

export default TasksPage;
