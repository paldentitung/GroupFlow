import { useState } from "react";
import {
  changeAvatar,
  removeAvatar,
  updateProfile,
} from "../services/users.service";
import { toast } from "react-hot-toast";
import { useAuth } from "./useAuth";
export const useProfile = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleUpdateProfile = async ({ firstName, lastName, bio, phone }) => {
    setLoading(true);
    try {
      const res = await updateProfile({ firstName, lastName, bio, phone });

      if (res.success) {
        toast.success("profile updated");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAvatar = async (avatar) => {
    setLoading(true);
    try {
      const res = await changeAvatar(avatar);

      if (res.success) {
        toast.success("Avatar changed");

        setUser((prev) => ({
          ...prev,
          avatar: res.data.avatar,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setLoading(true);
    try {
      const res = await removeAvatar();

      if (res.success) {
        toast.success("Avatar changed");

        setUser((prev) => ({
          ...prev,
          avatar: res.data.avatar,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdateProfile,
    handleChangeAvatar,
    handleRemoveAvatar,
  };
};
