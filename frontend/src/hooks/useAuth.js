import { register } from "../services/authService";

export const useAuth = () => {
  const handleRegister = async (data) => {
    try {
      const res = await register(data);
      alert(res.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return { handleRegister };
};
