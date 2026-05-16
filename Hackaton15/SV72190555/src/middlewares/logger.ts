import type { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  const { method, originalUrl } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;

    const { statusCode } = res;

    const statusColor =
      statusCode >= 500
        ? "\x1b[31m"
        : statusCode >= 400
          ? "\x1b[33m"
          : statusCode >= 300
            ? "\x1b[36m"
            : "\x1b[32m";

    const reset = "\x1b[0m";

    console.log(
      `${statusColor}[${new Date().toISOString()}] ${method} ${originalUrl} → ${statusCode} (${duration}ms)${reset}`,
    );
  });

  next();
};

export default logger;
