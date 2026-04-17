// Forzar DNS de Google en Node.js


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ⚠️  Nombre de BD = código de alumno: sv09681015
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sv09681015';

// ─── Middlewares ──────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Rutas ────────────────────────────────────────────
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Conexión MongoDB ─────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    const uriSegura = MONGO_URI.replace(/:([^@]+)@/, ':****@');
    console.log('✅  MongoDB conectado:', uriSegura);
    console.log('📦  Base de datos: sv09681015');
    app.listen(PORT, () => {
      console.log(`🚀  Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌  Error al conectar MongoDB:', err.message);
    process.exit(1);
  });
