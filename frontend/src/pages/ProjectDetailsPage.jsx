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

const COLOR_POOL = [
  "bg-[#4f46e5]",
  "bg-[#f59e0b]",
  "bg-[#ef4444]",
  "bg-[#8b5cf6]",
  "bg-[#3b82f6]",
  "bg-[#10b981]",
  "bg-[#ec4899]",
  "bg-[#f97316]",
];

const STATUS_STYLES = {
  Active: "text-[#059669] bg-[#d1fae5]",
  Completed: "text-[#4f46e5] bg-[#eef2ff]",
  "On Hold": "text-[#d97706] bg-[#fef3c7]",
};

function getAvatarColor(initials = "") {
  return COLOR_POOL[initials.charCodeAt(0) % COLOR_POOL.length];
}

function Avatar({ initials = "?", size = "w-7 h-7 text-xs" }) {
  return (
    <div
      className={`${getAvatarColor(initials)} ${size} rounded-full flex items-center justify-center text-white font-medium flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

function TaskCard({
  title,
  subtitle,
  assignee,
  date,
  done = false,
  projectId,
  taskId,
}) {
  return (
    <Link
      to={`/projects/${projectId}/task/${taskId}`}
      className="bg-white border border-[#e8eaed] rounded-xl p-4 mb-2.5 block"
    >
      <p
        className={`text-sm font-medium mb-0.5 ${done ? "line-through text-gray-400" : "text-[#111827]"}`}
      >
        {title}
      </p>
      <p className="text-xs text-[#6b7280] mb-3">{subtitle}</p>
      <div className="flex items-center justify-between">
        <Avatar initials={assignee} size="w-6 h-6 text-[10px]" />
        <span className="text-xs text-[#6b7280]">{date}</span>
      </div>
    </Link>
  );
}

const TABS = ["Task Board", "Members", "Overview"];

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [activeTab, setActiveTab] = useState("Task Board");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const { tasks, handleCreateTask, fetchTasks } = useTasksContext(); // ✅ from context
  const { handleInviteMember } = useMembers(id);

  const project = projects.find((p) => p._id === id);

  useEffect(() => {
    if (id) fetchTasks(id); // ✅ moved above early return
  }, [id]);

  if (!project) return <div className="p-6">Project not found</div>;

  return (
    <>
      <div
        className="min-h-screen p-6"
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
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-[22px] font-medium text-[#111827]">
                {project.name}
              </h1>
              <span
                className={`flex items-center gap-1.5 text-xs rounded-full px-3 py-1 ${STATUS_STYLES[project.status] || "text-[#6b7280] bg-[#f3f4f6]"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                {project.status}
              </span>
            </div>
            <p className="text-sm text-[#6b7280]">
              {project.description || "No description provided."}
            </p>
          </div>
          <div className="flex gap-2.5">
            <button className="flex items-center gap-1.5 bg-white border border-[#e8eaed] rounded-lg px-4 py-2 text-sm text-[#111827]">
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
          <div className="flex items-center gap-8 pb-4 border-b border-[#f0f1f3]">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Start
              </span>
              <span className="text-[13px] font-medium text-[#111827]">
                {formatDate(project.startDate) || "Not set"}
              </span>
            </div>
            <div className="w-px h-9 bg-[#f0f1f3]" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Due
              </span>
              <span className="text-[13px] font-medium text-[#111827]">
                {formatDate(project.dueDate) || "Not set"}
              </span>
            </div>
            <div className="w-px h-9 bg-[#f0f1f3]" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Owner
              </span>
              <div className="flex items-center gap-1.5">
                <Avatar
                  initials={getInitials(
                    project?.owner?.firstName,
                    project?.owner?.lastName,
                  )}
                  size="w-6 h-6 text-[10px]"
                />
                <span className="text-[13px] font-medium text-[#111827]">
                  {project?.owner?.firstName}{" "}
                  {project?.owner?.lastName || "Not set"}
                </span>
              </div>
            </div>
            <div className="w-px h-9 bg-[#f0f1f3]" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium tracking-wide uppercase text-[#9ca3af]">
                Members
              </span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {project?.members?.map((member, i) => (
                    <div
                      key={member._id}
                      style={{ marginLeft: i === 0 ? 0 : -6 }}
                    >
                      <Avatar
                        initials={getInitials(
                          member.user?.firstName,
                          member.user?.lastName,
                        )}
                        size="w-6 h-6 text-[10px]"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-[12px] text-[#9ca3af]">
                  {project.members?.length} members
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
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
        {activeTab === "Task Board" && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Todo", color: "bg-[#6b7280]", status: "todo" },
              {
                label: "In Progress",
                color: "bg-[#4f46e5]",
                status: "in-progress",
              },
              { label: "Completed", color: "bg-[#059669]", status: "done" },
            ].map(({ label, color, status }) => {
              const colTasks = tasks?.filter((t) => t.status === status) ?? [];
              return (
                <div key={label}>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#111827] mb-3">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    {label}
                    <span className="font-normal text-[#6b7280]">
                      {colTasks.length}
                    </span>
                  </div>
                  {colTasks.map((t) => (
                    <TaskCard
                      key={t._id}
                      taskId={t._id}
                      projectId={project._id}
                      title={t.title}
                      subtitle={t.description}
                      assignee={getInitials(
                        t.assigneeId?.firstName || t.createdBy?.firstName,
                        t.assigneeId?.lastName || t.createdBy?.lastName,
                      )}
                      date={formatDate(t.dueDate)}
                      done={t.status === "done"}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "Members" && (
          <div className="bg-white border border-[#e8eaed] rounded-[14px] p-6">
            <div className="flex items-center justify-between mb-5">
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
                className="flex items-center gap-1.5 bg-[#4f46e5] border-none rounded-lg px-4 py-2 text-sm text-white hover:bg-[#4338ca] transition-colors"
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
                      <Avatar
                        initials={getInitials(
                          member.user?.firstName,
                          member.user?.lastName,
                        )}
                        size="w-9 h-9 text-xs"
                      />
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

        {activeTab === "Overview" && (
          <div className="text-sm text-[#6b7280]">
            Overview tab coming soon.
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
    </>
  );
};

export default ProjectDetailsPage;
