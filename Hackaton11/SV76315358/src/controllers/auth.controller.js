// const { appError } = require("../middlewares/errorHandler.js");
// const { User } = require("../models");
// const { generateToken } = require("../utils/jwt.handle.js");

const { appError } = require("../middlewares/errorHandler");
const User = require("../models/User");
const { passEncrypt, comparePass } = require("../utils/encriptar");
const { generateToken } = require("../utils/jwt.handle");

const tokenBlackList = new Set();

const authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userFind = await User.findOne({ email: email }).select("+password");

    if (!userFind) {
      return next(
        appError(400, "USER_NOT_FOUND", "el usuario no ha sido encotnrado"),
      );
    }

    // console.log(`${password} === ${userFind.password}`);
    const isCorrect = await comparePass(password, userFind.password);
    if (!isCorrect) {
      return next(
        appError(
          400,
          "USER_NOT_FOUND",
          "las credenciales ingresadas son incorrectas",
        ),
      );
    }
    const token = generateToken(userFind._id);
    // const created = await User.findByPk(user.id);
    return res.status(201).json({ status: "ok", data: token });
    // return res.send("USUARIO CORRECTO");
  } catch (error) {
    next(error);
  }
};

const authLogout = (req, res, next) => {
  try {
    return res.send("Login auth");
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    return res.send("Login auth");
  } catch (error) {
    next(error);
  }
};

const createAccount = async (req, res, next) => {
  try {
    const { email, password, rol } = req.body;

    const hashPass = await passEncrypt(password);

    // console.log("hashPass", hashPass);
    const userCreated = await User.create({ email, password: hashPass, rol });

    const userFind = await User.findOne(userCreated._id);
    // .select("+password");

    return res.status(200).json(userFind);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authLogin,
  authLogout,
  updatePassword,
  tokenBlackList,
  createAccount,
};
