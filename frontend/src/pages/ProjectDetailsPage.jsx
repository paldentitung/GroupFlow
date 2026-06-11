import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useProjects } from "../hooks/useProjects.js";
import { formatDate } from "../utils/formatDate.js";
import { getInitials } from "../utils/getInitials.js";
import { useTasksContext } from "../contexts/TasksContext.jsx";
import AddTaskModal from "../components/AddTaskModal.jsx";
import InviteMembersModal from "../components/InviteMembersModal.jsx";
import { useMembers } from "../hooks/useMembers.js";
import { toast } from "react-hot-toast";
import Avatar from "../components/Avatar.jsx";
import AvatarGroup from "../components/AvatarGroup.jsx";
import Modal from "../components/Modal.jsx";
import { Calendar, Check, X } from "lucide-react";
const STATUS_STYLES = {
  Active: "text-[#059669] bg-[#d1fae5]",
  Completed: "text-[#4f46e5] bg-[#eef2ff]",
  "On Hold": "text-[#d97706] bg-[#fef3c7]",
};

function TaskCard({
  title,
  subtitle,
  assignee,
  date,
  done,
  projectId,
  taskId,
  acceptanceStatus,
  onAccept,
}) {
  if (acceptanceStatus === "pending") {
    return (
      <div className="bg-white border border-[#e8eaed] rounded-xl p-4 mb-2.5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#111827] truncate">
              {title}
            </p>
            {subtitle && (
              <p className="text-[11.5px] text-[#6b7280] line-clamp-2 mt-0.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-[11px] font-medium text-[#92400e] bg-[#fef3c7] border border-[#fde68a] px-2 py-0.5 rounded-full shrink-0">
            Pending
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Avatar user={assignee} size={22} />
            <span className="text-[11.5px] text-[#6b7280]">
              {assignee?.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#9ca3af]">
            <Calendar size={13} />
            <span className="text-[11px]">{date || "No due date"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-[#f0f1f3]">
          <span className="text-[11.5px] text-[#9ca3af]">
            Respond to this task
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                onAccept(taskId, "accepted");
              }}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb] hover:bg-[#bfdbfe] transition-colors"
              title="Accept"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAccept(taskId, "rejected");
              }}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#fee2e2] text-[#dc2626] hover:bg-[#fecaca] transition-colors"
              title="Reject"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/projects/${projectId}/task/${taskId}`}
      className="bg-white border border-[#e8eaed] rounded-xl p-4 mb-2.5 flex flex-col gap-3 hover:shadow-sm transition-shadow duration-150 block"
    >
      <div>
        <p
          className={`text-[13px] font-medium mb-0.5 leading-snug ${
            done ? "line-through text-[#9ca3af]" : "text-[#111827]"
          }`}
        >
          {title}
        </p>
        {subtitle && (
          <p
            className={`text-[11.5px] line-clamp-2 leading-relaxed ${done ? "line-through text-[#9ca3af]" : "text-[#6b7280]"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div
        className={`flex items-center justify-between ${done ? "opacity-60" : ""}`}
      >
        <div className="flex items-center gap-1.5">
          <Avatar user={assignee} size={22} />
          <span className="text-[11.5px] text-[#6b7280]">{assignee?.name}</span>
        </div>
        <div className="flex items-center gap-1 text-[#9ca3af]">
          <Calendar size={13} />
          <span className="text-[11px]">{date || "No due date"}</span>
        </div>
      </div>
    </Link>
  );
}

const TABS = ["Task Board", "Members"];

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [activeTab, setActiveTab] = useState("Task Board");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeCol, setActiveCol] = useState("todo");

  const { handleUpdateProject } = useProjects();
  const { tasks, handleCreateTask, fetchTasks, handleRespondToTask } =
    useTasksContext();
  const { handleInviteMember } = useMembers(id);
  const handleEdit = async () => {
    await handleUpdateProject(project._id, editData);
    setShowEditModal(false);
  };
  const project = projects.find((p) => p._id === id);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    status: "",
    dueDate: "",
    startDate: "",
  });

  useEffect(() => {
    if (id) fetchTasks(id); // ✅ moved above early return
  }, [id]);
  useEffect(() => {
    if (project) {
      setEditData({
        name: project.name ?? "",
        description: project.description ?? "",
        status: project.status ?? "",
        dueDate: project.dueDate?.slice(0, 10) ?? "",
        startDate: project.startDate?.slice(0, 10) ?? "",
      });
    }
  }, [project]);
  if (!project) return <div className="p-6">Project not found</div>;

  return (
    <>
      <div
        className="min-h-screen p-4"
        style={{ background: "#f7f8fa", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Back */}
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-1.5 text-[#4f46e5] text-sm mb-5"
        >
          ← Back to Projects
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 mb-1 flex-wrap">
              <h1 className="text-[22px] font-medium text-[#111827] truncate">
                {project.name}
              </h1>
              <span
                className={`flex items-center gap-1.5 text-xs rounded-full px-3 py-1 shrink-0 ${STATUS_STYLES[project.status] || "text-[#6b7280] bg-[#f3f4f6]"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                {project.status}
              </span>
            </div>
            <p className="text-sm text-[#6b7280]">
              {project.description || "No description provided."}
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0 self-start">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-1.5 bg-white border border-[#e8eaed] rounded-lg px-4 py-2 text-sm text-[#111827]"
            >
              ✎ Edit
            </button>
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center gap-1.5 bg-[#4f46e5] border-none rounded-lg px-4 py-2 text-sm text-white"
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Meta card */}
        <div className="bg-white border border-[#e8eaed] rounded-[14px] p-5 mb-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-[#f0f1f3]">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Start
              </span>
              <span className="text-[13px] font-medium text-[#111827]">
                {formatDate(project.startDate) || "Not set"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Due
              </span>
              <span className="text-[13px] font-medium text-[#111827]">
                {formatDate(project.dueDate) || "Not set"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Owner
              </span>
              <div className="flex items-center gap-1.5">
                <Avatar user={project.owner} />
                <span className="text-[13px] font-medium text-[#111827] truncate">
                  {project?.owner?.firstName}{" "}
                  {project?.owner?.lastName || "Not set"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Members
              </span>
              <div className="flex items-center gap-2">
                <AvatarGroup members={project.members.map((m) => m.user)} />
                <span className="text-[12px] text-[#9ca3af]">
                  {project.members.length} members
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af] whitespace-nowrap">
              Progress
            </span>
            <span className="text-[13px] font-semibold text-[#111827] w-9">
              {project.progress}%
            </span>
            <div className="flex-1 h-[5px] bg-[#f0f1f3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#059669] rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#e8eaed] mb-5">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`text-sm px-4 py-2 border-b-2 -mb-px cursor-pointer ${activeTab === item ? "text-[#4f46e5] border-[#4f46e5] font-medium" : "text-[#6b7280] border-transparent"}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Task Board */}
        {activeTab === "Task Board" &&
          (() => {
            const COLUMNS = [
              { label: "Todo", color: "bg-[#6b7280]", status: "todo" },
              {
                label: "In Progress",
                color: "bg-[#4f46e5]",
                status: "in_progress",
              },
              {
                label: "Completed",
                color: "bg-[#059669]",
                status: "completed",
              },
            ];

            return (
              <>
                {/* Mobile column tabs */}
                <div className="flex md:hidden gap-1 bg-white border border-[#e8eaed] rounded-xl p-1 mb-4">
                  {COLUMNS.map(({ label, color, status }) => {
                    const count =
                      tasks?.filter((t) => t.status === status).length ?? 0;
                    return (
                      <button
                        key={status}
                        onClick={() => setActiveCol(status)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                          activeCol === status
                            ? "bg-[#eef2ff] text-[#4f46e5]"
                            : "text-[#6b7280]"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                        {label}
                        <span className="font-normal">({count})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Desktop: 3 col grid, Mobile: active col only */}
                <div className="hidden md:grid md:grid-cols-3 gap-4">
                  {COLUMNS.map(({ label, color, status }) => {
                    const colTasks =
                      tasks?.filter((t) => t.status === status) ?? [];
                    return (
                      <div
                        key={label}
                        className="bg-white border border-[#e8eaed] rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-[#111827] mb-3">
                          <span className={`w-2 h-2 rounded-full ${color}`} />
                          {label}
                          <span className="font-normal text-[#6b7280]">
                            {colTasks.length}
                          </span>
                        </div>
                        {colTasks.length === 0 ? (
                          <p className="text-xs text-[#9ca3af] text-center py-4">
                            No tasks
                          </p>
                        ) : (
                          colTasks.map((t) => (
                            <TaskCard
                              key={t._id}
                              taskId={t._id}
                              projectId={project._id}
                              title={t.title}
                              subtitle={t.description}
                              acceptanceStatus={t.acceptanceStatus}
                              onAccept={(taskId, response) =>
                                handleRespondToTask(
                                  taskId,
                                  response,
                                  project._id,
                                )
                              }
                              assignee={t.assigneeId || t.createdBy}
                              date={formatDate(t.dueDate)}
                              done={t.status === "completed"}
                            />
                          ))
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: single column view */}
                <div className="md:hidden">
                  {COLUMNS.filter((c) => c.status === activeCol).map(
                    ({ label, color, status }) => {
                      const colTasks =
                        tasks?.filter((t) => t.status === status) ?? [];
                      return (
                        <div
                          key={label}
                          className="bg-white border border-[#e8eaed] rounded-xl p-4"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium text-[#111827] mb-3">
                            <span className={`w-2 h-2 rounded-full ${color}`} />
                            {label}
                            <span className="font-normal text-[#6b7280]">
                              {colTasks.length}
                            </span>
                          </div>
                          {colTasks.length === 0 ? (
                            <p className="text-xs text-[#9ca3af] text-center py-4">
                              No tasks
                            </p>
                          ) : (
                            colTasks.map((t) => (
                              <TaskCard
                                key={t._id}
                                taskId={t._id}
                                projectId={project._id}
                                title={t.title}
                                subtitle={t.description}
                                acceptanceStatus={t.acceptanceStatus}
                                onAccept={(taskId, response) =>
                                  handleRespondToTask(
                                    taskId,
                                    response,
                                    project._id,
                                  )
                                }
                                assignee={t.assigneeId || t.createdBy}
                                date={formatDate(t.dueDate)}
                                done={t.status === "completed"}
                              />
                            ))
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </>
            );
          })()}

        {activeTab === "Members" && (
          <div className="bg-white border border-[#e8eaed] rounded-[14px] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-base font-medium text-[#111827]">
                  Project Members
                </h2>
                <p className="text-xs text-[#6b7280]">
                  Manage access and roles for this workspace.
                </p>
              </div>

              <button
                onClick={() => setShowInviteModal(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#4f46e5] border-none rounded-lg px-4 py-2 text-sm text-white hover:bg-[#4338ca] transition-colors"
              >
                + Invite Member
              </button>
            </div>
            <div className="divide-y divide-[#f0f1f3]">
              {project.members && project.members.length > 0 ? (
                project.members.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar user={member.user} />
                      <div>
                        <p className="text-sm font-medium text-[#111827]">
                          {member.user?.firstName} {member.user?.lastName}
                        </p>
                        <p className="text-xs text-[#6b7280]">
                          {member.user?.email || "No email available"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full border border-[#e8eaed] bg-[#f7f8fa] text-[#4b5563] font-medium capitalize">
                      {member.role || "Member"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-[#6b7280] text-center py-6">
                  No members added yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showAddTask && (
        <AddTaskModal
          onClose={() => setShowAddTask(false)}
          onSubmit={handleCreateTask} // ✅ fixed: was handlecreateTask
          projectId={project._id}
          createdBy={project.owner._id}
          members={project.members}
        />
      )}

      <div className="fixed top-0 right-0 h-screen z-50">
        <Outlet /> {/* ✅ removed context prop, no longer needed */}
      </div>

      <InviteMembersModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        projectId={project._id}
        onSubmit={handleInviteMember}
      />

      {showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          className="max-w-md"
          title="Edit project"
        >
          <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
                Project name
              </label>
              <input
                className="border border-[#e8eaed] rounded-lg px-3 py-2 text-sm"
                value={editData.name}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Project name"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
                Description
              </label>
              <textarea
                rows={3}
                className="border border-[#e8eaed] rounded-lg px-3 py-2 text-sm resize-none"
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="What is this project about?"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
                  Status
                </label>
                <select
                  className="border border-[#e8eaed] rounded-lg px-3 py-2 text-sm"
                  value={editData.status}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
                  Due date
                </label>
                <input
                  type="date"
                  className="border border-[#e8eaed] rounded-lg px-3 py-2 text-sm"
                  value={editData.dueDate}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
                Start date
              </label>
              <input
                type="date"
                className="border border-[#e8eaed] rounded-lg px-3 py-2 text-sm"
                value={editData.startDate}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex gap-2.5 justify-end pt-1 border-t border-[#e8eaed]">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-[#e8eaed] text-sm text-[#374151] hover:bg-[#f9fafb]"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg bg-[#4f46e5] text-sm font-medium text-white hover:bg-[#4338ca]"
              >
                Save changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectDetailsPage;
