import React from "react";
import Header from "../components/Header";
import { tasks } from "../data/tasks";
import { projects } from "../data/projects";
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
  <div className="flex-1 min-w-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-2">
    <span
      className="w-9 h-9 flex items-center justify-center rounded-lg"
      style={{ background: iconBg, color: iconColor }}
    >
      {icon}
    </span>
    <span className="text-[28px] font-bold leading-none text-[var(--color-text-primary)]">
      {value}
    </span>
    <span className="text-[13.5px] font-medium text-[var(--color-text-muted)]">
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
    className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-surface)] shrink-0 select-none font-bold text-white"
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

const AvatarGroup = ({ members, extra }) => (
  <div className="flex items-center">
    {members.map((m, i) => (
      <Avatar
        key={i}
        initials={m.initials}
        color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
        overlap={i > 0}
      />
    ))}
    {extra > 0 && (
      <span
        className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-surface)] text-[11px] font-bold text-[var(--color-text-muted)] bg-[var(--color-border)]"
        style={{ width: 28, height: 28, marginLeft: -8 }}
      >
        +{extra}
      </span>
    )}
  </div>
);

// ── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ value, color }) => (
  <div className="w-full h-[5px] rounded-full overflow-hidden bg-[var(--color-border)]">
    <div
      className="h-full rounded-full transition-[width] duration-600 ease-in-out"
      style={{ width: `${value}%`, background: color }}
    />
  </div>
);

// ── Status Badge ─────────────────────────────────────────────────────────────
const BADGE_CLASSES = {
  Active: "bg-indigo-50 text-indigo-600",
  Completed: "bg-emerald-50 text-emerald-600",
  "On Hold": "bg-amber-50 text-amber-600",
};
const Badge = ({ label }) => (
  <span
    className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${BADGE_CLASSES[label] ?? "bg-gray-100 text-gray-500"}`}
  >
    {label}
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

// ── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  name,
  desc,
  status,
  progress,
  members,
  extra,
  due,
  progressColor,
}) => (
  <div className="flex-1 basis-[calc(50%-8px)] min-w-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-3">
    <div className="flex justify-between items-start gap-3">
      <div>
        <p className="font-bold text-[15.5px] text-[var(--color-text-primary)]">
          {name}
        </p>
        <p className="text-[13px] text-[var(--color-text-muted)] mt-0.5">
          {desc}
        </p>
      </div>
      <Badge label={status} />
    </div>

    <div>
      <div className="flex justify-between text-[12.5px] mb-1.5">
        <span className="text-[var(--color-text-muted)]">Progress</span>
        <span className="font-semibold text-[var(--color-text-primary)]">
          {progress}%
        </span>
      </div>
      <ProgressBar value={progress} color={progressColor} />
    </div>

    <div className="flex justify-between items-center">
      <AvatarGroup members={members} extra={extra} />
      <span className="text-[12.5px] text-[var(--color-text-muted)]">
        Due {due}
      </span>
    </div>
  </div>
);

// ── Data ─────────────────────────────────────────────────────────────────────

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] ">
      <Header title="Dashboard" buttonName="New Project" />
      <div className="p-6">
        {/* ── Stat Cards ── */}
        <div className="flex flex-wrap gap-4 mb-8">
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

        {/* ── My Projects ── */}
        <h2 className="text-base font-bold mb-4">My Projects</h2>
        <div className="flex flex-wrap gap-4 mb-8">
          {projects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>

        {/* ── Recent Tasks ── */}
        <h2 className="text-base font-bold mb-4">Recent Tasks</h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[2fr_2fr_2fr_1.2fr_0.8fr] px-5 py-3 border-b border-[var(--color-border)] text-[11.5px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            <span>Task</span>
            <span>Project</span>
            <span>Assigned</span>
            <span>Status</span>
            <span className="text-right">Due</span>
          </div>

          {/* Task rows */}
          {tasks.map((t, i) => (
            <div
              key={i}
              className={`grid grid-cols-[2fr_2fr_2fr_1.2fr_0.8fr] px-5 py-3.5 items-center text-[13.5px] transition-colors duration-150 hover:bg-[var(--color-bg)] ${i < tasks.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
            >
              <span className="font-semibold">{t.name}</span>
              <span className="text-[var(--color-text-muted)]">
                {t.project}
              </span>
              <span className="flex items-center gap-2">
                <Avatar
                  initials={t.assigned.initials}
                  color={t.assigned.color}
                  size={26}
                />
                <span className="text-[var(--color-text-muted)]">
                  {t.assigned.name}
                </span>
              </span>
              <span>
                <TaskChip label={t.status} />
              </span>
              <span className="text-right text-[13px] text-[var(--color-text-muted)]">
                {t.due}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
