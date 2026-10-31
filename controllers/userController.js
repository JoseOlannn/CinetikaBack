const Usuario = require('../models/userModel')
const bcrypt = require('bcryptjs')

// GET: Obtener todos los usuarios
const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find().select('-password')
        return res.status(200).json(usuarios)
    } catch (error) {
        next(error)
    }
}

// GET: Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params
        const usuario = await Usuario.findById(id).select('-password')

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' })
        }

        return res.status(200).json({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            foto_perfil: usuario.foto_perfil || ''
        })
    } catch (error) {
        next(error)
    }
}

// PUT: Actualizar perfil de usuario
const actualizarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params
        const { nombre, foto_perfil, password } = req.body

        const actualizacion = {}

        if (nombre && typeof nombre === 'string') {
            if (nombre.trim().length < 2) {
                return res.status(400).json({ mensaje: 'El nombre debe tener al menos 2 caracteres.' })
            }
            actualizacion.nombre = nombre.trim()
        }

        if (foto_perfil !== undefined) {
            actualizacion.foto_perfil = foto_perfil
        }

        if (password && typeof password === 'string') {
            if (password.length < 8) {
                return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres.' })
            }
            actualizacion.password = await bcrypt.hash(password, 12)
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            id,
            { $set: actualizacion },
            { new: true, runValidators: true }
        ).select('-password')

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' })
        }

        return res.status(200).json({
            mensaje: 'Perfil actualizado correctamente.',
            usuario: {
                id: usuarioActualizado._id,
                nombre: usuarioActualizado.nombre,
                email: usuarioActualizado.email,
                foto_perfil: usuarioActualizado.foto_perfil || ''
            }
        })
    } catch (error) {
        next(error)
    }
}

// DELETE: Eliminar cuenta de usuario
const eliminarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params
        const usuarioEliminado = await Usuario.findByIdAndDelete(id)

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' })
        }

        return res.status(200).json({
            mensaje: 'Cuenta eliminada correctamente.'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
}
