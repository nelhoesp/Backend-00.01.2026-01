// const { appError } = require("../middlewares/errorHandler.js");
// const { User } = require("../models");
// const { generateToken } = require("../utils/jwt.handle.js");

import type { Response, Request, NextFunction } from "express";
import User from "../models/User.ts";
import { comparePass, passEncrypt } from "../utils/encriptar.ts";
import { appError } from "../middlewares/errorHandler.ts";
import { generateToken } from "../utils/jwt.handle.ts";

// const { appError } = require("../middlewares/errorHandler");
// const User = require("../models/User");
// const { passEncrypt, comparePass } = require("../utils/encriptar");
// const { generateToken } = require("../utils/jwt.handle");

export const tokenBlackList = new Set();

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const userFind = await User.findOne({ email: email }).select("+password");

    if (!userFind) {
      return next(
        appError(400, "USER_NOT_FOUND", "el usuario no ha sido encotnrado"),
      );
    }

    // console.log(`${password} === ${userFind}`);

    const isCorrect = await comparePass(password, userFind.password);
    if (!isCorrect) {
      return next(
        appError(
          400,
          "PASSWORD_INCORRECT",
          "las credenciales ingresadas son incorrectas",
        ),
      );
    }

    const token = generateToken(userFind._id.toString());
    // // const created = await User.findByPk(user.id);
    return res.status(200).json({ status: "ok", data: token });
    // return res.send("USUARIO CORRECTO");
  } catch (error) {
    next(error);
  }
};

export const authLogout = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      tokenBlackList.add(token);
    }

    res
      .status(200)
      .json({ status: "ok", msg: "sesion cerrada corrrectamente" });
  } catch (error) {
    next(error);
  }
};

// const updatePassword = async (req, res, next) => {
//   try {
//     return res.send("Login auth");
//   } catch (error) {
//     next(error);
//   }
// };

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nombre, email, password, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return next(
        appError(400, "EMAIL_EXISTS", "El email ya ah sido registrado"),
      );
    }

    const hashPass = await passEncrypt(password);

    // console.log("hashPass", hashPass);
    const userCreated = await User.create({
      email,
      nombre,
      password: hashPass,
      role,
    });

    const userFind = await User.findById(userCreated._id.toString());
    // .select("+password");

    return res.status(200).json(userFind);
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return next(appError(400, "FILE_REQUIRED", "Se requiere una imagen."));
    }

    const avatarUrl = `/uploads/${req.file.filename}`;

    const userFind = await User.findById(req.userId);

    if (!userFind) {
      return next(
        appError(400, "USER_NOT_FOUND", "El usuario no ah sido encontrado"),
      );
    }

    userFind.avatar = avatarUrl;

    userFind.save();

    return res.status(200).json({
      message: "Avatar actualizado correctamente",
      userFind,
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const aboutMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userFind = await User.findById(req.userId);

    if (!userFind) {
      return next(
        appError(400, "USER_NOT_FOUND", "El usuario no ah sido encontrado"),
      );
    }

    return res.status(200).json(userFind);
  } catch (error) {
    next(error);
  }
};
