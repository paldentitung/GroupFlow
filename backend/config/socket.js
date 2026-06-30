import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ client connected:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
      onlineUsers.set(userId, socket.id);
      socket.join(`user:${userId}`); // optional but useful for direct notifications too
    }

    socket.on("joinTaskRoom", (taskId) => {
      socket.join(`task:${taskId}`);
      console.log(`Socket ${socket.id} joined task:${taskId}`);
    });

    socket.on("leaveTaskRoom", (taskId) => {
      socket.leave(`task:${taskId}`);
      console.log(`Socket ${socket.id} left task:${taskId}`);
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

export const getSocketId = (userId) => onlineUsers.get(userId);
