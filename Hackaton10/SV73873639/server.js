// 1. Importamos las herramientas
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // <-- NUEVO: Herramienta para manejar rutas de archivos

// 2. Conectamos a la base de datos de MongoDB Atlas
const uri = 'mongodb://Tatsu:Alastor@ac-2ej4gxx-shard-00-00.trnzdzx.mongodb.net:27017,ac-2ej4gxx-shard-00-01.trnzdzx.mongodb.net:27017,ac-2ej4gxx-shard-00-02.trnzdzx.mongodb.net:27017/hackathon_compras?ssl=true&replicaSet=atlas-g1exzy-shard-0&authSource=admin&appName=prueba01';

mongoose.connect(uri)
  .then(() => {
    console.log('¡Conexión a MongoDB Atlas exitosa!');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });

// 2. Inicializamos la aplicación
const app = express();
app.use(express.json());
// NUEVA LÍNEA: Le damos permiso a Express para mostrar los archivos de la carpeta Images
app.use('/Images', express.static(path.join(__dirname, 'Images')));
// --- PASO 3: DEFINIR EL MODELO DE DATOS ---
const itemSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true
  },
  descripcion: { 
    type: String 
  },
  fecha: { 
    type: Date, 
    default: Date.now
  },
  esCompletado: { 
    type: Boolean, 
    default: false
  }
});

const Item = mongoose.model('Item', itemSchema);

const PUERTO = 3001;

// --- RUTA PARA MOSTRAR LA PÁGINA WEB ---
// <-- NUEVO: Al entrar a http://localhost:3001, muestra el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- PASO 4: RUTAS DE LA APLICACIÓN (API REST) ---

// Ruta 1: Crear un nuevo ítem (POST)
app.post('/api/compras', async (req, res) => {
  try {
    const datosDelUsuario = req.body;
    const nuevoItem = new Item(datosDelUsuario);
    const itemGuardado = await nuevoItem.save();
    
    res.status(201).json({
        mensaje: "¡Ítem creado con éxito!",
        datos: itemGuardado
    });
  } catch (error) {
    res.status(500).json({ 
        mensaje: "Hubo un error al guardar el ítem", 
        error: error.message 
    });
  }
});

// Ruta 2: Obtener pendientes (GET)
app.get('/api/compras/pendientes', async (req, res) => {
  try {
    const itemsPendientes = await Item.find({ esCompletado: false });
    res.status(200).json(itemsPendientes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pendientes", error: error.message });
  }
});

// Ruta 3: Obtener completados (GET)
app.get('/api/compras/completados', async (req, res) => {
  try {
    const itemsCompletados = await Item.find({ esCompletado: true });
    res.status(200).json(itemsCompletados);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener completados", error: error.message });
  }
});

// Ruta 4: Completar un ítem (PUT)
app.put('/api/compras/:id', async (req, res) => {
  try {
    const idDelItem = req.params.id;
    const itemActualizado = await Item.findByIdAndUpdate(
      idDelItem, 
      { esCompletado: true },
      { new: true } 
    );

    if (!itemActualizado) {
      return res.status(404).json({ mensaje: "No se encontró el ítem con ese ID" });
    }

    res.status(200).json({
      mensaje: "¡Ítem marcado como completado exitosamente!",
      datos: itemActualizado
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
  }
});

// 5. Encendemos el servidor
app.listen(PUERTO, () => {
    console.log(`¡Servidor corriendo y escuchando en el puerto ${PUERTO}!`);
});