/*
const mongoose = require('mongoose');

// Gestión de Personal: ratio 40 horas semana / 8 horas diarias = 5 días
const personalSchema = new mongoose.Schema({
  nombre:          { type: String, required: true, trim: true },
  cargo:           { type: String, trim: true, default: 'Operario' },
  horasSemana:     { type: Number, default: 40 },    // 40 HH por semana
  horasDiarias:    { type: Number, default: 8 },     // 8 HH por día
  diasSemana:      { type: Number },                 // calculado: horasSemana / horasDiarias
  salarioHora:     { type: Number, required: true, min: 0 },
  salarioSemanal:  { type: Number },                 // calculado
  activo:          { type: Boolean, default: true },
  fechaIngreso:    { type: Date, default: Date.now }
}, { timestamps: true });

// Pre-save: calcular días y salario
personalSchema.pre('save', function (next) {
  this.diasSemana    = this.horasSemana / this.horasDiarias;  // ratio 40-8 = 5 días
  this.salarioSemanal = this.horasSemana * this.salarioHora;
  next();
});

module.exports = mongoose.model('Personal', personalSchema);
*/

const mongoose = require('mongoose');
 
// Gestión de Personal: ratio 40 horas semana / 8 horas diarias = 5 días
const personalSchema = new mongoose.Schema({
  nombre:          { type: String, required: true, trim: true },
  cargo:           { type: String, trim: true, default: 'Operario' },
  horasSemana:     { type: Number, default: 40 },    // 40 HH por semana
  horasDiarias:    { type: Number, default: 8 },     // 8 HH por día
  diasSemana:      { type: Number },                 // calculado: horasSemana / horasDiarias
  salarioHora:     { type: Number, required: true, min: 0 },
  salarioSemanal:  { type: Number },                 // calculado
  activo:          { type: Boolean, default: true },
  fechaIngreso:    { type: Date, default: Date.now }
}, { timestamps: true });
 
// Pre-save: calcular días y salario
personalSchema.pre('save', function () {
  this.diasSemana    = this.horasSemana / this.horasDiarias;  // ratio 40-8 = 5 días
  this.salarioSemanal = this.horasSemana * this.salarioHora;
});
 
module.exports = mongoose.model('Personal', personalSchema);