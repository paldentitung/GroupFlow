import { useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import { History, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getInitials } from "../utils/getInitials.js";
import Avatar from "./Avatar.jsx";
import Modal from "./Modal.jsx";
import MainButton from "./MainButton.jsx";
import { useProjects } from "../hooks/useProjects.js";
import { useUserTasks } from "../hooks/useUserTasks.js";
import { useTask } from "../hooks/useTask.js";
import { useProjectTasks } from "../hooks/useProjectTasks.js";
import { useTasksContext } from "../contexts/TasksContext.jsx";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);
  const { isOpen, closeSidebar } = useSidebar();

  const { handleLogout, user } = useAuth();
  const { activeProject, projects } = useProjects();
  const { userTasks } = useUserTasks();
  const { filteredTasks } = useProjectTasks(activeProject?._id);
  const { tasks } = useTasksContext();
  const navItems = [
    {
      section: "Main",
      links: [
        {
          name: "Dashboard",
          icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
          badge: null,
          link: "/",
        },
        {
          name: "Projects",
          icon: "M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z",
          link: "/projects",
        },
        {
          name: "My Tasks",
          icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
          link: "/my-tasks",
        },
        {
          name: "Tasks",
          icon: "M4 6h16M4 10h16M4 14h10",
          link: "/tasks",
        },
        {
          name: "My History",
          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          link: "/history",
        },
      ],
    },
    {
      section: "Organization",
      links: [
        {
          name: "Team",
          icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
          badge: null,
          link: "/team",
        },
        {
          name: "Settings",
          icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
          badge: null,
          link: "/settings",
        },
      ],
    },
  ];
  return (
    <>
      <div
        className={`fixed  top-0 left-0 z-50 flex flex-col h-screen w-64 bg-white border-r border-[#e8eaed]
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-[#e8eaed]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center shrink-0 ">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="md:*:text-[20px] font-semibold tracking-tight text-[#111827]">
              Group Flow
            </span>
          </div>

          <button onClick={closeSidebar} className="text-3xl  md:hidden">
            &times;
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-5 overflow-y-auto">
          {navItems.map(({ section, links }) => (
            <div key={section}>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[#6b7280] px-2 mb-1">
                {section}
              </p>
              <ul className="flex flex-col gap-0.5">
                {links.map(({ name, icon, badge, link }) => {
                  const isActive = active === name;
                  return (
                    <div key={name}>
                      <Link
                        to={link}
                        onClick={() => {
                          setActive(name);
                          closeSidebar();
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-md transition-all duration-150 hover:cursor-pointer ${
                          isActive
                            ? "bg-[#eef2ff] text-[#4f46e5] font-medium"
                            : "text-[#6b7280] hover:bg-[#f7f8fa] hover:text-[#111827]"
                        }`}
                      >
                        <svg
                          className="w-4.5 h-4.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={isActive ? 2.2 : 1.8}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={icon}
                          />
                        </svg>
                        <span className="flex-1 text-left">{name}</span>
                      </Link>
                    </div>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-3 py-3 border-t border-[#e8eaed]">
          <div className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-[#f7f8fa] transition-colors duration-150">
            {/* User Info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar user={user} />

              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {user?.email}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <Modal isOpen={open} onClose={() => setOpen(false)} className="max-w-sm">
        <div className="flex flex-col items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-center">
            <h3 className="text-[15px] font-semibold text-[#111827]">
              Sign out
            </h3>
            <p className="text-sm text-[#6b7280] mt-1">
              Are you sure you want to sign out?
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 px-4 py-2 rounded-lg border border-[#e5e7eb] text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
