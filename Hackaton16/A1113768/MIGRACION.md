# Migración — Hackaton 16

## Base de datos MySQL (`payments_db`)

Las tablas se crean automáticamente con `sequelize.sync({ alter: true })` al iniciar el servidor.

### Tablas creadas automáticamente:
- `products` — catálogo de productos
- `payments` — pagos procesados con Stripe
- `purchase_items` — productos incluidos en cada pago
- `refunds` — devoluciones

## Base de datos MongoDB (`hackaton16`)

Los modelos de Mongoose se sincronizan automáticamente.

### Colecciones:
- `users` — usuarios con OAuth Google y JWT

## Variables de entorno necesarias

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hackaton16
JWT_SECRET=tu_secreto_aqui
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=payments_db
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
STRIPE_SECRET_KEY=sk_test_tu_stripe_key
FRONTEND_URL=http://localhost:5173
```

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # iniciar servidor en desarrollo
npm run db:seed    # poblar productos de prueba
```
