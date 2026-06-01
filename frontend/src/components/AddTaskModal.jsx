import { useState } from "react";

const PRIORITIES = ["low", "medium", "high"];
const STATUSES = ["todo", "in_progress", "completed"];

const PRIORITY_STYLES = {
  low: "bg-emerald-50 text-emerald-600 border-emerald-200",
  medium: "bg-amber-50 text-amber-600 border-amber-200",
  high: "bg-red-50 text-red-600 border-red-200",
};

const STATUS_LABELS = {
  todo: "Todo",
  in_progress: "In Progress",
  completed: "Completed",
};

const AddTaskModal = ({
  onClose,
  onSubmit,
  projectId,
  createdBy,
  members = [],
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assigneeId: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        projectId,
        createdBy,
        dueDate: form.dueDate || undefined,
        assigneeId: form.assigneeId || undefined,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl flex flex-col"
        style={{ fontFamily: "'DM Sans', sans-serif", maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f0f1f3]">
          <div>
            <h2 className="text-[17px] font-semibold text-[#111827]">
              Add Task
            </h2>
            <p className="text-[12px] text-[#9ca3af] mt-0.5">
              Fill in the details for the new task
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9ca3af] hover:bg-[#f7f8fa] hover:text-[#111827] transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[#374151] uppercase tracking-wide">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Design login screen"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={`w-full px-3.5 py-2.5 text-[13.5px] rounded-lg border outline-none transition-colors text-[#111827] placeholder:text-[#d1d5db] ${
                errors.title
                  ? "border-red-300 bg-red-50 focus:border-red-400"
                  : "border-[#e8eaed] bg-[#f9fafb] focus:border-[#4f46e5] focus:bg-white"
              }`}
            />
            {errors.title && (
              <span className="text-[11.5px] text-red-500">{errors.title}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[#374151] uppercase tracking-wide">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Add more context about this task..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full px-3.5 py-2.5 text-[13.5px] rounded-lg border border-[#e8eaed] bg-[#f9fafb] outline-none focus:border-[#4f46e5] focus:bg-white transition-colors text-[#111827] placeholder:text-[#d1d5db] resize-none"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#374151] uppercase tracking-wide">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full px-3.5 py-2.5 text-[13.5px] rounded-lg border border-[#e8eaed] bg-[#f9fafb] outline-none focus:border-[#4f46e5] focus:bg-white transition-colors text-[#111827] cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#374151] uppercase tracking-wide">
                Priority
              </label>
              <div className="flex gap-2">
                {PRIORITIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => set("priority", p)}
                    className={`flex-1 py-2 text-[12px] font-semibold rounded-lg border capitalize transition-colors ${
                      form.priority === p
                        ? PRIORITY_STYLES[p]
                        : "border-[#e8eaed] text-[#9ca3af] bg-[#f9fafb] hover:bg-[#f3f4f6]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Due Date + Assignee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#374151] uppercase tracking-wide">
                Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => set("dueDate", e.target.value)}
                className="w-full px-3.5 py-2.5 text-[13.5px] rounded-lg border border-[#e8eaed] bg-[#f9fafb] outline-none focus:border-[#4f46e5] focus:bg-white transition-colors text-[#111827] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#374151] uppercase tracking-wide">
                Assignee
              </label>
              <select
                value={form.assigneeId}
                onChange={(e) => set("assigneeId", e.target.value)}
                className="w-full px-3.5 py-2.5 text-[13.5px] rounded-lg border border-[#e8eaed] bg-[#f9fafb] outline-none focus:border-[#4f46e5] focus:bg-white transition-colors text-[#111827] cursor-pointer"
              >
                <option value="">Unassigned</option>
                {members.map((m) => (
                  <option key={m.user?._id} value={m.user?._id}>
                    {m.user?.firstName} {m.user?.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#f0f1f3]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13.5px] font-medium text-[#6b7280] bg-[#f7f8fa] hover:bg-[#f0f1f3] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 text-[13.5px] font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
