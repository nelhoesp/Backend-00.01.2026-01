import { Router } from "express";
import { getMetrics } from "../controllers/metrics.controller.ts";

const router = Router();

router.get("/", getMetrics);

export default router;
