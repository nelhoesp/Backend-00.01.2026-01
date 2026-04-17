# 🚀 HACKATHON SEMANAL

## 🎯 LOGRO

Utilizar **Node.js, TypeScript y MongoDB** para desarrollar una aplicación web funcional.

---

## I. 🧠 Es hora de demostrar lo aprendido

En este reto demostrarás los conocimientos adquiridos durante la semana, aplicando:

- TypeScript en Node.js
- Manejo de APIs con Express
- Uso de MongoDB como base de datos

---

## II. 📦 Insumos para resolver el reto

- Conocimientos de semanas anteriores
- Node.js
- TypeScript
- Express.js
- MongoDB / Mongoose
- Postman o Insomnia

---

## III. 📋 Descripción del reto

Desarrollar una aplicación web que permita administrar una **lista de compras**.

La aplicación debe permitir:

- Registrar ítems
- Consultar pendientes
- Consultar completados
- Marcar ítems como completados

Además, se deben aplicar buenas prácticas:

- Tipado con TypeScript
- Separación de responsabilidades
- Uso de modelos y controladores
- Validación básica

---

## IV. 🛠️ Pasos a seguir

1. Definir si el trabajo será individual o grupal
2. Diseñar la estructura del proyecto
3. Configurar Node.js + TypeScript
4. Conectar MongoDB
5. Crear endpoints
6. Probar con Postman/Insomnia
7. Preparar presentación

---

# 🧩 RETO 1

## 🏷️ TÍTULO

**Lista de Compras con Node.js, TypeScript y MongoDB**

---

## 📝 Enunciado

Crear una API usando **Express + TypeScript** que gestione una lista de compras.

Cada ítem debe tener:

- `nombre`
- `descripcion`
- `fecha`
- `esCompletado`

---

## ✅ Requerimientos mínimos

### 1. Crear ítem

Ruta para registrar un nuevo elemento en MongoDB.

### 2. Ver pendientes

Mostrar solo ítems no completados.

### 3. Ver completados

Mostrar solo ítems completados.

### 4. Completar ítem

Actualizar estado de pendiente → completado.

---

## ⚙️ Requisitos técnicos

- Proyecto en **TypeScript**
- Uso de **Express**
- Uso de **MongoDB**
- Uso de **Mongoose** (opcional pero recomendado)
- Estructura organizada:

```
src/
  ├── models/
  ├── routes/
  ├── controllers/
  ├── config/
  └── app.ts
```

- Manejo básico de errores
- Código tipado correctamente

---

## 🌐 Endpoints sugeridos

### Crear ítem

```
POST /items
```

### Ver pendientes

```
GET /items/pending
```

### Ver completados

```
GET /items/completed
```

### Completar ítem

```
PATCH /items/:id/complete
```

---

## 🧾 Ejemplo de request

```json
{
  "nombre": "Comprar leche",
  "descripcion": "Leche deslactosada",
  "fecha": "2026-04-10",
  "esCompletado": false
}
```

---

## 🎯 Criterios de evaluación

El reto estará completo si:

- ✅ Proyecto configurado con TypeScript
- ✅ Conexión exitosa a MongoDB
- ✅ CRUD básico funcionando
- ✅ Rutas implementadas correctamente
- ✅ Código organizado
- ✅ Aplicación funcional

---

## 🎤 Presentación

Cada equipo o estudiante deberá explicar:

- Estructura del proyecto
- Conexión a MongoDB
- Endpoints creados
- Uso de TypeScript

Tiempo definido por el docente.

---

## 💬 Feedback

El docente evaluará:

- Lógica implementada
- Uso de TypeScript
- Buenas prácticas
- Funcionamiento

---

## ⭐ Bonus (Opcional)

Puedes sumar puntos extra implementando:

- 🗑️ Eliminar ítems
- ✏️ Editar ítems
- 📅 Filtro por fecha
- 🔐 Variables de entorno (.env)
- 🧪 Middleware de logs
- 🌐 Interfaz web simple
- 🚀 Scripts `dev` y `build`

---

## 📦 Entregables

- Código fuente
- README.md con instrucciones
- Pruebas (Postman/Insomnia)
- Capturas o demo funcionando

---

🔥 **Tip:** Usa `ts-node-dev` para desarrollo rápido y `dotenv` para configuración.
