import React from "react";

// ── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials, color, size = 26 }) => (
  <span
    className="inline-flex items-center justify-center rounded-full border-2 border-(--color-surface) shrink-0 select-none font-bold text-white"
    style={{
      width: size,
      height: size,
      background: color,
      fontSize: size * 0.36,
    }}
  >
    {initials}
  </span>
);

// ── Task Status Chip ──────────────────────────────────────────────────────────
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

// ── Priority Badge ────────────────────────────────────────────────────────────
const PRIORITY_CLASSES = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-gray-100 text-gray-500",
};

const PriorityBadge = ({ label }) => (
  <span
    className={`whitespace-nowrap text-[11.5px] font-semibold px-2 py-0.5 rounded-md ${PRIORITY_CLASSES[label] ?? "bg-gray-100 text-gray-400"}`}
  >
    {label}
  </span>
);

// ── TaskTable ─────────────────────────────────────────────────────────────────
// Props:
//   tasks — array of task objects to render
//   Each task: { name, project, assigned: { initials, color, name }, status, priority, due }

const TaskTable = ({ tasks = [] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--color-border)">
      <div className="min-w-170">
        {/* Header row */}
        <div className="grid grid-cols-[2fr_2fr_2fr_1.2fr_1fr_0.8fr] px-5 py-3 border-b border-(--color-border) text-[11.5px] font-bold uppercase tracking-wider text-(--color-text-muted) bg-(--color-surface)">
          <span>Task</span>
          <span>Project</span>
          <span>Assigned</span>
          <span>Status</span>
          <span>Priority</span>
          <span className="text-right">Due</span>
        </div>

        {/* Rows */}
        <div className="bg-(--color-surface)">
          {tasks.length > 0 ? (
            tasks.map((t, i) => (
              <div
                key={i}
                className={`grid grid-cols-[2fr_2fr_2fr_1.2fr_1fr_0.8fr] px-5 py-3.5 items-center text-[13.5px] transition-colors duration-150 hover:bg-(--color-bg) ${i < tasks.length - 1 ? "border-b border-(--color-border)" : ""}`}
              >
                <span className="font-semibold truncate pr-2">{t.name}</span>
                <span className="text-(--color-text-muted) truncate pr-2">
                  {t.project}
                </span>
                <span className="flex items-center gap-2 min-w-0">
                  <Avatar
                    initials={t.assigned.initials}
                    color={t.assigned.color}
                    size={26}
                  />
                  <span className="text-(--color-text-muted) truncate">
                    {t.assigned.name}
                  </span>
                </span>
                <span>
                  <TaskChip label={t.status} />
                </span>
                <span>
                  <PriorityBadge label={t.priority ?? "Medium"} />
                </span>
                <span className="text-right text-[13px] text-(--color-text-muted)">
                  {t.due}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-(--color-text-muted)">
              <svg
                width="36"
                height="36"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.4}
                className="opacity-40"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-[14px] font-semibold">No tasks found</p>
              <p className="text-[13px]">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
