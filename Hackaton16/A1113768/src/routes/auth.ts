import { Router } from "express";
import passport from "../config/passport.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import {
  authLogin,
  authLogout,
  createAccount,
  aboutMe,
  googleCallback,
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/login", authLogin);
router.post("/register", createAccount);
router.post("/logout", authMiddleware, authLogout);
router.get("/me", authMiddleware, aboutMe);

// OAuth Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/google/failed", session: false }),
  googleCallback,
);

router.get("/google/failed", (_req, res) => {
  res.status(401).json({ status: "error", message: "OAuth Google fallido" });
});

export default router;
