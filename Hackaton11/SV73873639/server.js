const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Conexión a MongoDB: Nombre de la BD es el código de alumno (SV73873639)
const uri = 'mongodb://Tatsu:Alastor@ac-2ej4gxx-shard-00-00.trnzdzx.mongodb.net:27017,ac-2ej4gxx-shard-00-01.trnzdzx.mongodb.net:27017,ac-2ej4gxx-shard-00-02.trnzdzx.mongodb.net:27017/SV73873639?ssl=true&replicaSet=atlas-g1exzy-shard-0&authSource=admin&appName=prueba01';

mongoose.connect(uri).then(() => console.log('¡Conexión a MongoDB (SV73873639) exitosa!'));

const app = express();
app.use(express.json());
app.use('/Images', express.static(path.join(__dirname, 'Images')));

// 1. ESQUEMA DE MONGOOSE
const inventarioSchema = new mongoose.Schema({
    tablones: { type: Number, default: 0 },
    goma_kg: { type: Number, default: 0 },
    horas_hombre: { type: Number, default: 0 },
    armarios_producidos: { type: Number, default: 0 }
});
const Inventario = mongoose.model('Inventario', inventarioSchema);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// 2. RUTAS DE LA API

app.get('/api/inventario', async (req, res) => {
    let inv = await Inventario.findOne();
    if (!inv) {
        inv = new Inventario();
        await inv.save();
    }
    res.json(inv);
});

app.post('/api/inventario/abastecer', async (req, res) => {
    const { tipo } = req.body;
    let inv = await Inventario.findOne();
    
    if (tipo === 'materia_prima') inv.tablones += 3;
    if (tipo === 'insumo') inv.goma_kg += 1;
    if (tipo === 'personal') inv.horas_hombre += 40;

    await inv.save();
    res.json({ mensaje: "Abastecimiento exitoso", inventario: inv });
});

app.post('/api/inventario/producir', async (req, res) => {
    let inv = await Inventario.findOne();
    
    if (inv.tablones >= 1 && inv.goma_kg >= 0.25 && inv.horas_hombre >= 8) {
        inv.tablones -= 1;
        inv.goma_kg -= 0.25;
        inv.horas_hombre -= 8;
        inv.armarios_producidos += 1;
        
        await inv.save();
        res.json({ mensaje: "Armario fabricado con éxito", inventario: inv });
    } else {
        res.status(400).json({ error: "Recursos insuficientes para producir un armario" });
    }
});

const PUERTO = 3000;
app.listen(PUERTO, () => console.log(`Fábrica operativa en puerto ${PUERTO}`));