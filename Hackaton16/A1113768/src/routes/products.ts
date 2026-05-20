import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.ts";
import { verifyAdmin } from "../middlewares/verifyAdmin.ts";
import {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.ts";

const router = Router();

router.get("/", findAllProducts);
router.get("/:id", findProductById);
router.post("/", authMiddleware, verifyAdmin, createProduct);
router.put("/:id", authMiddleware, verifyAdmin, updateProduct);
router.delete("/:id", authMiddleware, verifyAdmin, deleteProduct);

export default router;
