import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Conectado:", socket.id);

  
  socket.emit("setUser", "6a0827a24f4e8d98acaf4a35");

  setTimeout(() => {
    
    socket.emit("sendMessage", "69dd7837df3bf5f22b8a4df4", "Hola desde el script!");
  }, 1000);
});

socket.on("message", (msg) => {
  console.log("📨 Mensaje recibido:", msg);
});

socket.on("userJoined", (id) => {
  console.log("🟢 Usuario conectado:", id);
});