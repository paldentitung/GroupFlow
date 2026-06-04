import React from "react";
import Pagination from "./Pagination";
import Avatar from "./Avatar";

// ── Status Chip ───────────────────────────────────────────────────────────────
const CHIP_CLASSES = {
  in_progress: "bg-indigo-50 text-indigo-600",
  completed: "bg-emerald-50 text-emerald-600",
  todo: "bg-gray-100 text-gray-500",
  overdue: "bg-red-50 text-red-600",
};

const CHIP_DOTS = {
  in_progress: "bg-indigo-400",
  completed: "bg-emerald-400",
  todo: "bg-gray-400",
  overdue: "bg-red-400",
};

const TaskChip = ({ label }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${
      CHIP_CLASSES[label] ?? "bg-gray-100 text-gray-500"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full shrink-0 ${CHIP_DOTS[label] ?? "bg-gray-400"}`}
    />
    {label.replace("_", " ")}
  </span>
);

// ── Priority Badge ────────────────────────────────────────────────────────────
const PRIORITY_CLASSES = {
  high: "bg-red-50 text-red-500 border border-red-100",
  medium: "bg-amber-50 text-amber-600 border border-amber-100",
  low: "bg-gray-100 text-gray-400 border border-gray-200",
};

const PriorityBadge = ({ label }) => (
  <span
    className={`inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold px-2 py-0.5 rounded-md ${
      PRIORITY_CLASSES[label] ?? "bg-gray-100 text-gray-400"
    }`}
  >
    {label === "high" && <span className="text-[9px]">▲</span>}
    {label === "medium" && <span className="text-[9px]">●</span>}
    {label === "low" && <span className="text-[9px]">▼</span>}
    {label}
  </span>
);

// ── Column Header ─────────────────────────────────────────────────────────────
const ColHeader = ({
  label,
  sortable = false,
  active = false,
  dir = "asc",
  align = "left",
}) => (
  <div
    className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none ${
      align === "right" ? "justify-end" : ""
    } ${sortable ? "cursor-pointer hover:text-gray-600 transition-colors" : ""}`}
  >
    {label}
    {sortable && (
      <span className="flex flex-col gap-[1px]">
        <svg
          className={`w-2.5 h-2.5 ${active && dir === "asc" ? "text-indigo-500" : "text-gray-300"}`}
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M5 0 10 6H0z" />
        </svg>
        <svg
          className={`w-2.5 h-2.5 ${active && dir === "desc" ? "text-indigo-500" : "text-gray-300"}`}
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M5 6 0 0h10z" />
        </svg>
      </span>
    )}
  </div>
);

// ── Table ─────────────────────────────────────────────────────────────────────
const TaskTable = ({ tasks = [], pagination, onPageChange }) => {
  return (
    <div className="font-sans">
      {/* Toolbar: search + single status filter */}
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search tasks…"
            className="w-full pl-9 pr-4 py-2 text-[13.5px] rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
          />
        </div>

        {/* Single filter: Status */}
        <div className="relative">
          <select
            defaultValue=""
            className="appearance-none pl-3 pr-8 py-2 text-[13px] rounded-lg border border-gray-200 bg-white text-gray-600 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 cursor-pointer transition-all"
          >
            <option value="">All statuses</option>
            <option value="todo">To do</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6 9 6 6 6-6"
            />
          </svg>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Column headers */}
        <div className="grid grid-cols-[2fr_1.8fr_1.8fr_1.2fr_1fr_0.9fr] px-5 py-3 border-b border-gray-100 bg-gray-50/70">
          <ColHeader label="Task" sortable active dir="asc" />
          <ColHeader label="Project" sortable />
          <ColHeader label="Assigned to" />
          <ColHeader label="Status" sortable />
          <ColHeader label="Priority" sortable />
          <ColHeader label="Due date" sortable align="right" />
        </div>

        {/* Rows */}
        {tasks.length > 0 ? (
          tasks.map((t, i) => {
            const initials =
              (t.assigneeId?.firstName?.[0] || "") +
              (t.assigneeId?.lastName?.[0] || "");
            const name =
              `${t.assigneeId?.firstName || ""} ${t.assigneeId?.lastName || ""}`.trim();
            const due = t.dueDate
              ? new Date(t.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—";
            const isOverdue = t.status === "overdue";

            return (
              <div
                key={t._id || i}
                className={`grid grid-cols-[2fr_1.8fr_1.8fr_1.2fr_1fr_0.9fr] px-5 py-3.5 items-center hover:bg-gray-50/70 transition-colors ${
                  i < tasks.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Title */}
                <div className="flex items-center gap-3 pr-3 min-w-0">
                  <span className="text-[13.5px] font-medium text-gray-800 truncate">
                    {t.title}
                  </span>
                </div>

                {/* Project */}
                <div className="flex items-center gap-1.5 pr-3 min-w-0">
                  <span className="w-2 h-2 rounded-sm bg-indigo-200 shrink-0" />
                  <span className="text-[13px] text-gray-500 truncate">
                    {t.projectId?.name || "not found"}
                  </span>
                </div>

                {/* Assignee */}
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar
                    firstName={t.assigneeId?.firstName}
                    lastName={t.assigneeId?.lastName}
                    image={t.assigneeId?.avatar}
                  />
                  <span className="text-[13px] text-gray-500 truncate">
                    {name || "Unassigned"}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <TaskChip label={t.status} />
                </div>

                {/* Priority */}
                <div>
                  <PriorityBadge label={t.priority} />
                </div>

                {/* Due */}
                <div
                  className={`text-right text-[12.5px] font-medium ${isOverdue ? "text-red-500" : "text-gray-400"}`}
                >
                  {due}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
            <svg
              className="w-8 h-8 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
              />
            </svg>
            <span className="text-[13.5px]">No tasks found</span>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        page={pagination?.page}
        totalPages={pagination?.totalPages}
        total={pagination?.total}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TaskTable;
