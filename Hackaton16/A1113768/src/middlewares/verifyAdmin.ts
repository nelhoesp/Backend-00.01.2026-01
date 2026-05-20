// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");
// const { appError } = require("./errorHandler");
// const { tokenBlackList } = require("../controllers/auth.controller");

import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.ts";
import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";
import { appError } from "./errorHandler.ts";
import { tokenBlackList } from "../controllers/auth.controller.ts";

const JWT_SECRET: any = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.role !== "admin") {
      return next(appError(401, "ONLY_ADMINS", "No autorizado"));
    }

    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return next(appError(401, "INVALID_TOKEN", "Token inválido."));
    }
    if (error.name === "TokenExpiredError") {
      return next(appError(401, "TOKEN_EXPIRED", "Token expirado."));
    }
    next(error);
  }
};
