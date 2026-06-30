import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (userId) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
        query: { userId },
        withCredentials: true,
      });
    }

    const socket = socketRef.current;

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    if (socket.connected) setConnected(true);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      // Only fully disconnect when userId actually goes away (e.g. logout),
      // not on every render of whatever component calls this hook.
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [userId]);

  return { socketRef, connected };
};
