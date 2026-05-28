import { register, verifyEmail } from "../services/authService";

export const useAuth = () => {
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

  return { handleRegister, handleVerifyEmail };
};
