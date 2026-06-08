import { useState, useEffect } from "react";
import { inviteMember, getMembers } from "../services/membersService.js";
import { toast } from "react-hot-toast";
import { useProjects } from "./useProjects.js";
export const useMembers = (projectId) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeProject } = useProjects();

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
  return { members, loading, error, handleInviteMember, members };
};
