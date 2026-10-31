const express = require('express')
const router = express.Router()

const {
    obtenerCatalogo,
    obtenerContenidoPorId
} = require('../controllers/catalogoController')

router.get('/', obtenerCatalogo)
router.get('/:id', obtenerContenidoPorId)

module.exports = router

