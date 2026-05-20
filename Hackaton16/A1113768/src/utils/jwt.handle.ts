import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const JWT_SECRET: any = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): { id: string } => {
  return jwt.verify(token, JWT_SECRET) as { id: string };
};
