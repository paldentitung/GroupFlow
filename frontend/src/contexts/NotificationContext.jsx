import { useState, createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  getUserNotification,
  markAllReadNotification,
  markAsReadNotification,
} from "../services/notificationsService";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";
import { playNotificationSound } from "../utils/playNotificationSound";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;
    if (!user?._id) return;
    if (socketRef.current?.connected) return;
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      query: { userId: user._id },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      getUserNotification().then((res) => {
        if (res.success) setNotifications(res.data);
      });
    });

    socket.on("new_notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      playNotificationSound();
      toast.success(notification.message || "New notification");
    });

    return () => {
      socket.off("connect");
      socket.off("new_notification");
      socket.disconnect();
    };
  }, [user?._id, loading]);

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
    } catch (error) {
      toast.error(error.message || "error");
    }
  };

  const handleMarkAllReadNotification = async () => {
    try {
      const res = await markAllReadNotification();
      if (res.success) {
        toast.success("All notifications marked as read");
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      }
    } catch (error) {
      toast.error(error.message || "error");
    }
  };
  const toggleNotification = () => setOpen((prev) => !prev);
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
