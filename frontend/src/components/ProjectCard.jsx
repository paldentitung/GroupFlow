import React from "react";

// ── Avatar ───────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#4f46e5",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
];

const Avatar = ({ initials, colorIndex = 0, overlap = false }) => (
  <span
    className="inline-flex items-center justify-center rounded-full border-2 border-(--color-surface) shrink-0 select-none font-bold text-white text-[10px]"
    style={{
      width: 28,
      height: 28,
      background: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length],
      marginLeft: overlap ? -8 : 0,
    }}
  >
    {initials}
  </span>
);

const AvatarGroup = ({ members = [], extra = 0 }) => (
  <div className="flex items-center">
    {members.map((m, i) => (
      <Avatar key={i} initials={m.initials} colorIndex={i} overlap={i > 0} />
    ))}
    {extra > 0 && (
      <span
        className="inline-flex items-center justify-center rounded-full border-2 border-(--color-surface) text-[11px] font-bold text-(--color-text-muted) bg-(--color-border)"
        style={{ width: 28, height: 28, marginLeft: -8 }}
      >
        +{extra}
      </span>
    )}
  </div>
);

// ── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ value = 0, color = "var(--color-accent)" }) => (
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
  progressColor = "#4f46e5",
  members = [],
  extra = 0,
  due = "",
}) => {
  return (
    <div className="bg-(--color-surface) border border-(--color-border) rounded-xl p-5 flex flex-col gap-3 min-w-0 hover:shadow-sm transition-shadow duration-200">
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
        <Badge label={status} />
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
        <AvatarGroup members={members} extra={extra} />
        {due && (
          <span className="text-[12.5px] text-(--color-text-muted)">
            Due {due}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
