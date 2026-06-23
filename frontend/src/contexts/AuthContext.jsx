import { createContext, useState, useEffect } from "react";
import { getMe } from "../services/users.service.js";
import { toast } from "react-hot-toast";
import { User } from "lucide-react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const response = await getMe();

      if (response.success) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);
  return (
    <AuthContext.Provider
      value={{ user, fetchUser, setUser, loading, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
