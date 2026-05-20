import type { NextFunction, Request, Response } from "express";
import { metrics } from "../controllers/metrics.controller.ts";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const route = req.route?.path || req.originalUrl.split("?")[0];
    const key = `${req.method} ${route}`;

    metrics.totalRequests = (metrics.totalRequests || 0) + 1;

    metrics.byMethod = metrics.byMethod || {};
    metrics.byMethod[req.method] = (metrics.byMethod[req.method] || 0) + 1;

    metrics.byStatus = metrics.byStatus || {};
    metrics.byStatus[res.statusCode] =
      (metrics.byStatus[res.statusCode] || 0) + 1;

    metrics.byRoute = metrics.byRoute || {};
    if (!metrics.byRoute[key]) {
      metrics.byRoute[key] = { count: 0, totalMs: 0, avgMs: 0 };
    }
    metrics.byRoute[key].count += 1;
    metrics.byRoute[key].totalMs += duration;
    metrics.byRoute[key].avgMs =
      metrics.byRoute[key].totalMs / metrics.byRoute[key].count;

    metrics.responseTimes = metrics.responseTimes || [];
    metrics.responseTimes.push(duration);
    if (metrics.responseTimes.length > 100) {
      metrics.responseTimes.shift();
    }
  });

  next();
};

export default metricsMiddleware;
