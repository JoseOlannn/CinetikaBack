# 🎬 Cinetika Backend API

Backend REST API para plataforma de exploración de contenido audiovisual (con estética retro ochentera inspirada en el arte pop y la Bauhaus) desarrollado con Node.js, Express y MongoDB Atlas.

## 🎯 Objetivo

Proporcionar endpoints RESTful para gestionar el catálogo de películas y usuarios de la plataforma **Cinetika**, facilitando la integración con el frontend mediante consultas de catálogo, vista de detalles, búsquedas por título y filtros por género y categoría.

## 🚀 Funcionalidades

### Películas
* ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
* ✅ Búsqueda de títulos por nombre (`?nombre=texto`)
* ✅ Filtrado por género y tipo de contenido (`?genero=accion&categoria=pelicula`)
* ✅ Vista de detalles completos (sinopsis, año, géneros, duración, calificación y enlace de video)
* ✅ Soporte para enlaces de reproducción en Vimeo, Pexels o YouTube
* ✅ Respuestas JSON estandarizadas

### Usuarios
* ✅ Listado de usuarios registrados
* ✅ Registro de nuevos usuarios con validación de campos requeridos
* ✅ Respuestas JSON estandarizadas

## 📋 Endpoints Disponibles

### Películas
```text
GET    /api/peliculas                                  - Obtener catálogo completo de películas
GET    /api/peliculas?nombre=texto                     - Buscar títulos por nombre
GET    /api/peliculas?genero=accion&categoria=pelicula - Filtrar por género y categoría
GET    /api/peliculas/:id                              - Obtener detalles de una película específica
POST   /api/peliculas                                  - Crear nueva película
PUT    /api/peliculas/:id                              - Actualizar película existente
DELETE /api/peliculas/:id                              - Eliminar película
```

### Usuarios
```text
GET    /api/usuarios          - Listar todos los usuarios
POST   /api/usuarios          - Crear nuevo usuario
```

## 🛠️ Tecnologías Utilizadas

### Core
* **Node.js** - Runtime de JavaScript
* **Express.js** - Framework web
* **MongoDB Atlas** - Base de datos en la nube
* **Mongoose** - ODM para MongoDB

### Configuración & Middleware
* **CORS** - Cross-Origin Resource Sharing
* **dotenv** - Carga de variables de entorno
* **express.json()** - Parsing de requests en formato JSON

## 📁 Estructura del Proyecto

```text
CinetikaBack/
├── app.js                        # Punto de entrada de la aplicación
├── config/                       # Configuración de base de datos
│   └── database.js               # Conexión a MongoDB con Mongoose
├── controllers/                  # Lógica de negocio
│   ├── peliculaController.js
│   └── userController.js
├── models/                       # Esquemas de MongoDB
│   ├── peliculaModel.js
│   └── userModel.js
├── routes/                       # Definición de rutas
│   ├── peliculaRoutes.js
│   └── userRoutes.js
├── CONTRIBUTING.md               # Reglas de ramas, commits y Pull Requests
└── package.json                  # Dependencias y scripts del proyecto
```

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

## 📊 Modelos de Datos

### Pelicula
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

### Usuario
```javascript
{
  nombre: String (requerido),
  email: String (requerido, único),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔌 Integración Frontend

### Ejemplo de uso con fetch
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

## 🧪 Testing

* **Postman** - Testing de APIs
* **Insomnia** - Cliente REST alternativo

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo con recarga automática (node --watch)
npm start        # Producción
```

## 🔒 Seguridad

* ✅ Validación de campos requeridos en controladores y esquemas Mongoose
* ✅ Sanitización básica de datos (`trim`, `lowercase`)
* ✅ CORS configurado
* ✅ Manejo de errores estandarizado en cada controlador

## 🚀 Próximas Funcionalidades

* [ ] Módulo de Series
* [ ] Módulo de Cortometrajes
* [ ] Módulo de Géneros (`/api/generos`)
* [ ] Autenticación JWT (`/api/auth`)
* [ ] Script de Seed para poblar la base de datos

## 📞 Soporte

Para dudas técnicas o problemas de integración, revisar:

* Logs del servidor
* Respuestas de error de la API
* Configuración de variables de entorno (`.env`)
* Conexión a MongoDB Atlas

---

Desarrollado con ❤️ para **Cinetika**.
