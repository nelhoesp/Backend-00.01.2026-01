const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lista_compras';

// ─── Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Rutas API ────────────────────────────────────────────────
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// ─── Ruta principal (sirve el frontend) ──────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Conexión MongoDB ─────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // Ocultar credenciales en el log
    const uriSegura = MONGO_URI.replace(/:([^@]+)@/, ':****@');
    console.log('✅  MongoDB conectado:', uriSegura);
    app.listen(PORT, () => {
      console.log(`🚀  Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌  Error al conectar MongoDB:', err.message);
    process.exit(1);
  });