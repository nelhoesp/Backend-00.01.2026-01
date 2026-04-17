
/*
const mongoose = require('mongoose');

// Compra de Materia Prima: ratio 3 tablones por cada 1 unidad de compra
const materiaPrimaSchema = new mongoose.Schema({
  descripcion:     { type: String, required: true, trim: true },
  cantidad:        { type: Number, required: true, min: 0 },        // unidades compradas
  tablones:        { type: Number },                                 // calculado: cantidad * 3
  precioUnitario:  { type: Number, required: true, min: 0 },
  total:           { type: Number },                                 // calculado
  proveedor:       { type: String, trim: true, default: 'Sin especificar' },
  fecha:           { type: Date, default: Date.now }
}, { timestamps: true });

// Pre-save: calcular tablones y total automáticamente
materiaPrimaSchema.pre('save', function (next) {
  this.tablones = this.cantidad * 3;        // ratio 3-1
  this.total    = this.cantidad * this.precioUnitario;
  next();
});

module.exports = mongoose.model('MateriaPrima', materiaPrimaSchema);
*/

const mongoose = require('mongoose');
 
// Compra de Materia Prima: ratio 3 tablones por cada 1 unidad de compra
const materiaPrimaSchema = new mongoose.Schema({
  descripcion:     { type: String, required: true, trim: true },
  cantidad:        { type: Number, required: true, min: 0 },        // unidades compradas
  tablones:        { type: Number },                                 // calculado: cantidad * 3
  precioUnitario:  { type: Number, required: true, min: 0 },
  total:           { type: Number },                                 // calculado
  proveedor:       { type: String, trim: true, default: 'Sin especificar' },
  fecha:           { type: Date, default: Date.now }
}, { timestamps: true });
 
// Pre-save: calcular tablones y total automáticamente
materiaPrimaSchema.pre('save', function () {
  this.tablones = this.cantidad * 3;        // ratio 3-1
  this.total    = this.cantidad * this.precioUnitario;
});
 
module.exports = mongoose.model('MateriaPrima', materiaPrimaSchema);