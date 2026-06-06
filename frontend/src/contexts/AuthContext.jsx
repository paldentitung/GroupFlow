import { createContext, useState, useEffect } from "react";
import { getMe } from "../services/users.service.js";
import { toast } from "react-hot-toast";
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
      console.error("Error fetching user info:", error);
      toast.error(error.message); // Show error toast on failure
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
