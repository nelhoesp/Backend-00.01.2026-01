require("dotenv").config();
const express = require("express");
const router = require("./routes/index.js");
const cookieParser = require("cookie-parser");

const { errorHandler } = require("./middlewares/errorHandler");
const connectDB = require("./config/database.js");

const app = express();
const PORT = process.env.PORT || 3030;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// ROUTES
app.use("/api/", router);

// MANEJO GLOBAL DE ERRORES
app.use(errorHandler);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Fallo al iniciar el servidor: ", err);
    process.exit(1);
  }
}

start();
