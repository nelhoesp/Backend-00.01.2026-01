import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/hackaton16";
  await mongoose.connect(uri);
  console.log("Conectado a la bd de MongoDB");
};
