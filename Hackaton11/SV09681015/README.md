# 🏭 Fábrica de Armarios — Sistema de Gestión
**Hackathon 11 Semanal — Mongoose ORM**  
**Base de datos:** `sv09681015` (código de alumno)

---

## 📐 Lógica de Negocio (Ratios)

| Módulo        | Ratio         | Descripción                           |
|---------------|---------------|---------------------------------------|
| Materia Prima | **3 : 1**     | 1 unidad comprada → 3 tablones        |
| Insumos       | **1 : 0.25**  | 1 unidad comprada → 0.25 kg goma      |
| Personal      | **40 : 8**    | 40 hrs/semana ÷ 8 hrs/día = 5 días    |
| Producción    | **1 armario** | = 1 tablón + 0.25 kg goma + 8 HH      |

---

## 🗂️ Modelos Mongoose (`/models`)

```
MateriaPrima.js  ← pre-save: tablones = cantidad × 3
Insumo.js        ← pre-save: goma_kg  = cantidad × 0.25
Personal.js      ← pre-save: diasSemana = horasSemana / horasDiarias
Produccion.js    ← pre-save: tablones × armarios, goma × armarios, HH × armarios
```

---

## 🗺️ Rutas API REST

| Método    | Ruta                          | Descripción                       |
|-----------|-------------------------------|-----------------------------------|
| POST      | `/api/materia-prima`          | Registrar compra materia prima    |
| GET       | `/api/materia-prima`          | Listar compras                    |
| DELETE    | `/api/materia-prima/:id`      | Eliminar registro                 |
| POST      | `/api/insumos`                | Registrar compra insumos          |
| GET       | `/api/insumos`                | Listar insumos                    |
| POST      | `/api/personal`               | Registrar empleado                |
| GET       | `/api/personal`               | Listar personal                   |
| PATCH     | `/api/personal/:id/estado`    | Activar/dar baja                  |
| POST      | `/api/produccion`             | Crear lote de producción          |
| GET       | `/api/produccion`             | Listar lotes                      |
| PATCH     | `/api/produccion/:id/estado`  | Cambiar estado del lote           |
| GET       | `/api/dashboard`              | Resumen general                   |

---

## ▶️ Instalación

```bash
npm install

# Configurar .env
.env
# Editar MONGO_URI con tus credenciales de Atlas

npm start
# → http://localhost:3001
```

---

## 📦 Colecciones en MongoDB (`sv09681015`)

- `materiaprimas`
- `insumos`
- `personals`
- `produccions`
