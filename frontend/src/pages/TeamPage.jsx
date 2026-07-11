import React, { useState } from "react";
import Header from "../components/Header";
import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../hooks/useAuth.js";
import Avatar from "../components/Avatar";
import { useMembers } from "../hooks/useMembers";
import { Mail, Phone, Users, MoreVertical, UserMinus } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal.jsx";

const TeamPage = () => {
  const { activeProject } = useProjects();
  const { members, handleRemoveMember } = useMembers(activeProject?._id);
  const { user: currentUser } = useAuth();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removing, setRemoving] = useState(false);

  const currentMembership = members?.find((m) => m.userId === currentUser?._id);
  const isOwner = currentMembership?.position === "Owner";

  const ownerCount = members?.filter((m) => m.position === "Owner").length ?? 0;
  const memberCount = (members?.length ?? 0) - ownerCount;

  const confirmRemove = async () => {
    if (!removeTarget) return;
    setRemoving(true);
    try {
      await handleRemoveMember(removeTarget.id);
      setRemoveTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Header title="Team" showButton={false} />

      <div className="p-6">
        {!activeProject ? (
          <EmptyState
            title="No project selected"
            subtitle="Select a project to see its team members"
            tone="indigo"
          />
        ) : members.length === 0 ? (
          <EmptyState
            title="No members yet"
            subtitle="Invite people to collaborate on this project"
            tone="gray"
          />
        ) : (
          <>
            {/* Summary strip */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-xl px-4 py-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#eef2ff] flex items-center justify-center">
                  <Users size={16} className="text-[#4f46e5]" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#111827] leading-none">
                    {members.length}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {members.length === 1 ? "member" : "members"}
                  </p>
                </div>
              </div>

              {ownerCount > 0 && (
                <div className="bg-white border border-[#e5e7eb] rounded-xl px-4 py-2.5">
                  <p className="text-[15px] font-semibold text-[#111827] leading-none">
                    {ownerCount}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {ownerCount === 1 ? "owner" : "owners"}
                  </p>
                </div>
              )}

              {memberCount > 0 && (
                <div className="bg-white border border-[#e5e7eb] rounded-xl px-4 py-2.5">
                  <p className="text-[15px] font-semibold text-[#111827] leading-none">
                    {memberCount}
                  </p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">
                    {memberCount === 1 ? "collaborator" : "collaborators"}
                  </p>
                </div>
              )}
            </div>

            {/* Member grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {members.map((member) => {
                const role = member.position;
                const canRemove = isOwner && role !== "Owner";
                console.log(
                  member.name,
                  "role:",
                  role,
                  "canRemove:",
                  canRemove,
                );
                return (
                  <div
                    key={member.id}
                    className="group relative bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#d1d5db] transition-all duration-200"
                  >
                    {role === "Owner" && (
                      <div className="absolute top-0 left-5 right-5 h-[3px] bg-gradient-to-r from-orange-400 to-amber-400 rounded-b-full" />
                    )}

                    {canRemove && (
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === member.id ? null : member.id,
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9ca3af] hover:bg-[#f7f8fa] hover:text-[#111827] transition-all"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openMenuId === member.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 top-9 z-20 w-40 bg-white border border-[#e8eaed] rounded-lg shadow-lg py-1">
                              <button
                                onClick={() => {
                                  setRemoveTarget(member);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <UserMinus size={14} />
                                Remove member
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <Avatar user={member} size={52} />
                      <div className="flex-1 min-w-0">
                        <h2 className="text-[15px] font-semibold text-[#111827] truncate">
                          {member.name}
                        </h2>
                        <p className="text-[13px] text-[#6b7280] truncate">
                          {member.position || "Team member"}
                        </p>
                        <span
                          className={`inline-block mt-2 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                            role === "Owner"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-[#eef2ff] text-[#4f46e5]"
                          }`}
                        >
                          {role}
                        </span>
                      </div>
                    </div>

                    {member.bio && (
                      <p className="mt-4 text-[13px] text-[#6b7280] leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>
                    )}

                    {(member.email || member.phone) && (
                      <div className="mt-4 pt-4 border-t border-[#f0f1f3] flex flex-col gap-1.5">
                        {member.email && (
                          <div className="flex items-center gap-2 text-[12.5px] text-[#6b7280] truncate">
                            <Mail
                              size={13}
                              className="flex-shrink-0 text-[#9ca3af]"
                            />
                            <span className="truncate">{member.email}</span>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-2 text-[12.5px] text-[#6b7280]">
                            <Phone
                              size={13}
                              className="flex-shrink-0 text-[#9ca3af]"
                            />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={!!removeTarget}
        onClose={() => setRemoveTarget(null)}
        onConfirm={confirmRemove}
        loading={removing}
        title="Remove Member"
        message={`Are you sure you want to remove ${
          removeTarget?.firstName || removeTarget?.name || "this member"
        } from the project? They will lose access immediately.`}
        confirmText="Remove"
        danger
      />
    </div>
  );
};

function EmptyState({ title, subtitle, tone }) {
  const bg = tone === "indigo" ? "bg-[#eef2ff]" : "bg-[#f3f4f6]";
  const icon = tone === "indigo" ? "text-[#4f46e5]" : "text-[#9ca3af]";

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-4`}
      >
        <Users size={26} className={icon} strokeWidth={1.8} />
      </div>
      <p className="text-[15px] font-medium text-[#111827]">{title}</p>
      <p className="text-sm text-[#6b7280] mt-1">{subtitle}</p>
    </div>
  );
}

export default TeamPage;
