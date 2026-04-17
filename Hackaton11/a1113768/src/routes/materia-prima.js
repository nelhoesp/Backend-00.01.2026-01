const Router = require("express");
const {
  getAllMateriaPrima,
  createMateriaPrima,
  getMateriaPrimaById,
  UpdateMateriaPrimaById,
  deleteMateriaPrimaById,
} = require("../controllers/materiaPrima.controller");

const router = Router();

router.get("/", getAllMateriaPrima);
router.get("/byid", getMateriaPrimaById);
router.post("/", createMateriaPrima);
router.put("/", UpdateMateriaPrimaById);
router.delete("/", deleteMateriaPrimaById);

module.exports = router;
