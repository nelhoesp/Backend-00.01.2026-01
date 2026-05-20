import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hackatón 16 — Sistema de Pagos Online API",
      version: "1.0.0",
      description:
        "API de pagos con Express.js, MySQL, OAuth Google y Stripe. Gestiona productos, pagos y devoluciones.",
      contact: { name: "A1113768", email: "estudiante@example.com" },
      license: { name: "MIT" },
    },
    servers: [
      { url: "http://localhost:3000", description: "Development server" },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtenido al hacer login",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            nombre: { type: "string", example: "Juan Perez" },
            email: { type: "string", example: "juan@example.com" },
            role: { type: "string", enum: ["admin", "client"] },
            avatar: { type: "string", nullable: true },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            nombre: { type: "string", example: "Laptop Gaming" },
            descripcion: { type: "string" },
            precio: { type: "number", example: 1500.0 },
            stock: { type: "integer", example: 10 },
            imagen: { type: "string", nullable: true },
          },
        },
        Payment: {
          type: "object",
          properties: {
            id: { type: "string" },
            user_id: { type: "string" },
            amount: { type: "number", example: 150.0 },
            currency: { type: "string", example: "usd" },
            status: {
              type: "string",
              enum: ["pending", "paid", "refunded", "failed"],
            },
            stripe_payment_intent_id: { type: "string" },
          },
        },
        Error: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            code: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "..", "routes", "**", "*.ts"),
    path.join(__dirname, "..", "app.ts"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
