import type { Document } from "mongoose";

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  role: "admin" | "client";
  avatar: string;
  isOnline: boolean;
  googleId?: string;
}
