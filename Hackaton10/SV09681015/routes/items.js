const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// POST /api/items — Crear un item en la lista
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, fecha } = req.body;

    if (!nombre) {
      return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
    }

    const item = new Item({ nombre, descripcion, fecha });
    await item.save();

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/items/pendientes — Mostrar items pendientes
router.get('/pendientes', async (req, res) => {
  try {
    const items = await Item.find({ esCompletado: false }).sort({ fecha: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/items/completados — Mostrar items completados
router.get('/completados', async (req, res) => {
  try {
    const items = await Item.find({ esCompletado: true }).sort({ updatedAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/items — Obtener todos los items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ fecha: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/items/:id/completar — Completar un item
router.patch('/:id/completar', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { esCompletado: true },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item no encontrado' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/items/:id — Eliminar un item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item no encontrado' });
    }

    res.json({ success: true, message: 'Item eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
