import { useState } from "react";
import { updateProfile } from "../services/users.service";
import { toast } from "react-hot-toast";
export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const handleUpdateProfile = async ({ firstName, lastName, bio, phone }) => {
    setLoading(true);
    try {
      const res = await updateProfile({ firstName, lastName, bio, phone });

      if (res.success) {
        toast.success("profile updated");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdateProfile,
  };
};
