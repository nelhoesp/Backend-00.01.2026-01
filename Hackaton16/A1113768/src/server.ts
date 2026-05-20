import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/database.ts";
import { httpServer } from "./app.ts";
import { initSocket } from "./socket.ts";
import { testConnection } from "./config/database_my.ts";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await testConnection();
    await connectDB();

    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`\n==================================================`);
      console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
      console.log(`Documents:      http://localhost:${PORT}/api/docs`);
      console.log(`Metrics:        http://localhost:${PORT}/api/metrics`);
      console.log(`====================================================\n`);
    });
  } catch (err) {
    console.log("Fallo al iniciar el servidor: ", err);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason: any) => {
  console.log("Unhandled Rejection");
});

process.on("uncaughtException", (reason: any) => {
  console.log("Uncaught Exception: ", reason);
  process.exit(1);
});

start();
