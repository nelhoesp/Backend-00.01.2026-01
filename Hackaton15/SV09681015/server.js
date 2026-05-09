/**
 * SISTEMA DE COURIER ONLINE PackGo
 * Stack: Node.js + Express + Socket.io + MySQL
 * Hackathon - Backend Principal
 */
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// ── Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
// ── Pool de conexiones MySQL ─────────────────────────────────
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// ── Middleware Auth JWT ──────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// ════════════════════════════════════════════════════════════
//  RUTAS REST API
// ════════════════════════════════════════════════════════════

// ── AUTH ─────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  const rol = 'cliente'; // registro público siempre es cliente
  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)',
      [nombre, email, hash, rol]
    );
    res.json({ ok: true, id: result.insertId, mensaje: 'Usuario registrado' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── REGISTRO ADMIN (crea usuarios con cualquier rol) ─────────
app.post('/api/admin/usuarios', authMiddleware, async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Acceso denegado' });
  const { nombre, email, password, rol } = req.body;
  const rolesValidos = ['cliente', 'repartidor', 'admin'];
  if (!rolesValidos.includes(rol)) return res.status(400).json({ error: 'Rol inválido' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)',
      [nombre, email, hash, rol]
    );
    res.json({ ok: true, id: result.insertId, mensaje: `Usuario ${rol} creado` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Credenciales incorrectas' });
    
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign({ id: user.id, nombre: user.nombre, rol: user.rol }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ ok: true, token, usuario: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── PAQUETES ─────────────────────────────────────────────────
app.post('/api/paquetes', authMiddleware, async (req, res) => {
  const { descripcion, peso, destinatario_nombre, destinatario_direccion, destinatario_telefono } = req.body;
  try {
    // Usar Stored Procedure
    const [rows] = await pool.query(
      'CALL sp_registrar_paquete(?,?,?,?,?,?)',
      [descripcion, peso, req.user.id, destinatario_nombre, destinatario_direccion, destinatario_telefono]
    );
    const resultado = rows[0][0];
    
    // Notificar a todos los admins/repartidores conectados via Socket
    io.to('staff').emit('nuevo_paquete', {
      ...resultado,
      descripcion,
      remitente: req.user.nombre,
      destinatario_nombre,
      destinatario_direccion,
    });

    res.json({ ok: true, ...resultado });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/paquetes', authMiddleware, async (req, res) => {
  try {
    let query, params = [];
    if (req.user.rol === 'cliente') {
      // Cliente ve TODOS sus paquetes (activos + entregados)
      query = `SELECT p.*, u.nombre as remitente, r.nombre as repartidor_nombre
               FROM paquetes p 
               JOIN usuarios u ON p.remitente_id = u.id
               LEFT JOIN usuarios r ON p.repartidor_id = r.id
               WHERE p.remitente_id = ?
               ORDER BY p.created_at DESC`;
      params.push(req.user.id);
    } else {
      // Admin y repartidor ven todos los paquetes activos
      query = `SELECT p.*, u.nombre as remitente, r.nombre as repartidor_nombre,
               p.destinatario_nombre, p.destinatario_direccion
               FROM paquetes p
               JOIN usuarios u ON p.remitente_id = u.id
               LEFT JOIN usuarios r ON p.repartidor_id = r.id
               ORDER BY p.created_at DESC`;
    }
    const [rows] = await pool.query(query, params);
    res.json({ ok: true, paquetes: rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/paquetes/tracking/:codigo', async (req, res) => {
  try {
    // Usar Stored Procedure de tracking
    const [rows] = await pool.query('CALL sp_obtener_tracking(?)', [req.params.codigo]);
    if (!rows[0].length) return res.status(404).json({ error: 'Paquete no encontrado' });
    res.json({ ok: true, paquete: rows[0][0], historial: rows[1] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/paquetes/:id/estado', authMiddleware, async (req, res) => {
  const { estado, descripcion_ubicacion, latitud, longitud } = req.body;
  try {
    await pool.query(
      'CALL sp_actualizar_estado(?,?,?,?,?,?)',
      [req.params.id, estado, req.user.id, descripcion_ubicacion, latitud || null, longitud || null]
    );

    // Obtener info del paquete para notificar
    const [info] = await pool.query('SELECT * FROM paquetes WHERE id = ?', [req.params.id]);
    const paquete = info[0];

    // Emitir a la sala del paquete
    io.to(`paquete_${req.params.id}`).emit('estado_actualizado', {
      paquete_id: req.params.id,
      codigo_tracking: paquete.codigo_tracking,
      nuevo_estado: estado,
      descripcion_ubicacion,
      latitud, longitud,
      actualizado_por: req.user.nombre,
      timestamp: new Date().toISOString()
    });

    // Emitir a staff
    io.to('staff').emit('estado_actualizado', {
      paquete_id: req.params.id,
      codigo_tracking: paquete.codigo_tracking,
      nuevo_estado: estado,
      actualizado_por: req.user.nombre,
    });

    res.json({ ok: true, mensaje: 'Estado actualizado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── MENSAJES ─────────────────────────────────────────────────
app.get('/api/paquetes/:id/mensajes', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT m.*, u.nombre as autor FROM mensajes m 
       JOIN usuarios u ON m.usuario_id = u.id 
       WHERE m.paquete_id = ? ORDER BY m.created_at ASC`,
      [req.params.id]
    );
    res.json({ ok: true, mensajes: rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── GET todos los usuarios (solo admin) ──────────────────────
app.get('/api/usuarios', authMiddleware, async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Acceso denegado' });
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, email, rol, created_at FROM usuarios ORDER BY created_at DESC'
    );
    res.json({ ok: true, usuarios: rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── PUT cambiar rol de usuario (solo admin) ──────────────────
app.put('/api/usuarios/:id/rol', authMiddleware, async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Acceso denegado' });
  const { rol } = req.body;
  const rolesValidos = ['cliente', 'repartidor', 'admin'];
  if (!rolesValidos.includes(rol)) return res.status(400).json({ error: 'Rol inválido' });
  try {
    await pool.query('UPDATE usuarios SET rol = ? WHERE id = ?', [rol, req.params.id]);
    res.json({ ok: true, mensaje: 'Rol actualizado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── DELETE eliminar usuario (solo admin) ─────────────────────
app.delete('/api/usuarios/:id', authMiddleware, async (req, res) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Acceso denegado' });
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ ok: true, mensaje: 'Usuario eliminado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── PUT asignar repartidor a paquete (solo admin/repartidor) ─
app.put('/api/paquetes/:id/repartidor', authMiddleware, async (req, res) => {
  if (!['admin', 'repartidor'].includes(req.user.rol)) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  const { repartidor_id } = req.body;
  try {
    await pool.query(
      'UPDATE paquetes SET repartidor_id = ? WHERE id = ?',
      [repartidor_id, req.params.id]
    );
    res.json({ ok: true, mensaje: 'Repartidor asignado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ════════════════════════════════════════════════════════════
//  SOCKET.IO - TIEMPO REAL
// ════════════════════════════════════════════════════════════

// Mapa de usuarios conectados: socketId → userData
const usuariosConectados = new Map();

io.on('connection', (socket) => {
  console.log(`🔌 Socket conectado: ${socket.id}`);

  // ── Autenticar socket ───────────────────────────────────────
  socket.on('autenticar', (token) => {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      usuariosConectados.set(socket.id, user);
      
      // Unirse a sala de rol
      if (user.rol === 'admin' || user.rol === 'repartidor') {
        socket.join('staff');
      }
      socket.join(`user_${user.id}`);
      
      socket.emit('autenticado', { ok: true, mensaje: `Bienvenido ${user.nombre}` });
      console.log(`✅ Usuario autenticado: ${user.nombre} (${user.rol})`);
      
      // Emitir lista de conectados a staff
      io.to('staff').emit('usuarios_online', getUsuariosOnline());
    } catch {
      socket.emit('error_auth', { mensaje: 'Token inválido' });
    }
  });

  // ── Suscribirse al tracking de un paquete ──────────────────
  socket.on('seguir_paquete', (paquete_id) => {
    socket.join(`paquete_${paquete_id}`);
    socket.emit('siguiendo_paquete', { paquete_id, mensaje: `Siguiendo paquete #${paquete_id}` });
  });

  socket.on('dejar_paquete', (paquete_id) => {
    socket.leave(`paquete_${paquete_id}`);
  });

  // ── Chat del paquete ────────────────────────────────────────
  socket.on('mensaje_paquete', async (data) => {
    const user = usuariosConectados.get(socket.id);
    if (!user) {
      console.log(`❌ mensaje_paquete rechazado - socket ${socket.id} no autenticado`);
      return socket.emit('error', { mensaje: 'No autenticado' });
    }
    console.log(`💬 mensaje_paquete de ${user.nombre} (${user.rol}) → paquete ${data.paquete_id}: ${data.contenido}`);
    const { paquete_id, contenido } = data;
    try {
      // Guardar en BD
      const [result] = await pool.query(
        'INSERT INTO mensajes (paquete_id, usuario_id, contenido) VALUES (?,?,?)',
        [paquete_id, user.id, contenido]
      );

      const mensaje = {
        id: result.insertId,
        paquete_id,
        contenido,
        autor: user.nombre,
        autor_rol: user.rol,
        usuario_id: user.id,
        timestamp: new Date().toISOString()
      };

      // 1. Siempre devolver el mensaje al remitente (ve su propio mensaje)
      socket.emit('nuevo_mensaje', mensaje);

      // 2. Emitir a los demás en la sala del paquete (excluye al remitente)
      socket.to(`paquete_${paquete_id}`).emit('nuevo_mensaje', mensaje);

      // 3. Emitir a staff que NO estén en la sala (y no sean el remitente)
      const staffSockets = await io.in('staff').fetchSockets();
      for (const sf of staffSockets) {
        if (sf.id !== socket.id && !sf.rooms.has(`paquete_${paquete_id}`)) {
          sf.emit('nuevo_mensaje', mensaje);
        }
      }

    } catch (e) {
      socket.emit('error', { mensaje: e.message });
    }
  });

  // ── Actualizar ubicación GPS en tiempo real ─────────────────
  socket.on('actualizar_ubicacion_live', (data) => {
    const user = usuariosConectados.get(socket.id);
    if (!user) return;

    const { paquete_id, latitud, longitud, descripcion } = data;
    // Broadcast a todos siguiendo ese paquete
    io.to(`paquete_${paquete_id}`).emit('ubicacion_live', {
      paquete_id, latitud, longitud, descripcion,
      repartidor: user.nombre,
      timestamp: new Date().toISOString()
    });
  });

  // ── Desconexión ─────────────────────────────────────────────
  socket.on('disconnect', () => {
    usuariosConectados.delete(socket.id);
    io.to('staff').emit('usuarios_online', getUsuariosOnline());
    console.log(`❌ Socket desconectado: ${socket.id}`);
  });
});

function getUsuariosOnline() {
  return Array.from(usuariosConectados.values()).map(u => ({
    nombre: u.nombre, rol: u.rol
  }));
}

// ── Iniciar servidor ─────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`\n🚀 Courier Online corriendo en http://localhost:${PORT}/index.html`);
  console.log(`📦 API REST:    http://localhost:${PORT}/api`);
  console.log(`🔌 Socket.IO:   ws://localhost:${PORT}\n`);
});
