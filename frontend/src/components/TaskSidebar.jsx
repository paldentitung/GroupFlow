import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../hooks/useTask.js";
import { useProjects } from "../hooks/useProjects.js";
import { useTasksContext } from "../contexts/TasksContext.jsx";

import Avatar from "./Avatar.jsx";
import { getInitials } from "../utils/getInitials.js";
import { formatDate } from "../utils/formatDate.js";
import { useComments } from "../hooks/useComments.js";

function isOverdue(iso) {
  if (!iso) return false;
  return new Date(iso) < new Date();
}

const STATUS_STYLES = {
  todo: { dot: "bg-[#6b7280]", text: "text-[#6b7280]", label: "Todo" },
  in_progress: {
    dot: "bg-blue-500",
    text: "text-blue-600",
    label: "In Progress",
  },
  completed: { dot: "bg-emerald-500", text: "text-emerald-600", label: "Done" },
};

const STATIC_COMMENTS = [
  {
    id: 1,
    firstName: "Alex",
    lastName: "Kim",
    time: "2h ago",
    body: "Pushed initial commit, ready for review.",
  },
  {
    id: 2,
    firstName: "Nina",
    lastName: "Park",
    time: "Yesterday",
    body: "Updated the wireframes — let me know if anything blocks dev.",
  },
];

export default function TaskSidebar() {
  const { taskId } = useParams();
  const { task, loading } = useTask(taskId);
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { handleDeleteTask, handleUpdateTask } = useTasksContext(); // ✅ from context
  const { comments } = useComments();

  const handleClose = () => navigate(`/projects/${task?.projectId}`);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!task) return <div className="p-6">Task not found</div>;

  const project = projects?.find((p) => p._id === task.projectId);
  const status = STATUS_STYLES[task.status] ?? STATUS_STYLES.todo;
  const overdue = isOverdue(task.dueDate) && task.status !== "done";
  const assignee = task.assigneeId || task.createdBy;

  const markComplete = async () => {
    await handleUpdateTask(task._id, { status: "completed" });
  };
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-30"
        onClick={handleClose}
      />
      <div className="fixed top-0 right-0 h-screen w-[420px] bg-white border-l border-[#e8eaed] flex flex-col overflow-y-auto z-50 shadow-xl">
        {/* Header */}
        <div className="px-[22px] pt-5 pb-4 border-b border-[#e8eaed]">
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <span className="text-[15px] font-medium text-[#111827] leading-snug">
              {task.title}
            </span>
            <button
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f7f8fa] text-base shrink-0 transition-colors"
            >
              ✕
            </button>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 bg-[#f7f8fa] border border-[#e8eaed] rounded-full px-2.5 py-[3px] text-[11px] ${status.text}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${status.dot} inline-block`}
            />
            {status.label}
          </span>
          {task.description && (
            <p className="text-[13px] text-[#6b7280] leading-relaxed mt-2.5">
              {task.description}
            </p>
          )}
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-y-3 px-[22px] py-4 bg-[#f7f8fa] border-b border-[#e8eaed]">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
              Project
            </p>
            <p className="text-[13px] font-medium text-[#111827]">
              {project?.name ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
              Due
            </p>
            <p
              className={`text-[13px] font-medium ${overdue ? "text-[#dc2626]" : "text-[#111827]"}`}
            >
              {formatDate(task.dueDate)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
              Assigned to
            </p>
            <div className="flex items-center gap-1.5">
              <Avatar
                firstName={assignee?.firstName}
                lastName={assignee?.lastName}
              />
              <span className="text-[13px] font-medium text-[#111827]">
                {assignee?.firstName} {assignee?.lastName}
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
              Created
            </p>
            <p className="text-[13px] font-medium text-[#111827]">
              {formatDate(task.createdAt)}
            </p>
          </div>
        </div>

        {/* Comments */}
        <div className="px-[22px] pt-[18px]">
          <p className="text-[13px] font-medium text-[#111827] mb-3.5">
            Comments
          </p>
          <div className="flex flex-col gap-2.5">
            {comments.length > 0 ? (
              <>
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#f7f8fa] border border-[#e8eaed] rounded-xl px-3.5 py-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Avatar firstName={c.firstName} lastName={c.lastName} />
                        <span className="text-[13px] font-medium text-[#111827]">
                          {c.firstName} {c.lastName}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6b7280]">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#6b7280] leading-[1.55]">
                      {c.body}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <>no comments</>
            )}
          </div>
        </div>

        {/* Comment input */}
        <div className="flex gap-2.5 items-end px-[22px] py-4 mt-3.5 border-t border-[#e8eaed]">
          <textarea
            placeholder="Write a comment..."
            rows={1}
            className="flex-1 bg-[#f7f8fa] border border-[#e8eaed] rounded-lg px-3 py-2 text-[13px] text-[#111827] placeholder:text-[#6b7280] outline-none resize-none min-h-[38px] focus:border-indigo-500 transition-colors"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-medium rounded-lg px-4 h-[38px] shrink-0 transition-colors cursor-pointer">
            Post
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-[22px] pb-[18px] border-t border-[#e8eaed] pt-3.5 mt-auto">
          <button
            onClick={() => handleDeleteTask(task._id, task.projectId)} // ✅ no more useOutletContext
            className="flex items-center gap-1.5 border border-[#e8eaed] rounded-lg px-3.5 py-2 text-[13px] text-[#dc2626] hover:bg-red-50 transition-colors cursor-pointer"
          >
            🗑 Delete
          </button>
          <button
            onClick={markComplete}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer"
          >
            ✓ Mark complete
          </button>
        </div>
      </div>
    </>
  );
}
