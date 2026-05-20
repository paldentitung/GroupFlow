const MainButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 px-5 py-2 rounded-[10px] text-white text-sm font-semibold transition-all duration-150 hover:-translate-y-px disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
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
