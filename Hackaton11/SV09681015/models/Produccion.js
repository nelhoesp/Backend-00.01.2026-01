/*
const mongoose = require('mongoose');

// Producción: 1 armario = 1 tablón + 0.25k goma + 8 HH
const produccionSchema = new mongoose.Schema({
  lote:             { type: String, required: true, trim: true },
  cantidadArmarios: { type: Number, required: true, min: 1 },
  // Recursos consumidos (calculados automáticamente)
  tablonesUsados:   { type: Number },   // cantidadArmarios * 1
  gomaUsada_kg:     { type: Number },   // cantidadArmarios * 0.25
  horasHombre:      { type: Number },   // cantidadArmarios * 8
  // Costos
  costoPorArmario:  { type: Number, required: true, min: 0 },
  costoTotal:       { type: Number },
  // Referencias al personal asignado
  personalAsignado: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Personal' }],
  estado:  {
    type: String,
    enum: ['en_proceso', 'completado', 'pausado'],
    default: 'en_proceso'
  },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

// Pre-save: calcular recursos consumidos según ratios del problema
produccionSchema.pre('save', function (next) {
  this.tablonesUsados = this.cantidadArmarios * 1;      // 1 tablón/armario
  this.gomaUsada_kg   = this.cantidadArmarios * 0.25;   // 0.25 kg goma/armario
  this.horasHombre    = this.cantidadArmarios * 8;      // 8 HH/armario
  this.costoTotal     = this.cantidadArmarios * this.costoPorArmario;
  next();
});

module.exports = mongoose.model('Produccion', produccionSchema);
*/

const mongoose = require('mongoose');
 
// Producción: 1 armario = 1 tablón + 0.25k goma + 8 HH
const produccionSchema = new mongoose.Schema({
  lote:             { type: String, required: true, trim: true },
  cantidadArmarios: { type: Number, required: true, min: 1 },
  // Recursos consumidos (calculados automáticamente)
  tablonesUsados:   { type: Number },   // cantidadArmarios * 1
  gomaUsada_kg:     { type: Number },   // cantidadArmarios * 0.25
  horasHombre:      { type: Number },   // cantidadArmarios * 8
  // Costos
  costoPorArmario:  { type: Number, required: true, min: 0 },
  costoTotal:       { type: Number },
  // Referencias al personal asignado
  personalAsignado: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Personal' }],
  estado:  {
    type: String,
    enum: ['en_proceso', 'completado', 'pausado'],
    default: 'en_proceso'
  },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });
 
// Pre-save: calcular recursos consumidos según ratios del problema
produccionSchema.pre('save', function () {
  this.tablonesUsados = this.cantidadArmarios * 1;      // 1 tablón/armario
  this.gomaUsada_kg   = this.cantidadArmarios * 0.25;   // 0.25 kg goma/armario
  this.horasHombre    = this.cantidadArmarios * 8;      // 8 HH/armario
  this.costoTotal     = this.cantidadArmarios * this.costoPorArmario;
});
 
module.exports = mongoose.model('Produccion', produccionSchema);