import { createContext, useState, useEffect } from "react";
import { getMe } from "../services/users.service.js";
import { toast } from "react-hot-toast";
import { User } from "lucide-react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await getMe();
      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, fetchUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
