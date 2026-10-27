# 🎬 Cinetika Backend API

Backend REST API para plataforma de exploración de contenido audiovisual (con estética retro ochentera inspirada en el arte pop y la Bauhaus) desarrollado con **Node.js**, **Express** y **MongoDB Atlas**.

---

## 🎯 Objetivo

Proporcionar endpoints RESTful para gestionar el catálogo de **películas**, **series**, **temporadas**, **episodios** y **usuarios** de la plataforma **Cinetika**, facilitando la integración con el frontend mediante:

- Consultas de catálogo.
- Vista de detalles.
- Búsquedas por título.
- Filtros por género y categoría.
- Navegación jerárquica del contenido seriado (serie → temporadas → episodios).

---

## 🚀 Funcionalidades

### 🎞️ Películas
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar).
- ✅ Búsqueda de títulos por nombre (`?nombre=texto`).
- ✅ Filtrado por género y tipo de contenido (`?genero=accion&categoria=pelicula`).
- ✅ Vista de detalles completos (sinopsis, año, géneros, duración, calificación y enlace de video).
- ✅ Soporte para enlaces de reproducción en Vimeo, Pexels o YouTube.
- ✅ Respuestas JSON estandarizadas.

### 📺 Series
- ✅ CRUD completo (crear, consultar, actualizar y eliminar).
- ✅ Búsqueda por nombre mediante `?nombre=texto`.
- ✅ Filtrado por género mediante `?genero=misterio`.
- ✅ Consulta de temporadas pertenecientes a una serie.
- ✅ Validación de identificadores y datos recibidos.

### 🗂️ Temporadas
- ✅ CRUD completo.
- ✅ Filtrado por serie mediante `?serieId=ID`.
- ✅ Consulta de episodios pertenecientes a una temporada.
- ✅ Paginación de resultados.
- ✅ Prevención de eliminación cuando existen episodios asociados.

### 🎬 Episodios
- ✅ CRUD completo.
- ✅ Filtrado por temporada mediante `?temporadaId=ID`.
- ✅ Paginación de resultados.
- ✅ Validación de título, número, duración y otros campos.
- ✅ Restricción de números de episodio duplicados dentro de una misma temporada.

### 👤 Usuarios
- ✅ Listado de usuarios registrados.
- ✅ Registro de nuevos usuarios con validación de campos requeridos.
- ✅ Respuestas JSON estandarizadas.

---

## 📋 Endpoints Disponibles

La API utiliza la siguiente URL base durante el desarrollo:

```text
http://localhost:4000
```

### 🎞️ Películas

```text
GET    /api/peliculas                                  - Obtener catálogo completo de películas
GET    /api/peliculas?nombre=texto                     - Buscar títulos por nombre
GET    /api/peliculas?genero=accion&categoria=pelicula - Filtrar por género y categoría
GET    /api/peliculas/:id                              - Obtener detalles de una película específica
POST   /api/peliculas                                  - Crear nueva película
PUT    /api/peliculas/:id                              - Actualizar película existente
DELETE /api/peliculas/:id                              - Eliminar película
```

### 📺 Series

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/series` | Obtener el catálogo de series |
| GET | `/api/series?nombre=stranger` | Buscar series por nombre |
| GET | `/api/series?genero=misterio` | Filtrar series por género |
| GET | `/api/series/:id` | Obtener una serie por ID |
| POST | `/api/series` | Crear una serie |
| PUT | `/api/series/:id` | Reemplazar los campos editables de una serie |
| PATCH | `/api/series/:id` | Actualizar parcialmente una serie |
| DELETE | `/api/series/:id` | Eliminar una serie |
| GET | `/api/series/:serieId/temporadas` | Consultar las temporadas de una serie |

Los filtros de nombre y género pueden combinarse si ambos están contemplados en la consulta del controlador.

Ejemplo:

```http
GET /api/series?nombre=stranger&genero=misterio
```

### 🗂️ Temporadas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/temporadas` | Obtener temporadas con paginación |
| GET | `/api/temporadas?serieId=:serieId` | Filtrar temporadas por serie |
| GET | `/api/temporadas/:id` | Obtener una temporada por ID |
| POST | `/api/temporadas` | Crear una temporada |
| PUT | `/api/temporadas/:id` | Reemplazar los campos editables de una temporada |
| PATCH | `/api/temporadas/:id` | Actualizar parcialmente una temporada |
| DELETE | `/api/temporadas/:id` | Eliminar una temporada |
| GET | `/api/temporadas/:temporadaId/episodios` | Consultar episodios de una temporada |

Ejemplo:

```http
GET /api/temporadas?serieId=ID_DE_LA_SERIE&page=1&limit=20
```

### 🎬 Episodios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/episodios` | Obtener episodios con paginación |
| GET | `/api/episodios?temporadaId=:temporadaId` | Filtrar episodios por temporada |
| GET | `/api/episodios/:id` | Obtener un episodio por ID |
| POST | `/api/episodios` | Crear un episodio |
| PUT | `/api/episodios/:id` | Reemplazar los campos editables de un episodio |
| PATCH | `/api/episodios/:id` | Actualizar parcialmente un episodio |
| DELETE | `/api/episodios/:id` | Eliminar un episodio |

Ejemplo:

```http
GET /api/episodios?temporadaId=ID_DE_LA_TEMPORADA&page=1&limit=20
```

> Los valores `:id`, `:serieId` y `:temporadaId` son marcadores de posición. Deben sustituirse por identificadores reales de MongoDB.

### 👤 Usuarios

```text
GET    /api/usuarios          - Listar todos los usuarios
POST   /api/usuarios          - Crear nuevo usuario
```

---

## 🛠️ Tecnologías Utilizadas

### Core
- **Node.js** – Runtime de JavaScript.
- **Express.js** – Framework web.
- **MongoDB Atlas** – Base de datos en la nube.
- **Mongoose** – ODM para MongoDB.
- **Zod** – Validación de esquemas de entrada.

### Configuración & Middleware
- **CORS** – Cross-Origin Resource Sharing.
- **dotenv** – Carga de variables de entorno.
- **express.json()** – Parsing de requests en formato JSON.

---

## 📁 Estructura del Proyecto

```text
CinetikaBack/
├── app.js                        # Punto de entrada de la aplicación
├── config/
│   └── database.js               # Conexión a MongoDB con Mongoose
├── controllers/
│   ├── peliculaController.js
│   ├── userController.js
│   ├── serieController.js
│   ├── temporadaController.js
│   └── episodioController.js
├── middlewares/
│   ├── validar.middleware.js
│   └── error.middleware.js
├── models/
│   ├── peliculaModel.js
│   ├── userModel.js
│   ├── serieModel.js
│   ├── temporadaModel.js
│   └── episodioModel.js
├── routes/
│   ├── peliculaRoutes.js
│   ├── userRoutes.js
│   ├── serieRoutes.js
│   ├── temporadaRoutes.js
│   └── episodioRoutes.js
├── validations/
│   ├── serieValidation.js
│   ├── temporadaValidation.js
│   └── episodioValidation.js
├── CONTRIBUTING.md               # Reglas de ramas, commits y Pull Requests
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🔧 Instalación y Configuración

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/JoseOlannn/Cinetika.git
cd CinetikaBack
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz:

```env
PORT=4000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/cinetika_db
DEFAULT_PROFILE_IMAGE=/assets/avatars/default-retro-bauhaus.png
```

### 3. Iniciar servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

---

## 📊 Modelos de Datos

### 🎞️ Pelicula

```javascript
{
  nombre: String (requerido),
  categoria: String (default: 'pelicula'),
  anio: Number (requerido),
  poster: String (requerido, URL o ruta de imagen),
  sinopsis: String (requerido),
  duracion: String (requerido, ej: "117 min"),
  generos: [String] (requerido, ej: ["Ciencia Ficción", "Acción"]),
  calificacion: Number (default: 0, min: 0, max: 5),
  videoUrl: String (URL de Vimeo / Pexels / YouTube),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### 📺 Serie

Los campos editables de la serie se documentan en `models/serieModel.js`. Incluye, entre otros, nombre, géneros, sinopsis y demás metadatos descriptivos del catálogo seriado.

### 🗂️ Temporada

| Campo | Tipo | Descripción |
|---|---|---|
| `serieId` | ObjectId | Referencia a la serie a la que pertenece |
| `numero` | Number | Número de temporada, entero mayor o igual a 1 |
| `nombre` | String | Nombre de la temporada |
| `anioEstreno` | Number | Año de estreno, opcional |
| `sinopsis` | String | Descripción de la temporada |
| `createdAt` | Date | Fecha de creación automática |
| `updatedAt` | Date | Fecha de última actualización automática |

> La combinación de `serieId` y `numero` es **única**. Una serie no puede tener dos temporadas con el mismo número.

### 🎬 Episodio

| Campo | Tipo | Descripción |
|---|---|---|
| `temporadaId` | ObjectId | Referencia a la temporada |
| `numero` | Number | Número de episodio |
| `titulo` | String | Título del episodio |
| `duracion` | Number | Duración en minutos |
| `sinopsis` | String | Descripción del episodio |
| `fechaEstreno` | Date | Fecha de estreno, opcional |
| `videoUrl` | String | Enlace de reproducción |
| `createdAt` | Date | Fecha de creación automática |
| `updatedAt` | Date | Fecha de última actualización automática |

> La combinación de `temporadaId` y `numero` es **única**. No se puede repetir el número de episodio dentro de una misma temporada.

### 👤 Usuario

```javascript
{
  nombre: String (requerido),
  email: String (requerido, único),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

> Los campos indicados representan los modelos trabajados en el proyecto. Para conocer todas las restricciones y valores predeterminados, consulta los archivos de `models/`.

---

## 🔗 Relaciones entre Modelos

```text
Serie  ──1:N──▶  Temporada  ──1:N──▶  Episodio
```

- Una **serie** puede tener muchas **temporadas** (`serieId`).
- Una **temporada** puede tener muchos **episodios** (`temporadaId`).
- No se permite eliminar una temporada si tiene episodios asociados.
- No se permite repetir `numero` de temporada dentro de una misma serie.
- No se permite repetir `numero` de episodio dentro de una misma temporada.

---

## 📄 Paginación y Límites

Los endpoints de listado de **temporadas** y **episodios** admiten los parámetros `page` y `limit`.

| Parámetro | Valor predeterminado | Restricciones |
|---|---:|---|
| `page` | `1` | Entero mayor o igual a 1 |
| `limit` | `20` | Entero entre 1 y 100 |

- **`page`** indica la página que se quiere consultar.
- **`limit`** indica el máximo de documentos solicitados por página.
- Si no se envían, se utilizan `page=1` y `limit=20`.
- Los filtros pueden combinarse con los parámetros de paginación.

Ejemplo:

```http
GET /api/temporadas?page=2&limit=10
```

### Estructura de la respuesta paginada

```json
{
  "data": [
    {
      "_id": "ID_DEL_DOCUMENTO",
      "numero": 1,
      "nombre": "Temporada 1"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

### Significado de los metadatos

- `data`: documentos devueltos por la consulta.
- `pagination.page`: página actual.
- `pagination.limit`: tamaño de página solicitado.
- `pagination.total`: total de documentos que coinciden con los filtros.
- `pagination.totalPages`: cantidad de páginas disponibles.

> El límite máximo configurado es de **100 documentos por página** para los esquemas de búsqueda de temporadas y episodios. La paginación de series debe documentarse de acuerdo con el esquema y el controlador de series implementados en el proyecto.

---

## 🛡️ Middlewares y Validaciones

### `validar.middleware.js`

Middleware reutilizable que recibe un esquema de **Zod** y la propiedad de la petición que se desea validar: `body`, `params` o `query`.

Funcionamiento:

1. Recibe los datos de la petición.
2. Ejecuta `safeParse()` con el esquema correspondiente.
3. Si la validación falla, responde con HTTP `400` e informa los campos inválidos.
4. Si la validación tiene éxito, guarda los datos validados en `req.validated`.
5. Continúa hacia el siguiente middleware o controlador mediante `next()`.

Los datos validados se almacenan en propiedades como:

```javascript
req.validated.body
req.validated.params
req.validated.query
```

> Los controladores deben utilizar esos datos validados cuando corresponda.

### Esquemas de Zod

Los archivos de `validations/` definen las reglas de entrada de cada módulo. Entre las validaciones implementadas se encuentran:

- Formato de los identificadores de MongoDB.
- Números enteros y valores mínimos.
- Longitud y obligatoriedad de textos.
- Límites de paginación.
- Campos requeridos para crear o reemplazar documentos.
- Actualizaciones parciales que requieren al menos un campo.
- Formato de fechas en las entradas de episodios.

### `error.middleware.js`

Centraliza el tratamiento de errores que llegan al middleware de errores de Express. Contempla casos como:

- **`ValidationError` de Mongoose:** datos que incumplen las reglas del modelo.
- **`CastError`:** valor que Mongoose no puede convertir al tipo esperado.
- **Código `11000`:** conflicto por un valor duplicado en un índice único.
- **Errores inesperados:** respuesta genérica de servidor.

Según el error, el middleware devuelve códigos HTTP como `400`, `409` o `500`.

> Para gestionar los errores enviados mediante `next(error)`, debe registrarse **después** de las rutas.

### Validación en dos niveles

Zod valida los datos de entrada antes de ejecutar el controlador. Mongoose, por su parte, aplica las reglas definidas en los esquemas al guardar o modificar documentos.

Ambas capas se complementan, pero no sustituyen las comprobaciones de relaciones que realiza la lógica de negocio (por ejemplo, verificar que una serie o una temporada exista antes de crear una temporada o un episodio).

---

## 🔌 Integración Frontend

### Ejemplo de uso con `fetch`

```javascript
// Obtener catálogo de películas
const response = await fetch('http://localhost:4000/api/peliculas');
const peliculas = await response.json();

// Buscar películas por nombre
const busqueda = await fetch('http://localhost:4000/api/peliculas?nombre=Blade');
const resultados = await busqueda.json();

// Filtrar películas por género y categoría
const filtradas = await fetch(
  'http://localhost:4000/api/peliculas?genero=Acción&categoria=pelicula'
);

// Obtener series con filtros combinados
const series = await fetch(
  'http://localhost:4000/api/series?nombre=stranger&genero=misterio'
);

// Temporadas de una serie con paginación
const temporadas = await fetch(
  'http://localhost:4000/api/series/ID_SERIE/temporadas?page=1&limit=10'
);

// Episodios de una temporada con paginación
const episodios = await fetch(
  'http://localhost:4000/api/episodios?temporadaId=ID_TEMPORADA&page=1&limit=20'
);

// Crear nueva película
const nuevaPelicula = await fetch('http://localhost:4000/api/peliculas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Blade Runner',
    categoria: 'pelicula',
    anio: 1982,
    poster: '/assets/posters/blade-runner-1982.jpg',
    sinopsis: 'En un futuro distópico, el ex policía Rick Deckard es llamado para rastrear y retirar a cuatro replicantes.',
    duracion: '117 min',
    generos: ['Ciencia Ficción', 'Acción'],
    calificacion: 4.8,
    videoUrl: 'https://vimeo.com/ejemplo'
  })
});
```

---

## 🧪 Testing

- **Postman** – Testing de APIs.
- **Insomnia** – Cliente REST alternativo.

---

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo con recarga automática (node --watch)
npm start        # Producción
```

---

## 🔒 Seguridad

- ✅ Validación de campos requeridos en controladores y esquemas Mongoose.
- ✅ Validación de entrada con **Zod** (`body`, `params` y `query`).
- ✅ Sanitización básica de datos (`trim`, `lowercase`).
- ✅ CORS configurado.
- ✅ Manejo de errores estandarizado y centralizado.
- ✅ Restricciones de unicidad en índices compuestos (temporadas y episodios).

---

## 🚀 Próximas Funcionalidades

- [ ] Módulo de Cortometrajes.
- [ ] Módulo de Géneros (`/api/generos`).
- [ ] Autenticación JWT (`/api/auth`).
- [ ] Script de Seed para poblar la base de datos.
- [ ] Documentación de paginación del módulo de series.
- [ ] Tests automatizados (Jest / Supertest).

---

## 📞 Soporte

Para dudas técnicas o problemas de integración, revisar:

- Logs del servidor.
- Respuestas de error de la API.
- Configuración de variables de entorno (`.env`).
- Conexión a MongoDB Atlas.
- Esquemas de validación en `validations/` y modelos en `models/`.

---

Desarrollado con ❤️ para **Cinetika**.