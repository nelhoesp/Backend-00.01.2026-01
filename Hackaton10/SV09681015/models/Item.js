const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true,
    default: ''
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  esCompletado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
