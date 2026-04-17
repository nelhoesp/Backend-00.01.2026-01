import { model, Schema } from "mongoose";
import type { IItem } from "../interface/IItem.ts";

const itemSchema = new Schema<IItem>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
      default: "",
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    esCompletado: {
      type: Boolean,
      default: false,
    },
    usuario: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IItem>("Item", itemSchema);
