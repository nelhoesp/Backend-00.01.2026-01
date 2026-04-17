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

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log("Inciando middleware");
    let token = null;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        appError(401, "NO_TOKEN", "No autorizado. Token no proporcionado."),
      );
    }

    if (tokenBlackList.has(token)) {
      return next(appError(401, "TOKEN_REVOKED", "token revocado"));
    }

    // console.log("token: ", token);

    const decoded: any = jwt.verify(token, JWT_SECRET);

    // console.log("decoded: ", decoded);

    const usuario = await User.findById(decoded.id.toString());
    if (!usuario) {
      return next(
        appError(
          401,
          "USER_NOT_FOUND",
          "No autorizado. Usuario no encontrado.",
        ),
      );
    }

    req.userId = usuario._id;
    req.role = usuario.role;

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
