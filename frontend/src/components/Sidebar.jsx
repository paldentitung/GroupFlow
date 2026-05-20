import { useState } from "react";

const navItems = [
  {
    section: "Main",
    links: [
      {
        name: "Dashboard",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        badge: null,
      },
      {
        name: "Projects",
        icon: "M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z",
        badge: 4,
      },
      {
        name: "Tasks",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
        badge: 12,
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
      },
      {
        name: "Settings",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
        badge: null,
      },
    ],
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div
      className="w-full flex flex-col h-screen bg-[#ffffff] border-r border-[#e8eaed]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#e8eaed]">
        <div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center shrink-0">
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
        <span className="text-[15px] font-semibold tracking-tight text-[#111827]">
          Group Flow
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-5 overflow-y-auto">
        {navItems.map(({ section, links }) => (
          <div key={section}>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[#6b7280] px-2 mb-1">
              {section}
            </p>
            <ul className="flex flex-col gap-0.5">
              {links.map(({ name, icon, badge }) => {
                const isActive = active === name;
                return (
                  <li key={name}>
                    <button
                      onClick={() => setActive(name)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 hover:cursor-pointer ${
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
                      {badge && (
                        <span className="ml-auto text-[11px] font-semibold bg-[#4f46e5] text-white rounded-full px-2 py-0.5 leading-none">
                          {badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-3 border-t border-[#e8eaed]">
        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#f7f8fa] transition-colors duration-150">
          <div className="w-8 h-8 rounded-full bg-[#eef2ff] flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-[#4f46e5]">JD</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[13px] font-medium text-[#111827] truncate">
              Jane Doe
            </p>
            <p className="text-[11px] text-[#6b7280]">Admin</p>
          </div>
          <svg
            className="w-4 h-4 text-[#6b7280] shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
