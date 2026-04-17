require("dotenv").config();
const jwt = require("jsonwebtoken");
// const { User } = require("../models");
const { appError } = require("./errorHandler");
const { tokenBlackList } = require("../controllers/auth.controller");

const authMiddleware = async (req, res, next) => {
  try {
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

    if(tokenBlackList.has(token)) {
      return next(appError(401, "TOKEN_REVOKED", "token revocado"))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // findByPk en vez de findById (Sequelize)
    // const usuario = await User.findByPk(decoded.id);
    // if (!usuario) {
    //   return next(
    //     appError(
    //       401,
    //       "USER_NOT_FOUND",
    //       "No autorizado. Usuario no encontrado.",
    //     ),
    //   );
    // }

    // req.usuario = usuario;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(appError(401, "INVALID_TOKEN", "Token inválido."));
    }
    if (error.name === "TokenExpiredError") {
      return next(appError(401, "TOKEN_EXPIRED", "Token expirado."));
    }
    next(error);
  }
};

module.exports = authMiddleware;
