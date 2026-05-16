export interface IMetrics {
  startTime: number;
  totalRequests: number;
  byMethod: Record<string, number>;
  byStatus: Record<number, number>;
  byRoute: Record<string, { count: number; totalMs: number; avgMs: number }>;
  responseTimes: number[];
}
