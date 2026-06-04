import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { ProjectsContext } from "../contexts/ProjectsContext.jsx";
import { useContext } from "react";
import AvatarGroup from "./AvatarGroup.jsx";

const PROGRESS_COLORS = {
  Active: "#4f46e5",
  Completed: "#059669",
  "On Hold": "#d97706",
};

// ── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ value = 0, color = { progressColor } }) => (
  <div className="w-full h-1.25 rounded-full overflow-hidden bg-(--color-border)">
    <div
      className="h-full rounded-full transition-[width] duration-500 ease-in-out"
      style={{ width: `${value}%`, background: color }}
    />
  </div>
);

// ── Status Badge ─────────────────────────────────────────────────────────────
const BADGE_STYLES = {
  Active: "bg-indigo-50 text-indigo-600",
  Completed: "bg-emerald-50 text-emerald-600",
  "On Hold": "bg-amber-50 text-amber-600",
};

const Badge = ({ label }) => (
  <span
    className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
      BADGE_STYLES[label] ?? "bg-gray-100 text-gray-500"
    }`}
  >
    {label}
  </span>
);

const ProjectCard = ({
  name = "Untitled Project",
  desc = "",
  status = "Active",
  progress = 0,
  members = [],
  extra = 0,
  due = "",
  id,
  onDelete = () => {},
  owner,
}) => {
  const progressColor = PROGRESS_COLORS[status] ?? "#4f46e5";
  const { handleDeleteProject } = useContext(ProjectsContext);

  return (
    <Link
      to={`/projects/${id}`}
      className="bg-(--color-surface) border border-(--color-border) rounded-xl p-5 flex flex-col gap-3 min-w-0 hover:shadow-sm transition-shadow duration-200"
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <p className="font-bold text-[15.5px] text-(--color-text-primary) truncate">
            {name}
          </p>
          <p className="text-[13px] text-(--color-text-muted) mt-0.5 line-clamp-1">
            {desc}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge label={status} />

          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteProject(id);
            }}
            className="text-[#9ca3af] hover:text-[#ef4444] transition-colors p-1 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-[12.5px] mb-1.5">
          <span className="text-(--color-text-muted)">Progress</span>
          <span className="font-semibold text-(--color-text-primary)">
            {progress}%
          </span>
        </div>
        <ProgressBar value={progress} color={progressColor} />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <AvatarGroup members={members} />
        {due && (
          <span className="text-[12.5px] text-(--color-text-muted)">
            Due {due}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
