import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.ts";
import { verifyAdmin } from "../middlewares/verifyAdmin.ts";
import {
  createPaymentIntent,
  confirmPayment,
  getMyPayments,
  getAllPayments,
  requestRefund,
  getMyRefunds,
} from "../controllers/payment.controller.ts";

const router = Router();

router.post("/intent", authMiddleware, createPaymentIntent);
router.post("/confirm", authMiddleware, confirmPayment);
router.get("/my", authMiddleware, getMyPayments);
router.get("/all", authMiddleware, verifyAdmin, getAllPayments);
router.post("/refund", authMiddleware, requestRefund);
router.get("/refunds", authMiddleware, getMyRefunds);

export default router;
