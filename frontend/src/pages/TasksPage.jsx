import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import { tasks } from "../data/tasks";
import TaskTable from "../components/TaskTable";

// ── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4h18M7 12h10M11 20h2"
    />
  </svg>
);

const SortIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
    />
  </svg>
);

const XIcon = () => (
  <svg
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// ── Filter Tag ────────────────────────────────────────────────────────────────
const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
    {label}
    <button
      onClick={onRemove}
      className="hover:text-indigo-900 transition-colors"
    >
      <XIcon />
    </button>
  </span>
);

// ── Options ───────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ["All", "Todo", "In Progress", "Completed", "Overdue"];
const PRIORITY_OPTIONS = ["All", "High", "Medium", "Low"];
const SORT_OPTIONS = [
  { label: "Due Date", value: "due" },
  { label: "Name", value: "name" },
  { label: "Status", value: "status" },
  { label: "Priority", value: "priority" },
];

// ── Tasks Page ────────────────────────────────────────────────────────────────
function TasksPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sortBy, setSortBy] = useState("due");

  const displayed = useMemo(() => {
    let list = [...tasks];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.project.toLowerCase().includes(q) ||
          t.assigned.name.toLowerCase().includes(q),
      );
    }
    if (status !== "All") list = list.filter((t) => t.status === status);
    if (priority !== "All") list = list.filter((t) => t.priority === priority);

    list.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      if (sortBy === "priority") {
        const order = { High: 0, Medium: 1, Low: 2 };
        return (order[a.priority] ?? 3) - (order[b.priority] ?? 3);
      }
      return new Date(a.due || "9999") - new Date(b.due || "9999");
    });
    return list;
  }, [search, status, priority, sortBy]);

  const activeTags = [
    ...(status !== "All"
      ? [{ label: `Status: ${status}`, clear: () => setStatus("All") }]
      : []),
    ...(priority !== "All"
      ? [{ label: `Priority: ${priority}`, clear: () => setPriority("All") }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary)">
      <Header title="Tasks" buttonName="New Task" />

      <div className="p-4 md:p-6 space-y-4">
        {/* ── Search + Controls ── */}
        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          <div className="relative flex-1 min-w-40 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-[13.5px] text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-(--color-text-muted)">
              <FilterIcon />
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-[13px] font-medium px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer transition"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Statuses" : s}
                </option>
              ))}
            </select>
          </div>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="text-[13px] font-medium px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer transition"
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All Priorities" : p}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5">
            <span className="text-(--color-text-muted)">
              <SortIcon />
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[13px] font-medium px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer transition"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
          </div>

          <span className="ml-auto text-[13px] text-(--color-text-muted) shrink-0">
            {displayed.length} {displayed.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {/* ── Active filter tags ── */}
        {activeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[12px] text-(--color-text-muted) font-medium">
              Filters:
            </span>
            {activeTags.map((t) => (
              <FilterTag key={t.label} label={t.label} onRemove={t.clear} />
            ))}
            <button
              onClick={() => {
                setStatus("All");
                setPriority("All");
              }}
              className="text-[12px] text-(--color-text-muted) hover:text-red-500 transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        <TaskTable tasks={displayed} />
      </div>
    </div>
  );
}

export default TasksPage;
