import type { Response, Request, NextFunction } from "express";
import User from "../models/User.ts";
import { comparePass, passEncrypt } from "../utils/encriptar.ts";
import { appError } from "../middlewares/errorHandler.ts";
import { generateToken } from "../utils/jwt.handle.ts";

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
        appError(400, "USER_NOT_FOUND", "el usuario no ha sido encontrado"),
      );
    }

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
    return res.status(200).json({ status: "ok", data: token });
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

    res.status(200).json({ status: "ok", msg: "sesion cerrada correctamente" });
  } catch (error) {
    next(error);
  }
};

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
        appError(400, "EMAIL_EXISTS", "El email ya ha sido registrado"),
      );
    }

    const hashPass = await passEncrypt(password);

    const userCreated = await User.create({
      email,
      nombre,
      password: hashPass,
      role,
    });

    const userFind = await User.findById(userCreated._id.toString());

    return res.status(200).json(userFind);
  } catch (error) {
    next(error);
  }
};

export const aboutMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userFind = await User.findById(req.userId);

    if (!userFind) {
      return next(
        appError(400, "USER_NOT_FOUND", "El usuario no ha sido encontrado"),
      );
    }

    return res.status(200).json(userFind);
  } catch (error) {
    next(error);
  }
};

// OAuth Google callback — genera token JWT tras autenticación
export const googleCallback = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return next(appError(401, "OAUTH_FAILED", "Autenticación OAuth fallida"));
    }

    const token = generateToken(req.user._id.toString());
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    // Redirige al frontend con el token en la URL
    return res.redirect(`${frontendUrl}/oauth?token=${token}`);
  } catch (error) {
    next(error);
  }
};
