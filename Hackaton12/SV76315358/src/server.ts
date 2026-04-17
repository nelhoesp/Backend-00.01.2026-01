import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";
import router from "./routes/index.ts";
import { connectDB } from "./config/database.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();
const PORT = process.env.PORT || 3030;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// ROUTES
app.use("/api/", router);

// MANEJO GLOBAL DE ERRORES
app.use(errorHandler);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Fallo al iniciar el servidor: ", err);
    process.exit(1);
  }
}

start();
