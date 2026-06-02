import { register, verifyEmail, login, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

import { toast } from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = useContext(AuthContext);
  const handleRegister = async (data) => {
    try {
      const res = await register(data);

      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleVerifyEmail = async (token) => {
    try {
      const res = await verifyEmail(token);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
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
  return { handleRegister, handleVerifyEmail, handleLogin, handleLogout, user };
};
