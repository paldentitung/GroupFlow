import React from "react";
import Header from "../components/Header";
import { tasks } from "../data/tasks";
import ProjectCard from "../components/ProjectCard";
import TaskTable from "../components/TaskTable";
import { useProjects } from "../hooks/useProjects.js";
// ── Icons ────────────────────────────────────────────────────────────────────
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
    <span
      className="w-9 h-9 flex items-center justify-center rounded-lg"
      style={{ background: iconBg, color: iconColor }}
    >
      {icon}
    </span>
    <span className="text-[28px] font-bold leading-none text-(--color-text-primary)">
      {value}
    </span>
    <span className="text-[13.5px] font-medium text-(--color-text-muted)">
      {label}
    </span>
  </div>
);

// ── Avatar ───────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#4f46e5",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
];

const Avatar = ({ initials, color, size = 28, overlap = false }) => (
  <span
    className="inline-flex items-center justify-center rounded-full border-2 border-(--color-surface) shrink-0 select-none font-bold text-white"
    style={{
      width: size,
      height: size,
      background: color,
      fontSize: size * 0.36,
      marginLeft: overlap ? -8 : 0,
    }}
  >
    {initials}
  </span>
);

// ── Task Status Chip ─────────────────────────────────────────────────────────
const CHIP_CLASSES = {
  "In Progress": "bg-indigo-50 text-indigo-600",
  Completed: "bg-emerald-50 text-emerald-600",
  Overdue: "bg-red-50 text-red-600",
  Todo: "bg-gray-100 text-gray-500",
};
const TaskChip = ({ label }) => (
  <span
    className={`whitespace-nowrap text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${CHIP_CLASSES[label] ?? CHIP_CLASSES.Todo}`}
  >
    {label}
  </span>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const { projects } = useProjects();
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary) overflow-hidden ">
      <Header title="Dashboard" buttonName="New Project" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FolderIcon />}
            value={6}
            label="Total Projects"
            iconBg="#eef2ff"
            iconColor="#4f46e5"
          />
          <StatCard
            icon={<TaskIcon />}
            value={14}
            label="Active Tasks"
            iconBg="#e0f2fe"
            iconColor="#0891b2"
          />
          <StatCard
            icon={<TeamIcon />}
            value={5}
            label="Team Members"
            iconBg="#f3e8ff"
            iconColor="#7c3aed"
          />
          <StatCard
            icon={<CheckIcon />}
            value={3}
            label="Completed This Week"
            iconBg="#ecfdf5"
            iconColor="#059669"
          />
        </div>

        <h2 className="text-base font-bold mb-4">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {projects.map((p) => (
            <ProjectCard key={p._id} {...p} id={p._id} />
          ))}
        </div>

        <h2 className="text-base font-bold mb-4">Recent Tasks</h2>
        <TaskTable tasks={tasks.slice(0, 8)} />
      </div>
    </div>
  );
}

export default Dashboard;
