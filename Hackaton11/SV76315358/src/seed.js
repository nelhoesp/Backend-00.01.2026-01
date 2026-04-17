require('dotenv').config();
const mongoose = require('mongoose');
const MateriaPrima = require('./models/MateriaPrima');
const Insumo = require('./models/Insumo');
const Personal = require('./models/Personal');
const Produccion = require('./models/Produccion');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📂 Conectado a MongoDB');

    // Limpiar colecciones
    await Promise.all([
      MateriaPrima.deleteMany({}),
      Insumo.deleteMany({}),
      Personal.deleteMany({}),
      Produccion.deleteMany({})
    ]);
    console.log('🧹 Colecciones limpiadas');

    // ===== MATERIA PRIMA (Ratio 3:1) =====
    const materias = await MateriaPrima.create([
      {
        nombre: 'tablon de Pino',
        descripcion: 'tablon de madera de pino 2.4m x 30cm',
        unidadMedida: 'tablon',
        cantidadComprada: 10,
        precioUnitario: 25.00,
        proveedor: 'Maderas del Sur',
        estado: 'recibido'
      },
      {
        nombre: 'tablon de Cedro',
        descripcion: 'tablon de madera de cedro premium',
        unidadMedida: 'tablon',
        cantidadComprada: 5,
        precioUnitario: 45.00,
        proveedor: 'Maderera Nacional',
        estado: 'recibido'
      },
      {
        nombre: 'Plancha MDF',
        descripcion: 'Plancha MDF 18mm 2.14m x 2.44m',
        unidadMedida: 'plancha',
        cantidadComprada: 8,
        precioUnitario: 35.00,
        proveedor: 'Sodimac',
        estado: 'pendiente'
      }
    ]);
    console.log(`✅ ${materias.length} registros de Materia Prima creados`);

    // ===== INSUMOS (Ratio 1:0.25) =====
    const insumos = await Insumo.create([
      {
        nombre: 'Goma Blanca Industrial',
        descripcion: 'Pegamento para madera resistente',
        tipo: 'goma',
        unidadMedida: 'kg',
        cantidadComprada: 20,
        precioUnitario: 8.50,
        proveedor: 'Químicos SAC',
        estado: 'recibido'
      },
      {
        nombre: 'Barniz Transparente',
        descripcion: 'Barniz mate para acabado final',
        tipo: 'barniz',
        unidadMedida: 'litro',
        cantidadComprada: 12,
        precioUnitario: 15.00,
        proveedor: 'Pinturas Rex',
        estado: 'recibido'
      },
      {
        nombre: 'Tornillos 2 pulgadas',
        descripcion: 'Tornillos para madera caja x100',
        tipo: 'tornillos',
        unidadMedida: 'unidad',
        cantidadComprada: 5,
        precioUnitario: 12.00,
        proveedor: 'Ferretería Central',
        estado: 'recibido'
      }
    ]);
    console.log(`✅ ${insumos.length} registros de Insumos creados`);

    // ===== PERSONAL (Ratio 40:8) =====
    const personal = await Personal.create([
      {
        nombre: 'Juan',
        apellido: 'García López',
        dni: '12345678',
        cargo: 'carpintero',
        costoJornada: 40,
        horasJornada: 8,
        horasDisponibles: 8,
        activo: true
      },
      {
        nombre: 'María',
        apellido: 'Torres Ruiz',
        dni: '23456789',
        cargo: 'carpintero',
        costoJornada: 40,
        horasJornada: 8,
        horasDisponibles: 8,
        activo: true
      },
      {
        nombre: 'Pedro',
        apellido: 'Condori Quispe',
        dni: '34567890',
        cargo: 'ayudante',
        costoJornada: 40,
        horasJornada: 8,
        horasDisponibles: 8,
        activo: true
      },
      {
        nombre: 'Ana',
        apellido: 'Mendoza Flores',
        dni: '45678901',
        cargo: 'pintor',
        costoJornada: 40,
        horasJornada: 8,
        horasDisponibles: 8,
        activo: true
      },
      {
        nombre: 'Carlos',
        apellido: 'Huamán Ramos',
        dni: '56789012',
        cargo: 'supervisor',
        costoJornada: 40,
        horasJornada: 8,
        horasDisponibles: 8,
        activo: true
      }
    ]);
    console.log(`✅ ${personal.length} registros de Personal creados`);

    // ===== PRODUCCIÓN (1 armario = 1 tablon + 0.25kg goma + 8HH) =====
    const ordenes = await Produccion.create([
      {
        codigoOrden: 'ORD-0001',
        cantidad: 5,
        materiaPrimaUsada: [materias[0]._id],
        insumosUsados: [insumos[0]._id],
        personalAsignado: [personal[0]._id, personal[1]._id],
        estado: 'completado',
        observaciones: 'Primera orden de prueba - 5 armarios de pino'
      },
      {
        codigoOrden: 'ORD-0002',
        cantidad: 3,
        materiaPrimaUsada: [materias[1]._id],
        insumosUsados: [insumos[0]._id, insumos[1]._id],
        personalAsignado: [personal[2]._id, personal[3]._id],
        estado: 'en_proceso',
        observaciones: 'Armarios premium de cedro'
      },
      {
        codigoOrden: 'ORD-0003',
        cantidad: 10,
        materiaPrimaUsada: [materias[0]._id, materias[1]._id],
        insumosUsados: [insumos[0]._id],
        personalAsignado: [personal[0]._id, personal[1]._id, personal[2]._id],
        estado: 'planificado',
        observaciones: 'Pedido grande para cliente corporativo'
      }
    ]);
    console.log(`✅ ${ordenes.length} órdenes de Producción creadas`);

    console.log('\n🎉 Seed completado exitosamente!');
    console.log('   Ejecuta: npm start');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    process.exit(1);
  }
};

seed();
