import React from "react";
import Header from "../components/Header";
import { tasks } from "../data/tasks";
import ProjectCard from "../components/ProjectCard";
import TaskTable from "../components/TaskTable";
import { useProjects } from "../hooks/useProjects.js";
import { formatDate } from "../utils/formatDate.js";
import { useTasksContext } from "../contexts/TasksContext";
import { useEffect, useState } from "react";
import { useUserTasks } from "../hooks/useUserTasks.js";
import { useAddProject } from "../contexts/AddProjectContext.jsx";
import ProjectListing from "../components/ProjectListing.jsx";
import { useProjectTasks } from "../hooks/useProjectTasks.js";
import { useMembers } from "../hooks/useMembers.js";
import { User } from "lucide-react";

const FolderIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
    />
  </svg>
);
const TaskIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);
const TeamIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0zM3 17a3 3 0 116 0"
    />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, value, label, iconBg, iconColor }) => (
  <div className="flex-1 min-w-0 bg-(--color-surface) border border-(--color-border) rounded-xl p-5 flex flex-col gap-2">
    <span className="text-[13.5px] font-medium text-(--color-text-muted)">
      {label}
    </span>
    <div className="flex items-center justify-between">
      <span className="text-[28px] font-bold leading-none text-(--color-text-primary)">
        {value}
      </span>
      <span
        className="w-9 h-9 flex items-center justify-center rounded-lg"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </span>
    </div>
  </div>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const { projects, activeProject } = useProjects();
  const { tasks } = useProjectTasks(activeProject?._id);
  const { members } = useMembers(activeProject?._id);
  const { userTasks } = useUserTasks();
  const {
    loading,
    pagination,
    page,
    setPage,
    filteredTasks,
    setStatus,
    setSearch,
  } = useUserTasks();
  const { isModalOpen, setIsModalOpen } = useAddProject();

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary) overflow-hidden ">
      <Header
        title="Dashboard"
        buttonName="New Project"
        onClick={() => setIsModalOpen((prev) => !prev)}
      />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FolderIcon />}
            value={projects?.length}
            label="Total Projects"
            iconBg="#eef2ff"
            iconColor="#4f46e5"
          />
          <StatCard
            icon={<TaskIcon />}
            value={tasks?.length}
            label="Active Project Tasks"
            iconBg="#e0f2fe"
            iconColor="#0891b2"
          />
          <StatCard
            icon={<TeamIcon />}
            value={members?.length}
            label="Team Members"
            iconBg="#f3e8ff"
            iconColor="#7c3aed"
          />
          <StatCard
            icon={<User />}
            value={userTasks?.length}
            label="My Tasks"
            iconBg="#ecfdf5"
            iconColor="#059669"
          />
        </div>

        <h2 className="text-base font-bold mb-4">My Projects</h2>

        <ProjectListing projects={projects} loading={loading} />

        <h2 className="text-base font-bold mb-4">Recent Tasks</h2>
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

export default Dashboard;
