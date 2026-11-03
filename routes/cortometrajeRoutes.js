const express = require('express')
const router = express.Router()

const {
    obtenerCortometrajes,
    obtenerCortometrajePorId,
    crearCortometraje,
    actualizarCortometraje,
    eliminarCortometraje
} = require('../controllers/cortometrajeController')

router.get('/', obtenerCortometrajes)
router.get('/:id', obtenerCortometrajePorId)
router.post('/', crearCortometraje)
router.put('/:id', actualizarCortometraje)
router.delete('/:id', eliminarCortometraje)

module.exports = router