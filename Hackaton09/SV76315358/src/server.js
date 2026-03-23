require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const { User, Course } = require("./models");

const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());

app.use("/api/users", require("./routes/users.routes"));
app.use("/api/courses", require("./routes/courses.routes"));

async function start() {
  try {
    await sequelize.authenticate();
    
    const syncMode = process.env.DB_SYNC || "alter";

    if (syncMode === "force") {
      await sequelize.sync({ force: true });
    } else if (syncMode === "alter") {
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync();
    }

    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
}

start();
