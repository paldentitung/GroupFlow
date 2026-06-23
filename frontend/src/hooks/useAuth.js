import {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

import { toast } from "react-hot-toast";
import { useProjects } from "./useProjects.js";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setActiveProject } = useProjects();
  const [loading, setLoading] = useState(false);
  const { user, fetchUser, setUser } = useContext(AuthContext);
  const handleRegister = async (data) => {
    try {
      const res = await register(data);

      if (res.success) {
        toast.success(res.message);
        navigate("/verify-email");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleVerifyEmail = async (token) => {
    setLoading(true);
    try {
      const res = await verifyEmail(token);
      if (res.success) {
        toast.success(res.message);
      }
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await login(data);

      if (res.success) {
        await fetchUser();
        toast.success(res.message || "Login successful");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.success) {
        fetchUser();
        toast.success("Logout successful");

        navigate("/login");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      const res = await forgotPassword(email);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetPassword = async (token, newPassword) => {
    try {
      const res = await resetPassword(token, newPassword);

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return {
    handleRegister,
    handleVerifyEmail,
    handleLogin,
    handleLogout,
    user,
    setUser,
    loading,
    handleForgotPassword,
    handleResetPassword,
    fetchUser,
  };
};
