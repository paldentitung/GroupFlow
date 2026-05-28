import { register, verifyEmail, login } from "../services/authService";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    try {
      const res = await register(data);

      alert(res.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleVerifyEmail = async (token) => {
    try {
      const res = await verifyEmail(token);
      alert(res.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await login(data);

      if (res.success) {
        alert("Login successful");
        navigate("/");
      }
      alert(res.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return { handleRegister, handleVerifyEmail, handleLogin };
};
