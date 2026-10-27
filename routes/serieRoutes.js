
const express = require('express')
const router = express.Router()

// Controladores de series.
const {
    obtenerSeries,
    obtenerSeriePorId,
    crearSerie,
    reemplazarSerie,
    actualizarSerie,
    eliminarSerie
} = require('../controllers/serieController')

// Controlador para consultar las temporadas de una serie.
const {
    obtenerTemporadasDeSerie
} = require('../controllers/temporadaController')

// Middleware de validación.
const validar = require('../middlewares/validar.middleware')

// Validaciones de series.
const {
    idSchema,
    crearSerieSchema,
    reemplazarSerieSchema,
    actualizarSerieSchema,
    buscarSeriesSchema
} = require('../validations/serieValidation')

// Validaciones para consultar temporadas.
const {
    serieIdParamsSchema,
    buscarTemporadasSchema
} = require('../validations/temporadaValidation')

// GET /api/series?nombre=stranger&genero=misterio&page=1&limit=20
router.get(
    '/',
    validar(buscarSeriesSchema, 'query'),
    obtenerSeries
)

// GET /api/series/:serieId/temporadas?page=1&limit=20
router.get(
    '/:serieId/temporadas',
    validar(serieIdParamsSchema, 'params'),
    validar(
        buscarTemporadasSchema.omit({ serieId: true }),
        'query'
    ),
    obtenerTemporadasDeSerie
)

// GET /api/series/:id
router.get(
    '/:id',
    validar(idSchema, 'params'),
    obtenerSeriePorId
)

// POST /api/series
router.post(
    '/',
    validar(crearSerieSchema, 'body'),
    crearSerie
)

// PUT /api/series/:id
router.put(
    '/:id',
    validar(idSchema, 'params'),
    validar(reemplazarSerieSchema, 'body'),
    reemplazarSerie
)

// PATCH /api/series/:id
router.patch(
    '/:id',
    validar(idSchema, 'params'),
    validar(actualizarSerieSchema, 'body'),
    actualizarSerie
)

// DELETE /api/series/:id
router.delete(
    '/:id',
    validar(idSchema, 'params'),
    eliminarSerie
)

module.exports = router
