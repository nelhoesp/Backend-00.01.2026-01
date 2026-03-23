const sequelize = require("./db");
const { User, Course } = require("./models/index");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const password = bcrypt.hashSync("123456", 10);

    await User.bulkCreate(
      [
        {
          firstName: "Admin",
          lastName: "Root",
          email: "admin@platform.io",
          passwordHash: password,
          role: "admin",
        },
        {
          firstName: "Ada",
          lastName: "Lovelace",
          email: "ada@platform.io",
          passwordHash: password,
          role: "instructor",
        },
        {
          firstName: "Student",
          lastName: "Uno",
          email: "student@platform.io",
          passwordHash: password,
          role: "student",
        }
      ],
      { ignoreDuplicates: true }
    );

    const instructor = await User.findOne({ where: { role: "instructor" } });

    if (instructor) {
      await Course.findOrCreate({
        where: { slug: 'intro-a-nodejs' },
        defaults: {
          title: 'Intro a Node.js',
          description: 'Curso base de Node.js',
          published: true,
          ownerId: instructor.id,
        },
      });
    }

    console.log("Datos cargados correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error en el seed:", error);
    process.exit(1);
  }
}

seed();