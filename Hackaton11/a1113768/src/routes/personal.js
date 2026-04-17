const Router = require("express");
const {
  getAllPersonal,
  createPersonal,
  getPersonalById,
  UpdatePersonalById,
  deletePersonalById,
} = require("../controllers/personal.controller");

const router = Router();

router.get("/", getAllPersonal);
router.get("/byid", getPersonalById);
router.post("/", createPersonal);
router.put("/", UpdatePersonalById);
router.delete("/", deletePersonalById);

module.exports = router;
