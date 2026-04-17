/*
const mongoose = require('mongoose');

// Compra de Insumos: ratio 1 unidad por cada 0.25k de goma
const insumoSchema = new mongoose.Schema({
  descripcion:    { type: String, required: true, trim: true },
  cantidad:       { type: Number, required: true, min: 0 },   // unidades compradas
  goma_kg:        { type: Number },                           // calculado: cantidad * 0.25
  precioUnitario: { type: Number, required: true, min: 0 },
  total:          { type: Number },
  proveedor:      { type: String, trim: true, default: 'Sin especificar' },
  fecha:          { type: Date, default: Date.now }
}, { timestamps: true });

// Pre-save: calcular goma (kg) y total
insumoSchema.pre('save', function (next) {
  this.goma_kg = this.cantidad * 0.25;      // ratio 1-0.25
  this.total   = this.cantidad * this.precioUnitario;
  next();
});

module.exports = mongoose.model('Insumo', insumoSchema);
*/

const mongoose = require('mongoose');
 
// Compra de Insumos: ratio 1 unidad por cada 0.25k de goma
const insumoSchema = new mongoose.Schema({
  descripcion:    { type: String, required: true, trim: true },
  cantidad:       { type: Number, required: true, min: 0 },   // unidades compradas
  goma_kg:        { type: Number },                           // calculado: cantidad * 0.25
  precioUnitario: { type: Number, required: true, min: 0 },
  total:          { type: Number },
  proveedor:      { type: String, trim: true, default: 'Sin especificar' },
  fecha:          { type: Date, default: Date.now }
}, { timestamps: true });
 
// Pre-save: calcular goma (kg) y total
insumoSchema.pre('save', function () {
  this.goma_kg = this.cantidad * 0.25;      // ratio 1-0.25
  this.total   = this.cantidad * this.precioUnitario;
});
 
module.exports = mongoose.model('Insumo', insumoSchema);