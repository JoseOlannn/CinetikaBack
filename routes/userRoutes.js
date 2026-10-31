const express = require('express')
const router = express.Router()

const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/userController')

router.get('/', obtenerUsuarios)
router.get('/:id', obtenerUsuarioPorId)
router.put('/:id', actualizarUsuario)
router.delete('/:id', eliminarUsuario)

module.exports = router
