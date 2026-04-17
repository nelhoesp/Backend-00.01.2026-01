# 🛒 Lista de Compras — Node.js + MongoDB

Aplicación web fullstack para gestionar una lista de compras.  
**Hackathon Semanal — NodeJS y MongoDB**

---

## 🚀 Tecnologías

| Capa       | Tecnología                   |
|------------|------------------------------|
| Backend    | Node.js + Express            |
| Base datos | MongoDB + Mongoose           |
| Frontend   | HTML5 + CSS3 + JS vanilla    |

---

## 📁 Estructura del proyecto

```
shopping-list/
├── models/
│   └── Item.js          ← Esquema MongoDB
├── routes/
│   └── items.js         ← Rutas de la API REST
├── public/
│   └── index.html       ← Frontend completo
├── server.js            ← Servidor Express principal
├── .env                 ← Variables de entorno
└── package.json
```

---

## ⚙️ Instalación y ejecución

### 1. Requisitos previos
- Node.js >= 16
- MongoDB corriendo en `localhost:27017`

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env si necesitas cambiar el puerto o la URI de MongoDB
```

### 4. Iniciar el servidor
```bash
npm start
```

Abre tu navegador en: **http://localhost:3000**

---

## 🗺️ Rutas de la API REST

| Método | Ruta                       | Descripción                  |
|--------|----------------------------|------------------------------|
| POST   | `/api/items`               | Crear un nuevo item          |
| GET    | `/api/items`               | Obtener todos los items      |
| GET    | `/api/items/pendientes`    | Obtener items pendientes     |
| GET    | `/api/items/completados`   | Obtener items completados    |
| PATCH  | `/api/items/:id/completar` | Marcar un item como completo |
| DELETE | `/api/items/:id`           | Eliminar un item             |

---

## 📦 Modelo de datos (MongoDB)

```js
{
  nombre:       String,   // requerido
  descripcion:  String,   // opcional
  fecha:        Date,     // default: now
  esCompletado: Boolean,  // default: false
}
```

---

## 📸 Funcionalidades

- ✅ Agregar items con nombre, descripción y fecha
- ✅ Ver todos los items / solo pendientes / solo completados
- ✅ Marcar items como completados
- ✅ Eliminar items
- ✅ Contador en tiempo real de estadísticas
- ✅ Notificaciones toast

---

*Reto Hackathon Semanal — NodeJS MongoDB*
