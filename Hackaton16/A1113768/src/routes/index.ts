import { Router } from "express";
import authRouter from "./auth.ts";
import productsRouter from "./products.ts";
import paymentsRouter from "./payments.ts";
import metricsRouter from "./metrics.ts";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/payments", paymentsRouter);
router.use("/metrics", metricsRouter);

export default router;