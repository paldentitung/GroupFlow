import { useState } from "react";
import { getComments } from "../services/comments.service";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const useComments = (taskId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await getComments(taskId);
      if (res.success) {
        toast.success("comment fetched");

        setComments(res.data);
      }
    } catch (error) {
      toast.error(error.message || "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!taskId) return;
    fetchComments();
  }, [taskId]);

  return {
    comments,
    loading,
  };
};
