const mongoose = require("mongoose");

const produccionSchema = new mongoose.Schema(
  {
    codigoOrden: {
      type: String,
      require: true,
      unique: true,
    },
    cantidad: {
      type: Number,
      require: [true, "la cantidad de armarios es obligatoria"],
      min: [1, , "Minimo 1 armario"],
    },
    tablonesNecesarios: {
      type: Number,
      default: 0,
    },
    gomaKgNecesaria: {
      type: Number,
      default: 0,
    },
    horasHombreNecesarias: {
      type: Number,
      default: 0,
    },
    tablonPorArmario: {
      type: Number,
      default: 1,
    },
    gomaPorArmario: {
      type: Number,
      default: 0.25,
    },
    hhPorArmario: {
      type: Number,
      default: 8,
    },
    materiaPrimaUsada: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MateriaPrima",
      },
    ],
    insumosUsados: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Insumo",
      },
    ],
    personalAsignado: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personal",
      },
    ],
    estado: {
      type: String,
      enum: ["planificado", "en_proceso", "completado", "cancelado"],
      default: "planificado",
    },
    fechaInicio: {
      type: Date,
      default: Date.now,
    },
    fechaFin: {
      type: Date,
    },
    observaciones: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

produccionSchema.pre("save", function () {
  if (this.isModified("cantidad")) {
    this.tablonesNecesarios = this.cantidad * this.tablonPorArmario;
    this.gomaKgNecesaria = this.cantidad * this.gomaPorArmario;
    this.horasHombreNecesarias = this.cantidad * this.hhPorArmario;
  }
  // next();
});

produccionSchema.virtual("resumenRecursos").get(function () {
  return `${this.cantidad} armarios -> ${this.tablonesNecesarios} tablones + ${this.gomaKgNecesaria}kg goma -> ${this.horasHombreNecesarias} HH`;
});

produccionSchema.set("toJSON", { virtuals: true });
produccionSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Produccion", produccionSchema);
