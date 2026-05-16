import { Router } from "express";
import {
  createItem,
  deleteItemOfUserById,
  getAllItems,
  getListOfItemsByUser,
  updateItemOfUserById,
  updateStateItemOfUserById,
} from "../controllers/item.controller.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { verifyAdmin } from "../middlewares/verifyAdmin.ts";

const router = Router();

router.post("/", authMiddleware, createItem);
router.get("/", authMiddleware, getListOfItemsByUser);
router.put("/", authMiddleware, updateItemOfUserById);
router.put("/updateState", authMiddleware, updateStateItemOfUserById);
router.delete("/", authMiddleware, deleteItemOfUserById);

router.get("/getAllItems", authMiddleware, verifyAdmin, getAllItems);
// router.post("/logout", authLogout);

export default router;
