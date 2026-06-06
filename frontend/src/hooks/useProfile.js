import { useState } from "react";
import {
  changeAvatar,
  changePassword,
  removeAvatar,
  updateProfile,
} from "../services/users.service";
import { toast } from "react-hot-toast";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
export const useProfile = () => {
  const { setUser, handleLogout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUpdateProfile = async ({ firstName, lastName, bio, phone }) => {
    setLoading(true);
    try {
      const res = await updateProfile({ firstName, lastName, bio, phone });

      if (res.success) {
        toast.success("profile updated");
        setUser((prev) => ({
          ...prev,
          ...res.data,
        }));
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

  const handleChangePassword = async ({ newPassword, password }) => {
    setLoading(true);
    try {
      const res = await changePassword({ newPassword, password });

      if (res.success) {
        toast.success("Password changed successfully. Please login again.");
        handleLogout();
        navigate("/login");
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
    handleChangePassword,
  };
};
