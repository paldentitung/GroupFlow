import React, { useState } from "react";
import MainButton from "./MainButton";
import { X } from "lucide-react";

function InviteMembersModal({ isOpen, onClose, onSubmit, loading }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await onSubmit({ email, role });
    setEmail("");
    setRole("Member");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 border border-[#e8eaed] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[15px] font-medium text-[#111827]">
              Invite a member
            </h3>
            <p className="text-[13px] text-[#6b7280] mt-0.5">
              They'll receive an email invitation to join.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] text-[#9ca3af] hover:text-[#111827] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#e8eaed] px-3 py-2 text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-[#e8eaed] px-3 py-2 text-sm text-[#111827] focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5] bg-white"
            >
              <option value="Member">Member</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Developer">Developer</option>
              <option value="UI/UX">UI/UX</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-[#f0f1f3]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#e8eaed] text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <MainButton type="submit" disabled={loading}>
              {loading ? "Inviting..." : "Invite"}
            </MainButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InviteMembersModal;
