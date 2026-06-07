import React from "react";
import Header from "../components/Header";

import teamMembers from "../data/team";
import { useProjects } from "../hooks/useProjects";
import { useEffect } from "react";
import { useState } from "react";
import { getMembers } from "../services/membersService";
import { toast } from "react-hot-toast";
import Avatar from "../components/Avatar";
const TeamPage = () => {
  const { activeProject } = useProjects();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchedMembers = async () => {
      const res = await getMembers(activeProject?._id);
      console.log("members fetched", res);
      if (res.success) {
        const mapped = res.members.map((m) => ({
          id: m._id,
          name: `${m.user.firstName} ${m.user.lastName}`,
          role: m.user.bio || "No bio",
          position: m.role,
          avatar: m.user.avatar,
          projects: 0,
          tasks: 0,
          completed: 0,
          color: "bg-indigo-100 text-indigo-600",
        }));
        setMembers(mapped);
      }
    };

    fetchedMembers();
  }, [activeProject._id]);
  return (
    <div className="min-h-screen ">
      <Header title="Team" showButton={false} />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {members.map((member) => {
            const initials = member.name
              .split(" ")
              .map((word) => word[0])
              .join("");

            return (
              <div
                key={member.id}
                className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Top */}
                <div className="flex items-center gap-4 mb-5">
                  <Avatar user={member} size={50} />

                  {/* Info */}
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

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#f9fafb] rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-[#111827]">
                      {member.projects}
                    </p>

                    <p className="text-xs text-[#6b7280] mt-1">Projects</p>
                  </div>

                  <div className="bg-[#f9fafb] rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-[#111827]">
                      {member.tasks}
                    </p>

                    <p className="text-xs text-[#6b7280] mt-1">Tasks</p>
                  </div>

                  <div className="bg-[#f9fafb] rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-[#111827]">
                      {member.completed}
                    </p>

                    <p className="text-xs text-[#6b7280] mt-1">Done</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
