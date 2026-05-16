import type { Response, Request, NextFunction } from "express";
import User from "../models/User.ts";

// export const tokenBlackList = new Set();

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const myUser = req.userId;

    // Excluir al usuario actual
    const allUsers = await User.find({
      _id: { $ne: myUser }, // $ne = not equal
    });

    return res.status(200).json({ status: "ok", allUsers });
  } catch (error) {
    next(error);
  }
};
