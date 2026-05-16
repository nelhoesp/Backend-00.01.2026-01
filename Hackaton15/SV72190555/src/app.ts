import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";
import router from "./routes/index.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { logger } from "./middlewares/logger.ts";
import { metricsMiddleware } from "./middlewares/metrics.ts";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.ts";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
// import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// SCOKET SERVER
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
// app.use(morgan("dev"));

// Rate limit
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests",
    message: "Por favor intenta de nuevo más tarde",
  },
});

app.use("/api", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// MIDDLEWARES
app.use(logger);
app.use(metricsMiddleware);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// SWAGGER
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Hackatón 13 Express Pro API",
    customCss: ".swagger-ui .topbar { background-color: #2c3e50; }",
  }),
);

// ROUTES
app.use("/api/", router);

// STREAM
// app.use("/api/stream", streamRoutes);
// // MANEJO GLOBAL DE ERRORES
app.use(errorHandler);

export const httpServer = createServer(app);
export default app;
