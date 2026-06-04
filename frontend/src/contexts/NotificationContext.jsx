import { useState, createContext, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleNotification = () => setOpen((prev) => !prev);

  return (
    <NotificationContext.Provider value={{ open, toggleNotification, setOpen }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
