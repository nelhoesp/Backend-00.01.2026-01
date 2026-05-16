import { Schema, model } from "mongoose";
import type { IUser } from "../interface/IUser.ts";

const userSchema = new Schema<IUser>({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (v: any) => /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(v),
      message: "Validacion de correo fallida",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "client", "courier"],
    default: "client",
  },
  avatar: {
    type: String,
    require: false,
    default: null,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

export default model<IUser>("User", userSchema);
