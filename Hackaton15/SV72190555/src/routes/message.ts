import { Router } from "express";
import {
  getMessagesFrom,
  editMessage,
  deleteMessage,
} from "../controllers/message.controller.ts";
import { authMiddleware } from "../middlewares/auth.ts";

const router = Router();

router.get("/from", authMiddleware, getMessagesFrom);
router.put("/:id", authMiddleware, editMessage);
router.delete("/:id", authMiddleware, deleteMessage);

export default router;
