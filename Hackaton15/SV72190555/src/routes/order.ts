import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.ts";
import { assignCourier, createOrder } from "../controllers/order.controller.ts";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.post("/assign", authMiddleware, assignCourier);

export default router;
