import React from "react";

const MainButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 py-2 px-4 rounded-[10px] text-white text-xs md:text-sm font-semibold text-nowrap transition-all duration-150 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer ${className}`}
      style={{
        background: "var(--color-accent)",
        boxShadow: "0 4px 16px rgba(79,70,229,.35)",
      }}
    >
      {children}
    </button>
  );
};

export default MainButton;
