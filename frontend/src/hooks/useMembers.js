import { useState } from "react";
import { inviteMember } from "../services/membersService.js";
import { toast } from "react-hot-toast";
export const useMembers = (projectId) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInviteMember = async (member) => {
    try {
      setLoading(true);
      const response = await inviteMember(projectId, member.email, member.role);
      console.log("Invite member response:", response);
      if (response.success) {
        toast.success("Member invited successfully!");
      }
    } catch (err) {
      console.error("Failed to invite member:", err);
      setError("Failed to invite member. Please try again.");
      toast.error("Failed to invite member.");
    } finally {
      setLoading(false);
    }
  };

  return { members, loading, error, handleInviteMember };
};
