import type { Types } from "mongoose";

export interface IItem extends Document {
  nombre: string;
  descripcion: string;
  fecha: Date;
  esCompletado: boolean;
  usuario: Types.ObjectId;
}
