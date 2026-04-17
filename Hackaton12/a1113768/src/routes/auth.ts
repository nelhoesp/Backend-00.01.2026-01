import { Router } from "express";
import {
  authLogin,
  authLogout,
  createAccount,
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/login", authLogin);
router.post("/sign-in", createAccount);
router.post("/logout", authLogout);

export default router;
