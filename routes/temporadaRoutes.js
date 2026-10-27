
const express = require('express')
const router = express.Router()

const {
    obtenerTemporadas,
    obtenerTemporadaPorId,
    crearTemporada,
    reemplazarTemporada,
    actualizarTemporada,
    eliminarTemporada
} = require('../controllers/temporadaController')

const {
    obtenerEpisodiosDeTemporada
} = require('../controllers/episodioController')

const validar = require('../middlewares/validar.middleware')

const {
    idSchema,
    temporadaIdParamsSchema,
    crearTemporadaSchema,
    reemplazarTemporadaSchema,
    actualizarTemporadaSchema,
    buscarTemporadasSchema
} = require('../validations/temporadaValidation')

const {
    buscarEpisodiosSchema
} = require('../validations/episodioValidation')

// GET /api/temporadas?serieId=...&page=1&limit=20
router.get(
    '/',
    validar(buscarTemporadasSchema, 'query'),
    obtenerTemporadas
)

// GET /api/temporadas/:temporadaId/episodios
router.get(
    '/:temporadaId/episodios',
    validar(temporadaIdParamsSchema, 'params'),
    validar(
        buscarEpisodiosSchema.omit({ temporadaId: true }),
        'query'
    ),
    obtenerEpisodiosDeTemporada
)

router.get(
    '/:id',
    validar(idSchema, 'params'),
    obtenerTemporadaPorId
)

router.post(
    '/',
    validar(crearTemporadaSchema, 'body'),
    crearTemporada
)

router.put(
    '/:id',
    validar(idSchema, 'params'),
    validar(reemplazarTemporadaSchema, 'body'),
    reemplazarTemporada
)

router.patch(
    '/:id',
    validar(idSchema, 'params'),
    validar(actualizarTemporadaSchema, 'body'),
    actualizarTemporada
)

router.delete(
    '/:id',
    validar(idSchema, 'params'),
    eliminarTemporada
)

module.exports = router
