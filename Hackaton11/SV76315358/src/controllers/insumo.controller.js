const MateriaPrima = require("../models/MateriaPrima");
const Insumo = require("../models/Insumo");

const getAllInsumo = async (req, res, next) => {
  try {
    const data = await Insumo.find().sort({ createdAt: -1 });

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const createInsumo = async (req, res, next) => {
  try {
    const data = new Insumo(req.body);
    await data.save();

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const getInsumoById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await Insumo.findById(id);

    if (!getData) {
      return next(appError(400, "Insumo_NOT_FOUND", "Insumo no encontrada"));
    }

    return res.status(201).json({ status: "ok", data: getData });
  } catch (error) {
    next(error);
  }
};

const UpdateInsumoById = async (req, res, next) => {
  try {
    return res.send("UPDATE INSUMO");
  } catch (error) {
    next(error);
  }
};

const deleteInsumoById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await Insumo.findByIdAndDelete(id);

    return res
      .status(201)
      .json({ status: "ok", msg: "Eliminado Correctamente !" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllInsumo,
  createInsumo,
  getInsumoById,
  UpdateInsumoById,
  deleteInsumoById,
};
