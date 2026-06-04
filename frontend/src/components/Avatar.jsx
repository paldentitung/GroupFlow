import React, { useMemo } from "react";

const COLORS = [
  "#4f46e5",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
];

function getColorFromString(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(first = "", last = "") {
  return (first?.[0] || "") + (last?.[0] || "");
}

const Avatar = ({ user, firstName, lastName, size = 28, className = "" }) => {
  const fallbackFirst = user?.firstName || firstName;
  const fallbackLast = user?.lastName || lastName;

  const initials = getInitials(fallbackFirst, fallbackLast);

  const bgColor = useMemo(() => {
    const key = `${fallbackFirst || ""}${fallbackLast || ""}`;
    return getColorFromString(key);
  }, [fallbackFirst, fallbackLast]);

  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt="avatar"
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-white font-semibold select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: bgColor,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </span>
  );
};

export default Avatar;
