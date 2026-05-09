# Sistema de Courier Online
**Hackathon Semanal — Stack: Node.js · Express · Socket.io · MySQL**

---

## I. Descripción del Proyecto

Sistema de courier persistente en tiempo real que permite registrar paquetes, rastrear su ubicación en cada etapa y comunicarse entre clientes, repartidores y administradores mediante mensajería instantánea. Desarrollado con arquitectura cliente-servidor usando WebSockets para actualizaciones en tiempo real.

---

## II. Tecnologías Utilizadas (Logro del reto)

| Tecnología      | Uso en el proyecto                                              |
|-----------------|-----------------------------------------------------------------|
| **Node.js**     | Entorno de ejecución del servidor                               |
| **Express.js**  | Framework REST API                                              |
| **Socket.io**   | Comunicación en tiempo real (tracking, chat, notificaciones)    |
| **MySQL**       | Persistencia de datos con Stored Procedures y Vistas            |
| **JWT**         | Autenticación y autorización por roles                          |
| **bcryptjs**    | Encriptación de contraseñas                                     |
| **dotenv**      | Protección de credenciales mediante variables de entorno        |

---

## III. Estructura del Proyecto

```
courier/
├── server.js              ← Backend: Express + Socket.io + MySQL
├── package.json           ← Dependencias del proyecto
├── .env                   ← Variables de entorno (no subir a Git)
├── .gitignore
├── schema.sql             ← BD: tablas, SPs, vistas, datos de prueba
└── public/
    ├── index.html         ← Portal cliente y repartidor
    ├── admin.html         ← Panel de administración
    └── tracking.html      ← Rastreo público sin login
```

---

## IV. Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_aqui
DB_NAME=courier_db
JWT_SECRET=jwt_secret
PORT=3000
```

### 3. Configurar la base de datos
```bash
mysql -u root -p
source schema.sql;
```

### 4. Iniciar el servidor
```bash
npm start
```

### 5. Acceder al sistema

| Portal                          | URL                                                  |
|---------------------------------|------------------------------------------------------|
| Clientes y Repartidores         | http://localhost:3000                                |
| Administración                  | http://localhost:3000/admin.html                     |
| Rastreo público (sin login)     | http://localhost:3000/tracking.html                  |
| Rastreo con código precargado   | http://localhost:3000/tracking.html?codigo=CUR###### |

---

## V. Arquitectura del Sistema

### Roles y Accesos

| Acción                            | Destinatario | Cliente | Repartidor | Admin |
|-----------------------------------|:------------:|:-------:|:----------:|:-----:|
| Rastrear envío sin cuenta         |      ✅      |   ✅   |     ✅    |  ✅  |
| Registrarse solo                  |      ❌      |   ✅   |     ❌    |  ❌  |
| Registrar nuevo envío             |      ❌      |   ✅   |     ❌    |  ✅  |
| Ver sus paquetes                  |      ❌      |   ✅   |     ❌    |  ✅  |
| Actualizar estado del paquete     |      ❌      |   ❌   |     ✅    |  ✅  |
| Asignar repartidor                |      ❌      |   ❌   |     ❌    |  ✅  |
| Chat de soporte                   |      ❌      |   ✅   |     ✅    |  ✅  |
| Gestión de usuarios               |      ❌      |   ❌   |     ❌    |  ✅  |
| Ver estadísticas y gráficas       |      ❌      |   ❌   |     ❌    |  ✅  |
| Crear repartidores y admins       |      ❌      |   ❌   |     ❌    |  ✅  |

### Separación de Portales

```
localhost:3000               → Portal público (clientes y repartidores)
                               · Admin intenta ingresar → redirige a admin.html

localhost:3000/admin.html    → Panel de administración
                               · Cliente/repartidor intenta ingresar → acceso denegado

localhost:3000/tracking.html → Rastreo público sin login
                               · Cualquier persona con el código puede rastrear
                               · Soporta ?codigo=CUR###### para link directo
```

### Gestión de Usuarios por Rol

```
Cliente      → Se registra solo desde el portal público
Repartidor   → Solo el admin puede crearlo desde el panel de administración
Admin        → Solo otro admin puede crearlo desde el panel de administración
Destinatario → No necesita cuenta, rastrea con su código en tracking.html
```

---

## VI. Base de Datos — Objetos de BD (MySQL)

### Tablas

| Tabla              | Descripción                                                        |
|--------------------|--------------------------------------------------------------------|
| `usuarios`         | Clientes, repartidores y admins con rol y contraseña encriptada    |
| `paquetes`         | Envíos con código de tracking único auto-generado                  |
| `ubicaciones`      | Historial de coordenadas GPS por paquete                           |
| `mensajes`         | Chat persistente por paquete                                       |
| `historial_eventos`| Línea de tiempo completa de cada paquete                           |

### Stored Procedures

| Procedimiento              | Descripción                                                                   |
|----------------------------|-------------------------------------------------------------------------------|
| `sp_registrar_paquete(...)` | Crea el paquete, genera código tracking único y registra el evento inicial   |
| `sp_actualizar_estado(...)` | Cambia el estado, guarda la ubicación GPS y agrega al historial              |
| `sp_obtener_tracking(codigo)`| Retorna el paquete completo con su historial de eventos                    |

### Vistas

| Vista               | Descripción                                              |
|---------------------|----------------------------------------------------------|
| `v_paquetes_activos`| Paquetes que aún no han sido entregados ni rechazados    |

---

## VII. REST API

### Autenticación
```
POST /api/auth/register        → Registro público (solo crea clientes)
POST /api/auth/login           → Login (retorna JWT con rol)
POST /api/admin/usuarios       → Crear usuario con cualquier rol (solo admin)
```

### Paquetes
```
POST /api/paquetes                   → Crear nuevo envío (cliente/admin)
GET  /api/paquetes                   → Listar paquetes según rol
GET  /api/paquetes/tracking/:codigo  → Tracking público sin autenticación
PUT  /api/paquetes/:id/estado        → Actualizar estado (repartidor/admin)
PUT  /api/paquetes/:id/repartidor    → Asignar repartidor (solo admin)
```

### Mensajes
```
GET  /api/paquetes/:id/mensajes      → Historial de chat del paquete
```

### Usuarios (solo admin)
```
GET    /api/usuarios           → Listar todos los usuarios
PUT    /api/usuarios/:id/rol   → Cambiar rol de un usuario
DELETE /api/usuarios/:id       → Eliminar usuario
```

---

## VIII. Socket.io — Tiempo Real

### Salas (Rooms)

| Sala           | Miembros                        | Descripción                              |
|----------------|---------------------------------|------------------------------------------|
| `staff`        | Admins y repartidores           | Reciben notificaciones globales          |
| `user_{id}`    | Usuario específico              | Sala personal                            |
| `paquete_{id}` | Cualquiera siguiendo el paquete | Tracking y chat en tiempo real           |

### Eventos Servidor → Cliente

| Evento              | Descripción                                             |
|---------------------|---------------------------------------------------------|
| `autenticado`       | Confirmación de autenticación via socket                |
| `nuevo_paquete`     | Notifica a staff cuando se registra un envío            |
| `estado_actualizado`| Notifica cambio de estado a seguidores del paquete      |
| `nuevo_mensaje`     | Mensaje de chat recibido                                |
| `ubicacion_live`    | Coordenadas GPS en tiempo real del repartidor           |
| `usuarios_online`   | Lista actualizada de usuarios conectados                |

### Eventos Cliente → Servidor

| Evento                     | Payload                        | Descripción                          |
|----------------------------|--------------------------------|--------------------------------------|
| `autenticar`               | `token`                        | Autenticarse via socket con JWT      |
| `seguir_paquete`           | `paquete_id`                   | Suscribirse a actualizaciones        |
| `dejar_paquete`            | `paquete_id`                   | Desuscribirse del paquete            |
| `mensaje_paquete`          | `{paquete_id, contenido}`      | Enviar mensaje de chat               |
| `actualizar_ubicacion_live`| `{paquete_id, lat, lng, desc}` | Transmitir GPS en tiempo real        |

---

## IX. Flujo Completo de un Paquete

```
[Cliente registra envío desde el portal]
        │
        ▼
   REGISTRADO ──── Socket emite 'nuevo_paquete' ──→ Staff notificado
        │
        ▼
[Admin asigna repartidor desde panel admin]
        │
        ▼
  EN_TRÁNSITO ──── Socket emite 'estado_actualizado' ──→ Cliente notificado
        │           GPS live via 'ubicacion_live'         Destinatario ve en tracking.html
        ▼
  EN_DESTINO ───── Socket emite 'estado_actualizado' ──→ Cliente notificado
        │                                                  Destinatario ve en tracking.html
        ▼
   ENTREGADO ────── Ciclo de vida completado
        │
        └── Todo el historial queda persistido en MySQL
```

### Flujo del Destinatario (sin cuenta)

```
Admin/Remitente comparte link:
http://localhost:3000/tracking.html?codigo=CUR537989
        │
        ▼
Destinatario abre el link en cualquier navegador
        │
        ▼
Ve estado actual + historial de eventos + barra de progreso
        │
        ▼
Socket.io actualiza la página automáticamente si el estado cambia
```

---

## X. Panel de Administración

El panel admin (`admin.html`) incluye cuatro secciones:

**Dashboard** — estadísticas en tiempo real: total paquetes, en tránsito, entregados y usuarios registrados. Gráfica de distribución de estados (doughnut) y gráfica de usuarios por rol (barras) con Chart.js. Feed de actividad en vivo vía Socket.io.

**Paquetes** — tabla completa de todos los envíos con filtros por estado y búsqueda por código de tracking. Modal para gestionar cada paquete: asignar repartidor y actualizar estado simultáneamente.

**Usuarios** — vista de tarjetas con todos los usuarios del sistema. El admin puede crear nuevos usuarios con cualquier rol (cliente, repartidor, admin), cambiar el rol de usuarios existentes y eliminarlos.

**Chats** — panel de conversaciones agrupadas por paquete. El admin puede leer y responder cualquier conversación en tiempo real vía Socket.io.

---

## XI. Portal de Rastreo Público (tracking.html)

Página accesible sin login para que cualquier destinatario rastree su envío:

- Búsqueda por código `CUR######` con barra de progreso visual
- Historial de eventos con línea de tiempo
- Actualización en tiempo real vía Socket.io cuando el estado cambia
- Soporte para link directo con parámetro `?codigo=CUR######`
- Sin necesidad de crear cuenta ni iniciar sesión

---

## XII. Seguridad Implementada

- Contraseñas encriptadas con **bcryptjs** (hash + salt rounds)
- Autenticación stateless con **JWT** (expira en 8 horas)
- Variables sensibles protegidas con **dotenv**
- Middleware de autenticación en todas las rutas protegidas
- Validación de rol en cada endpoint según permisos
- Registro público fuerza rol `cliente` — ignora cualquier otro rol en el body
- Admin bloqueado en portal cliente con redirección automática
- Cliente y repartidor bloqueados en panel admin
- Ruta de tracking pública no requiere token (datos de solo lectura)
- `.env` excluido del repositorio via `.gitignore`

---

## XIII. Dependencias

```json
{
  "express": "^4.18.2",
  "socket.io": "^4.6.2",
  "mysql2": "^3.6.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0"
}
```
