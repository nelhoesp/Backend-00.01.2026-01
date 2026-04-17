const Personal = require("../models/Personal");
const MateriaPrima = require("../models/MateriaPrima");
const Insumo = require("../models/Insumo");

const getAllPersonal = async (req, res, next) => {
  try {
    const data = await Personal.find()
      .sort({ createdAt: -1 });

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const createPersonal = async (req, res, next) => {
  try {

    const data = new Personal(req.body);
    await data.save();

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const getPersonalById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await Personal.findById(id);

    if (!getData) {
      return next(
        appError(400, "Personal_NOT_FOUND", "Personal no encontrada"),
      );
    }

    return res.status(201).json({ status: "ok", data: getData });
  } catch (error) {
    next(error);
  }
};

const UpdatePersonalById = async (req, res, next) => {
  try {
    return res.send('UPDATE')
  } catch (error) {
    next(error);
  }
};

const deletePersonalById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await Personal.findByIdAndDelete(id);

    return res.status(201).json({ status: "ok", msg: "Eliminado Correctamente !" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllPersonal,
  createPersonal,
  getPersonalById,
  UpdatePersonalById,
  deletePersonalById,
};
