const Produccion = require("../models/Produccion");
const MateriaPrima = require("../models/MateriaPrima");
const Insumo = require("../models/Insumo");
const Personal = require("../models/Personal");

const getAllProduccion = async (req, res, next) => {
  try {
    const data = await Produccion.find()
      .populate("materiaPrimaUsada", "nombre cantidadRecibida")
      .populate("insumosUsados", "nombre cantidadRecibida")
      .populate("personalAsignado", "nombre apellido horasDisponibles")
      .sort({ createdAt: -1 });

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const createProduccion = async (req, res, next) => {
  try {
    const { materiaPrimaUsada, insumosUsados, personalAsignado } = req.body;

    const count = await Produccion.countDocuments();

    req.body.materiaPrimaUsada = materiaPrimaUsada;
    req.body.insumosUsados = insumosUsados;
    req.body.personalAsignado = personalAsignado;

    req.body.codigoOrden = `ORD-${String(count + 1).padStart(4, "0")}`;

    const data = new Produccion(req.body);
    await data.save();

    return res.status(201).json({ status: "ok", data });
  } catch (error) {
    next(error);
  }
};

const getProduccionById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await Produccion.findById(id)
      .populate("materiaPrimaUsada")
      .populate("insumosUsados")
      .populate("personalAsignado");

    if (!getData) {
      return next(
        appError(400, "PRODUCCION_NOT_FOUND", "Produccion no encontrada"),
      );
    }

    return res.status(201).json({ status: "ok", data: getData });
  } catch (error) {
    next(error);
  }
};

const UpdateProduccionById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const { cantidad } = req.body;
    const getData = await Produccion.findById(id)
      .populate("materiaPrimaUsada")
      .populate("insumosUsados")
      .populate("personalAsignado");

    if (!getData) {
      return next(
        appError(400, "PRODUCCION_NOT_FOUND", "Produccion no encontrada"),
      );
    }

    getData.cantidad = cantidad;

    await getData.save();

    return res.status(201).json({ status: "ok", data: getData });
  } catch (error) {
    next(error);
  }
};

const deleteProduccionById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const getData = await Produccion.findByIdAndDelete(id);

    return res.status(201).json({ status: "ok", msg: "Eliminado Correctamente !" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllProduccion,
  createProduccion,
  getProduccionById,
  UpdateProduccionById,
  deleteProduccionById,
};
