const Cortometraje = require('../models/cortometrajeModel')

// GET - Obtener todos los cortometrajes o filtrar
const obtenerCortometrajes = async (req, res) => {
    try {
        const { nombre, genero, categoria } = req.query
        let filtro = {}

        if (nombre) {
            filtro.nombre = { $regex: nombre, $options: 'i' }
        }

        if (genero) {
            filtro.generos = { $regex: genero, $options: 'i' }
        }

        if (categoria) {
            filtro.categoria = categoria.toLowerCase()
        }

        const cortometrajes = await Cortometraje.find(filtro)
        res.status(200).json(cortometrajes)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los cortometrajes',
            error: error.message
        })
    }
}

// GET - Obtener cortometraje por id
const obtenerCortometrajePorId = async (req, res) => {
    try {
        const { id } = req.params
        const cortometraje = await Cortometraje.findById(id)

        if (!cortometraje) {
            return res.status(404).json({
                mensaje: 'Cortometraje no encontrado'
            })
        }

        res.status(200).json(cortometraje)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el cortometraje',
            error: error.message
        })
    }
}

// POST - Crear cortometraje
const crearCortometraje = async (req, res) => {
    try {
        const {
            nombre,
            categoria,
            anio,
            poster,
            banner,
            sinopsis,
            duracion,
            generos,
            calificacion,
            videoUrl
        } = req.body

        if (!nombre || !anio || !poster || !sinopsis || !duracion || !generos) {
            return res.status(400).json({
                mensaje: 'Todos los campos obligatorios deben ser completados'
            })
        }

        const nuevoCortometraje = await Cortometraje.create({
            nombre,
            categoria: categoria || 'cortometraje',
            anio,
            poster,
            banner: banner || '',
            sinopsis,
            duracion,
            generos,
            calificacion: calificacion || 0,
            videoUrl: videoUrl || ''
        })

        res.status(201).json({
            mensaje: 'Cortometraje creado exitosamente',
            cortometraje: nuevoCortometraje
        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el cortometraje',
            error: error.message
        })
    }
}

// PUT - Actualizar cortometraje
const actualizarCortometraje = async (req, res) => {
    try {
        const { id } = req.params
        const cortometrajeActualizado = await Cortometraje.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!cortometrajeActualizado) {
            return res.status(404).json({
                mensaje: 'Cortometraje no encontrado'
            })
        }

        res.status(200).json({
            mensaje: 'Cortometraje actualizado exitosamente',
            cortometraje: cortometrajeActualizado
        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el cortometraje',
            error: error.message
        })
    }
}

// DELETE - Eliminar cortometraje
const eliminarCortometraje = async (req, res) => {
    try {
        const { id } = req.params
        const cortometrajeEliminado = await Cortometraje.findByIdAndDelete(id)

        if (!cortometrajeEliminado) {
            return res.status(404).json({
                mensaje: 'Cortometraje no encontrado'
            })
        }

        res.status(200).json({
            mensaje: 'Cortometraje eliminado exitosamente'
        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el cortometraje',
            error: error.message
        })
    }
}

module.exports = {
    obtenerCortometrajes,
    obtenerCortometrajePorId,
    crearCortometraje,
    actualizarCortometraje,
    eliminarCortometraje
}