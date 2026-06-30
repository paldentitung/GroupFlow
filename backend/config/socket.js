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
    const userId = socket.handshake.query.userId;

    if (userId) {
      onlineUsers.set(userId, socket.id);
    }

    socket.on("joinTaskRoom", (taskId) => {
      socket.join(`task:${taskId}`);
    });

    socket.on("leaveTaskRoom", (taskId) => {
      socket.leave(`task:${taskId}`);
    });

    socket.on("joinProjectRoom", (projectId) => {
      socket.join(`project:${projectId}`);
      console.log(`[socket] ${socket.id} joined project:${projectId}`);
    });

    socket.on("leaveProjectRoom", (projectId) => {
      socket.leave(`project:${projectId}`);
      console.log(`[socket] ${socket.id} left project:${projectId}`);
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
