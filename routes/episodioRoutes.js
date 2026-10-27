
const express = require('express')
const router = express.Router()

// Importamos los controladores que contienen la lógica
// para consultar, crear, reemplazar, actualizar y eliminar episodios.
const {
    obtenerEpisodios,
    obtenerEpisodioPorId,
    crearEpisodio,
    reemplazarEpisodio,
    actualizarEpisodio,
    eliminarEpisodio
} = require('../controllers/episodioController')

// Importamos el middleware encargado de validar los datos
// recibidos en los parámetros, el cuerpo y la consulta de la petición.
const validar = require('../middlewares/validar.middleware')

// Importamos los esquemas de Zod que definen
// qué datos son válidos para cada operación.
const {
    idSchema,
    crearEpisodioSchema,
    reemplazarEpisodioSchema,
    actualizarEpisodioSchema,
    buscarEpisodiosSchema
} = require('../validations/episodioValidation')

// GET /api/episodios?page=1&limit=20
// Obtiene la lista de episodios con paginación.
// También permite filtrar por temporadaId.
router.get(
    '/',
    validar(buscarEpisodiosSchema, 'query'),
    obtenerEpisodios
)

// GET /api/episodios/:id
// Busca un episodio específico utilizando su ID de MongoDB.
// Primero valida el parámetro id y después ejecuta el controlador.
router.get(
    '/:id',
    validar(idSchema, 'params'),
    obtenerEpisodioPorId
)

// POST /api/episodios
// Crea un episodio nuevo.
// El cuerpo de la petición debe cumplir con crearEpisodioSchema.
router.post(
    '/',
    validar(crearEpisodioSchema, 'body'),
    crearEpisodio
)

// PUT /api/episodios/:id
// Reemplaza los datos editables de un episodio existente.
// Valida tanto el ID como el cuerpo completo requerido para PUT.
router.put(
    '/:id',
    validar(idSchema, 'params'),
    validar(reemplazarEpisodioSchema, 'body'),
    reemplazarEpisodio
)

// PATCH /api/episodios/:id
// Actualiza parcialmente un episodio.
// Solo necesita los campos que se desean modificar,
// pero debe incluir al menos un campo válido.
router.patch(
    '/:id',
    validar(idSchema, 'params'),
    validar(actualizarEpisodioSchema, 'body'),
    actualizarEpisodio
)

// DELETE /api/episodios/:id
// Elimina el episodio identificado por el ID proporcionado.
// Si el ID no es válido, el controlador no llega a ejecutarse.
router.delete(
    '/:id',
    validar(idSchema, 'params'),
    eliminarEpisodio
)

// Exportamos el router para registrarlo en app.js.
module.exports = router
