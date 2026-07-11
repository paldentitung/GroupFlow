import { useState, useEffect } from "react";
import {
  inviteMember,
  getMembers,
  removeMember,
} from "../services/membersService.js";
import { toast } from "react-hot-toast";

export const useMembers = (projectId) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInviteMember = async (member) => {
    try {
      setLoading(true);
      const response = await inviteMember(projectId, member.email, member.role);
      if (response.success) {
        toast.success("Member invited successfully!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await removeMember(projectId, memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      if (response?.success !== false) {
        toast.success("Member removed");
      }
      return response;
    } catch (err) {
      toast.error(err.message || "Failed to remove member");
      throw err;
    }
  };

  useEffect(() => {
    if (!projectId) return;
    const fetchedMembers = async () => {
      try {
        const res = await getMembers(projectId);
        if (res.success) {
          const mapped = res.members.map((m) => ({
            id: m._id,
            userId: m.user._id,
            name: `${m.user.firstName} ${m.user.lastName}`,
            firstName: m.user.firstName,
            lastName: m.user.lastName,
            position: m.role,
            avatar: m.user.avatar,
            bio: m.user.bio,
            phone: m.user.phone,
            email: m.user.email,
            projects: 0,
            tasks: 0,
            completed: 0,
            color: "bg-indigo-100 text-indigo-600",
          }));
          setMembers(mapped);
        }
      } catch (error) {
        if (error.message === "Project not found") return;
        toast.error("Failed to fetch members");
      }
    };

    fetchedMembers();
  }, [projectId]);

  return { members, loading, error, handleInviteMember, handleRemoveMember };
};
