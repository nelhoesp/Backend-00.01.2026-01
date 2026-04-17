const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (v) => /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(v),
      message: "Validacion de correo fallida",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "gerencia"],
    default: "gerencia",
  },
});

module.exports = mongoose.model("User", userSchema);
