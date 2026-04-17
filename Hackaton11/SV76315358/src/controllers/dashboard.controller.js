const Insumo = require("../models/Insumo");
const MateriaPrima = require("../models/MateriaPrima");
const Personal = require("../models/Personal");
const Produccion = require("../models/Produccion");

const getStats = async (req, res, next) => {
  try {
    const [materiales, insumos, personal, ordenes] = await Promise.all([
      MateriaPrima.countDocuments(),
      Insumo.countDocuments(),
      Personal.countDocuments({ activo: true }),
      Produccion.countDocuments(),
    ]);

    return res.status(201).json({
      ok: true,
      data: {
        total_de_materia_prima: materiales,
        total_de_insumo: insumos,
        total_de_personal_activo: personal,
        total_de_odenes: ordenes,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };
