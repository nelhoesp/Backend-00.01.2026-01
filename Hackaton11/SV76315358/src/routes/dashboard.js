const Router = require("express");
const { getStats } = require("../controllers/dashboard.controller");

const router = Router();

router.get("/stats", getStats);

module.exports = router;
