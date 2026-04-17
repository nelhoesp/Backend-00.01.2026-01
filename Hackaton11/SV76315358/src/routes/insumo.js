const Router = require("express");
const {
  getAllInsumo,
  createInsumo,
  getInsumoById,
  UpdateInsumoById,
  deleteInsumoById,
} = require("../controllers/insumo.controller");

const router = Router();

router.get("/", getAllInsumo);
router.get("/byid", getInsumoById);
router.post("/", createInsumo);
router.put("/", UpdateInsumoById);
router.delete("/", deleteInsumoById);

module.exports = router;
