// hooks/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

let socket;

export const useSocket = (userId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    socket = io(import.meta.env.VITE_SOCKET_URL, {
      query: { userId },
      withCredentials: true,
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef;
};
