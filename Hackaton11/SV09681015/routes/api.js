const express  = require('express');
const router   = express.Router();
const MateriaPrima = require('../models/MateriaPrima');
const Insumo       = require('../models/Insumo');
const Personal     = require('../models/Personal');
const Produccion   = require('../models/Produccion');

// ══════════════════════════════════════════
//  MATERIA PRIMA  (tablones) — ratio 3:1
// ══════════════════════════════════════════
router.post('/materia-prima', async (req, res) => {
  try {
    const doc = new MateriaPrima(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

router.get('/materia-prima', async (req, res) => {
  try {
    const docs = await MateriaPrima.find().sort({ fecha: -1 });
    res.json({ success: true, count: docs.length, data: docs });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/materia-prima/:id', async (req, res) => {
  try {
    await MateriaPrima.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Eliminado' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ══════════════════════════════════════════
//  INSUMOS  (goma) — ratio 1:0.25
// ══════════════════════════════════════════
router.post('/insumos', async (req, res) => {
  try {
    const doc = new Insumo(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

router.get('/insumos', async (req, res) => {
  try {
    const docs = await Insumo.find().sort({ fecha: -1 });
    res.json({ success: true, count: docs.length, data: docs });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/insumos/:id', async (req, res) => {
  try {
    await Insumo.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Eliminado' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ══════════════════════════════════════════
//  PERSONAL — ratio 40:8
// ══════════════════════════════════════════
router.post('/personal', async (req, res) => {
  try {
    const doc = new Personal(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

router.get('/personal', async (req, res) => {
  try {
    const docs = await Personal.find().sort({ nombre: 1 });
    res.json({ success: true, count: docs.length, data: docs });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.patch('/personal/:id/estado', async (req, res) => {
  try {
    const doc = await Personal.findByIdAndUpdate(
      req.params.id, { activo: req.body.activo }, { new: true }
    );
    res.json({ success: true, data: doc });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/personal/:id', async (req, res) => {
  try {
    await Personal.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Eliminado' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ══════════════════════════════════════════
//  PRODUCCIÓN — 1 armario: 1 tablón, 0.25kg goma, 8HH
// ══════════════════════════════════════════
router.post('/produccion', async (req, res) => {
  try {
    const doc = new Produccion(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

router.get('/produccion', async (req, res) => {
  try {
    const docs = await Produccion.find()
      .populate('personalAsignado', 'nombre cargo')
      .sort({ fecha: -1 });
    res.json({ success: true, count: docs.length, data: docs });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.patch('/produccion/:id/estado', async (req, res) => {
  try {
    const doc = await Produccion.findByIdAndUpdate(
      req.params.id, { estado: req.body.estado }, { new: true }
    );
    res.json({ success: true, data: doc });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.delete('/produccion/:id', async (req, res) => {
  try {
    await Produccion.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Eliminado' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ══════════════════════════════════════════
//  DASHBOARD — resumen general
// ══════════════════════════════════════════
router.get('/dashboard', async (req, res) => {
  try {
    const [materias, insumos, personal, producciones] = await Promise.all([
      MateriaPrima.find(),
      Insumo.find(),
      Personal.find(),
      Produccion.find()
    ]);

    const totalArmarios    = producciones.reduce((s, p) => s + p.cantidadArmarios, 0);
    const totalTablonesMP  = materias.reduce((s, m) => s + m.tablones, 0);
    const totalGomaInsumos = insumos.reduce((s, i) => s + i.goma_kg, 0);
    const personalActivo   = personal.filter(p => p.activo).length;

    res.json({
      success: true,
      data: {
        materiaPrima:   { registros: materias.length,    tablonesDisponibles: totalTablonesMP },
        insumos:        { registros: insumos.length,     gomaDisponible_kg: totalGomaInsumos },
        personal:       { total: personal.length,        activos: personalActivo },
        produccion:     { lotes: producciones.length,    armariosProducidos: totalArmarios },
      }
    });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
