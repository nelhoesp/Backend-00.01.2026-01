const mongoose = require("mongoose");

const personalSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      require: [true, "El nombre es obligatorio"],
      trim: true,
    },
    apellido: {
      type: String,
      require: [true, "El apellido es obligatorio"],
      trim: true,
    },
    dni: {
      type: String,
      require: [true, "El nombre es obligatorio"],
      unique: true,
      match: [/^\d{8}$/, "El dni debe tener 8 digitos"],
    },
    cargo: {
      type: String,
      enum: ["carpintero", "ayudante", "supervisor", "almacenero", "pintor"],
      default: "carpintero",
    },
    costoJornada: {
      type: Number,
      default: 40,
    },
    horasJornada: {
      type: Number,
      default: 8,
    },
    horasDisponibles: {
      type: Number,
      default: 160,
    },
    horasAsignadas: {
      type: Number,
      default: 0,
    },
    activo: {
      type: Boolean,
      default: true,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

personalSchema.virtual("nombreCompleto").get(function () {
  return `${this.nombre} ${this.apellido}`;
});

personalSchema.virtual("costoPorHora").get(function () {
  return this.costoJornada / this.horasJornada;
});

personalSchema.virtual("horasLibres").get(function () {
  return this.horasDisponibles - this.horasAsignadas;
});

personalSchema.set("toJSON", { virtuals: true });
personalSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Personal", personalSchema);
