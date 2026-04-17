const Router = require("express");
const {
  getAllProduccion,
  createProduccion,
  getProduccionById,
  UpdateProduccionById,
  deleteProduccionById,
} = require("../controllers/produccion.controller");

const router = Router();

router.get("/", getAllProduccion);
router.get("/byid", getProduccionById);
router.post("/", createProduccion);
router.put("/", UpdateProduccionById);
router.delete("/", deleteProduccionById);

module.exports = router;
