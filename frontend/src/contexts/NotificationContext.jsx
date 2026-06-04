import { useState, createContext, useContext, useEffect } from "react";
import {
  getUserNotification,
  markAllReadNotification,
  markAsReadNotification,
} from "../services/notificationsService";
import toast from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleNotification = () => setOpen((prev) => !prev);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getUserNotification();
      console.log("notification data", res);
      if (res.success) {
        setNotifications(res.data);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsReadNotification = async (notificationId) => {
    try {
      const res = await markAsReadNotification(notificationId);

      if (res.success) {
        toast.success("Notification read");

        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n,
          ),
        );
      }
      console.log("update notification", res);
      return;
    } catch (error) {
      toast.error(error.message || "error");
    }
  };
  const handleMarkAllReadNotification = async () => {
    try {
      const res = await markAllReadNotification();

      if (res.success) {
        toast.success("All notifications marked as read");

        setNotifications((prev) =>
          prev.map((n) => ({
            ...n,
            isRead: true,
          })),
        );
      }
    } catch (error) {
      toast.error(error.message || "error");
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        open,
        toggleNotification,
        setOpen,
        notifications,
        handleMarkAsReadNotification,
        handleMarkAllReadNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
