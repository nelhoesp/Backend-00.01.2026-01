import dotenv from "dotenv";
dotenv.config();

import { testConnection } from "./config/database_my.ts";
import { Product } from "./models/Product.ts";

async function seed() {
  await testConnection();

  await Product.bulkCreate([
    { nombre: "Laptop Gaming", descripcion: "Laptop de alto rendimiento", precio: 1500.00, stock: 10 },
    { nombre: "Mouse Inalámbrico", descripcion: "Mouse ergonómico 2.4GHz", precio: 25.99, stock: 50 },
    { nombre: "Teclado Mecánico", descripcion: "Teclado RGB switches azules", precio: 89.99, stock: 30 },
    { nombre: "Monitor 4K", descripcion: "Monitor 27 pulgadas 4K UHD", precio: 450.00, stock: 15 },
    { nombre: "Auriculares BT", descripcion: "Auriculares Bluetooth ANC", precio: 120.00, stock: 25 },
  ]);

  console.log("Seed completado — productos creados");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error en seed:", err);
  process.exit(1);
});
