const Pelicula = require('../models/peliculaModel')

// GET - Obtener todas las peliculas o filtrar
const obtenerPeliculas = async (req, res) => {
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

        const peliculas = await Pelicula.find(filtro)
        res.status(200).json(peliculas)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las películas',
            error: error.message
        })
    }
}

// GET - Obtener pelicula por id
const obtenerPeliculaPorId = async (req, res) => {
    try {
        const { id } = req.params
        const pelicula = await Pelicula.findById(id)

        if (!pelicula) {
            return res.status(404).json({
                mensaje: 'Película no encontrada'
            })
        }

        res.status(200).json(pelicula)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la película',
            error: error.message
        })
    }
}

// POST - Crear pelicula
const crearPelicula = async (req, res) => {
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

        const nuevaPelicula = await Pelicula.create({
            nombre,
            categoria: categoria || 'pelicula',
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
            mensaje: 'Película creada exitosamente',
            pelicula: nuevaPelicula
        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la película',
            error: error.message
        })
    }
}

// PUT - Actualizar pelicula
const actualizarPelicula = async (req, res) => {
    try {
        const { id } = req.params
        const peliculaActualizada = await Pelicula.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!peliculaActualizada) {
            return res.status(404).json({
                mensaje: 'Película no encontrada'
            })
        }

        res.status(200).json({
            mensaje: 'Película actualizada exitosamente',
            pelicula: peliculaActualizada
        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la película',
            error: error.message
        })
    }
}

// DELETE - Eliminar pelicula
const eliminarPelicula = async (req, res) => {
    try {
        const { id } = req.params
        const peliculaEliminada = await Pelicula.findByIdAndDelete(id)

        if (!peliculaEliminada) {
            return res.status(404).json({
                mensaje: 'Película no encontrada'
            })
        }

        res.status(200).json({
            mensaje: 'Película eliminada exitosamente'
        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la película',
            error: error.message
        })
    }
}

module.exports = {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula
}
