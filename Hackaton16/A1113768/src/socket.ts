import { Server as SocketIOServer } from "socket.io";
import type { Server as HttpServer } from "http";
import User from "./models/User.ts";

export let io: SocketIOServer;

export function initSocket(httpServer: HttpServer) {
  io = new SocketIOServer(httpServer, {
    cors: { origin: process.env.CORS_ORIGIN || "*" },
  });

  io.on("connection", (socket) => {
    console.log(`New socket connected: ${socket.id}`);

    socket.on("setUser", async (user: string) => {
      socket.data.userId = user;
      await User.findByIdAndUpdate(user, { isOnline: true });
      io.emit("userJoined", user);
    });

    socket.on("payment:join", (paymentId: string) => {
      socket.join(`payment:${paymentId}`);
    });

    socket.on("disconnect", async () => {
      const userId = socket.data.userId;
      if (!userId) return;
      await User.findByIdAndUpdate(userId, { isOnline: false });
      io.emit("userLeft", userId);
    });
  });
}