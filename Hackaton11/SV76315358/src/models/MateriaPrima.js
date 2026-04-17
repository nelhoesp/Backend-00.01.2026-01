const mongoose = require("mongoose");

/*
  Compra de Materia Prima - Ratio 3:1
  Por cada compra unitaria se reciben 3 tablones.
  Ejemplo: comprar 5 unidades = 15 tablones disponibles.
*/
const materiaPrimaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
      default: "",
    },
    unidadMedida: {
      type: String,
      enum: ["tablon", "plancha", "lamina", "metro"],
      default: "tablon",
    },
    cantidadComprada: {
      type: Number,
      required: [true, "La cantidad comprada es obligatoria"],
      min: [1, "Mínimo 1 unidad"],
    },
    cantidadRecibida: {
      type: Number,
      default: 0,
    },
    ratioConversion: {
      type: Number,
      default: 3, // Ratio 3:1 → 3 unidades por cada 1 comprada
    },
    precioUnitario: {
      type: Number,
      required: [true, "El precio unitario es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    proveedor: {
      type: String,
      trim: true,
      default: "Sin proveedor",
    },
    fechaCompra: {
      type: Date,
      default: Date.now,
    },
    estado: {
      type: String,
      enum: ["pendiente", "recibido", "parcial"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Middleware pre-save: calcular cantidad recibida según ratio 3:1
materiaPrimaSchema.pre("save", function () {
  if (this.isModified("cantidadComprada")) {
    this.cantidadRecibida = this.cantidadComprada * this.ratioConversion;
  }
});

// Virtual: costo total
materiaPrimaSchema.virtual("costoTotal").get(function () {
  return this.cantidadComprada * this.precioUnitario;
});

materiaPrimaSchema.set("toJSON", { virtuals: true });
materiaPrimaSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("MateriaPrima", materiaPrimaSchema);
