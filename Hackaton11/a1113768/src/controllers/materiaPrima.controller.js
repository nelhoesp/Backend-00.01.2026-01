const MateriaPrima = require("../models/MateriaPrima");

const getAllMateriaPrima = async (req, res, next) => {
  try {
    const data = await MateriaPrima.find().sort({ createdAt: -1 });

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const createMateriaPrima = async (req, res, next) => {
  try {
    const data = new MateriaPrima(req.body);
    await data.save();

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const getMateriaPrimaById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await MateriaPrima.findById(id);

    if (!getData) {
      return next(appError(400, "MateriaPrima_NOT_FOUND", "MateriaPrima no encontrada"));
    }

    return res.status(201).json({ status: "ok", data: getData });
  } catch (error) {
    next(error);
  }
};

const UpdateMateriaPrimaById = async (req, res, next) => {
  try {
    return res.send("UPDATE MateriaPrima");
  } catch (error) {
    next(error);
  }
};

const deleteMateriaPrimaById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await MateriaPrima.findByIdAndDelete(id);

    return res
      .status(201)
      .json({ status: "ok", msg: "Eliminado Correctamente !" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllMateriaPrima,
  createMateriaPrima,
  getMateriaPrimaById,
  UpdateMateriaPrimaById,
  deleteMateriaPrimaById,
};
