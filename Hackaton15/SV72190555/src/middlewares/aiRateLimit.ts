import rateLimit from "express-rate-limit";

export const aiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máx 10 peticiones por minuto
  message: "Demasiadas solicitudes de mejora de texto, espera un momento",
});
