import type { NextFunction, Response, Request } from "express";
import { memoryUsage } from "node:process";
import type { IMetrics } from "../interface/IMetrics.ts";

export const metrics: IMetrics = {
  startTime: Date.now(),
  totalRequests: 0,
  byMethod: {},
  byStatus: {},
  byRoute: {},
  responseTimes: [],
};

export const getMetrics = (req: Request, res: Response, next: NextFunction) => {
  const uptimeMs = Date.now() - metrics.startTime;
  const avgResponse =
    metrics.responseTimes.length > 0
      ? metrics.responseTimes.reduce((a: number, b: number) => a + b, 0) /
        metrics.responseTimes.length
      : 0;

  return res.status(200).json({
    uptime: {
      ms: uptimeMs,
      seconds: Math.floor(uptimeMs / 1000),
      human: formatUpTime(uptimeMs),
    },
    totalRequests: metrics.totalRequests,
    avgResponseTimeMs: Math.round(avgResponse * 100) / 100,
    byMethod: metrics.byMethod,
    byRoute: metrics.byRoute,
    byStatus: metrics.byStatus,
    memoryUsageMB:
      Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100,
  });
};

const formatUpTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
};
