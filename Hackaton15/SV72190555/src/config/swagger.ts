import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hackatón Express Pro API',
      version: '1.0.0',
      description:
        'API modular con Express.js — middlewares, rutas versionadas, uploads, idempotencia, métricas y documentación Swagger.',
      contact: { name: 'Milan', email: 'milan@example.com' },
      license: { name: 'MIT' },
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' },
    ],
    components: {
      securitySchemes: {
        XToken: {
          type: 'apiKey',
          in: 'header',
          name: 'x-token',
          description: 'Token simple (valor por defecto: "secret")',
        },
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'API Key para rutas protegidas',
        },
        IdempotencyKey: {
          type: 'apiKey',
          in: 'header',
          name: 'Idempotency-Key',
          description: 'UUID único por operación (evita duplicados)',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', example: 'Milan' },
            email: { type: 'string', example: 'milan@example.com' },
            avatar: { type: 'string', nullable: true },
            role: { type: 'string', enum: ['user', 'admin'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            customerId: { type: 'string' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'string' },
                  name: { type: 'string' },
                  quantity: { type: 'integer' },
                  price: { type: 'number' },
                },
              },
            },
            total: { type: 'number' },
            status: {
              type: 'string',
              enum: ['pending', 'paid', 'shipped', 'cancelled'],
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '..', 'routes', '**', '*.js'),
    path.join(__dirname, '..', 'app.js'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
