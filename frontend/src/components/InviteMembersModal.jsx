import React, { useState } from "react";
import MainButton from "./MainButton";

function InviteMembersModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onSubmit({ email, role });
    setEmail(""); // Reset form
    setRole("Member");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Invite a new member
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Send an invitation to join your workspace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Role Select Input */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <MainButton type="submit">Submit</MainButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InviteMembersModal;
