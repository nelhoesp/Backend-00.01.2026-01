import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./models/User.ts";
import Item from "./models/Item.ts";
import { passEncrypt } from "./utils/encriptar.ts";

const seed = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/shopping-list",
    );
    console.log("📂 Conectado a MongoDB");

    await Promise.all([User.deleteMany({}), Item.deleteMany({})]);
    console.log("🧹 Colecciones limpiadas");

    // ===== USUARIOS =====
    const users = await User.create([
      {
        nombre: "Milan",
        email: "milan@test.com",
        password: await passEncrypt("123456"),
      },
      {
        nombre: "Ana",
        email: "ana@test.com",
        password: await passEncrypt("123456"),
      },
    ]);
    console.log(`✅ ${users.length} usuarios creados`);

    // ===== ITEMS =====
    const items = await Item.create([
      {
        nombre: "Comprar leche",
        descripcion: "Leche deslactosada",
        fecha: new Date("2026-04-10"),
        esCompletado: false,
        usuario: users[0]._id,
      },
      {
        nombre: "Comprar pan",
        descripcion: "Pan integral",
        fecha: new Date("2026-04-10"),
        esCompletado: false,
        usuario: users[0]._id,
      },
      {
        nombre: "Comprar arroz",
        descripcion: "Arroz extra 5kg",
        fecha: new Date("2026-04-11"),
        esCompletado: true,
        usuario: users[0]._id,
      },
      {
        nombre: "Comprar huevos",
        descripcion: "Huevos de corral x30",
        fecha: new Date("2026-04-09"),
        esCompletado: false,
        usuario: users[0]._id,
      },
      {
        nombre: "Detergente",
        descripcion: "Detergente líquido 3L",
        fecha: new Date("2026-04-08"),
        esCompletado: true,
        usuario: users[0]._id,
      },
      {
        nombre: "Comprar frutas",
        descripcion: "Manzanas y plátanos",
        fecha: new Date("2026-04-11"),
        esCompletado: false,
        usuario: users[1]._id,
      },
      {
        nombre: "Papel higiénico",
        descripcion: "Pack x12",
        fecha: new Date("2026-04-10"),
        esCompletado: false,
        usuario: users[1]._id,
      },
      {
        nombre: "Aceite de oliva",
        descripcion: "Extra virgen 1L",
        fecha: new Date("2026-04-07"),
        esCompletado: true,
        usuario: users[1]._id,
      },
    ]);
    console.log(`✅ ${items.length} ítems creados`);

    console.log("\n🎉 Seed completado!");
    console.log("   Credenciales: milan@test.com / 123456");
    console.log("                 ana@test.com / 123456");
    console.log("   Ejecuta: npm run dev");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error en seed:", error.message);
    process.exit(1);
  }
};

seed();
