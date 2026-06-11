import React, { act } from "react";
import Header from "../components/Header";

import teamMembers from "../data/team";
import { useProjects } from "../hooks/useProjects";
import { useEffect } from "react";
import { useState } from "react";
import { getMembers } from "../services/membersService";
import { toast } from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useMembers } from "../hooks/useMembers";
const TeamPage = () => {
  const { activeProject } = useProjects();
  const { members } = useMembers(activeProject?._id);

  return (
    <div className="min-h-screen">
      <Header title="Team" showButton={false} />
      <div className="p-6">
        {!activeProject ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#eef2ff] flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-[#4f46e5]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[#111827]">
              No project selected
            </p>
            <p className="text-sm text-[#6b7280] mt-1">
              Select a project to see its team members
            </p>
          </div>
        ) : members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#f3f4f6] flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-[#9ca3af]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[#111827]">
              No members yet
            </p>
            <p className="text-sm text-[#6b7280] mt-1">
              Invite people to collaborate on this project
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-5">
                  <Avatar user={member} size={50} />
                  <div className="flex-1">
                    <h2 className="text-[16px] font-semibold text-[#111827]">
                      {member.name}
                    </h2>
                    <p className="text-sm text-[#6b7280]">{member.role}</p>
                    <span
                      className={`inline-block mt-2 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        member.position === "Owner"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-[#eef2ff] text-[#4f46e5]"
                      }`}
                    >
                      {member.position}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["Projects", member.projects],
                    ["Tasks", member.tasks],
                    ["Done", member.completed],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      className="bg-[#f9fafb] rounded-xl p-3 text-center"
                    >
                      <p className="text-lg font-bold text-[#111827]">{val}</p>
                      <p className="text-xs text-[#6b7280] mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
