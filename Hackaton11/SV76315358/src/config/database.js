const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Connected on DB: ${conn.connection.host}, ${conn.connection.name}`,
    );
  } catch (error) {
    console.log("Error en la conexion con la bd.", error);
    process.exit(1);
  }
};

module.exports = connectDB;
