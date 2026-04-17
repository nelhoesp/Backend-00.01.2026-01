const Router = require("express");
const {
  authLogin,
  authLogout,
  updatePassword,
  createAccount,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/login", authLogin);
router.post("/sign-in", createAccount)
// router.post("/updatePass",authMiddleware, updatePassword);
router.post("/logout", authLogout);

module.exports = router;
