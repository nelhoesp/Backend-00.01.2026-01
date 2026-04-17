import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const dbUri: any = process.env.MONGODB_URI;

if (!dbUri) throw new Error("MONGODB_URI is not defined");

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUri);
    console.log(
      `Connected on DB: ${conn.connection.host}, ${conn.connection.name}`,
    );
  } catch (error) {
    console.log("Error en la conexion con la bd.", error);
    process.exit(1);
  }
};
