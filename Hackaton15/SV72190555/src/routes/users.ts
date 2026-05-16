import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.ts";
import { getAllUsers } from "../controllers/user.cotnroller.ts";

const router = Router();

router.get("/", authMiddleware, getAllUsers);

export default router;
