const Usuario = require('../models/userModel')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Registrar un usuario
const registrarUsuario = async (req, res, next) => {
    try {
        const { nombre, email, password } = req.validated.body

        // Comprobar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ email })

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado.'
            })
        }

        // Generar hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 12)

        // Crear el usuario
        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordHash
        })

        // Responder 
        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente.',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        })

    } catch (error) {
        next(error)
    }
}


// Iniciar sesión
const iniciarSesion = async (req, res, next) => {
    try {
        const { email, password } = req.validated.body

        // Buscar usuario e incluir su contraseña
        const usuario = await Usuario
            .findOne({ email })
            .select('+password')

        // Comprobar si existe el usuario
        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas.'
            })
        }

        // Comparar contraseña recibida con el hash almacenado
        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        )

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas.'
            })
        }

        // Generar JWT
        const token = jwt.sign(
            {
                sub: usuario._id.toString()
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
                algorithm: 'HS256'
            }
        )

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    registrarUsuario,
    iniciarSesion
}