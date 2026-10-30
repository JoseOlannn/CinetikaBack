const express = require('express')
const router = express.Router()

const {
    registrarUsuario,
    iniciarSesion
} = require('../controllers/authController.js')


const validar = require('../middlewares/validar.middleware.js')

const {
    registroSchema,
    loginSchema
} = require('../validations/authValidations.js')


// Registrar usuario
router.post(
    '/register',
    validar(registroSchema, 'body'),
    registrarUsuario
)


// Iniciar sesión
router.post(
    '/login',
    validar(loginSchema, 'body'),
    iniciarSesion
)




module.exports = router