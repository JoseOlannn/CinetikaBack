const Pelicula = require('../models/peliculaModel')
const Serie = require('../models/serieModel')

// GET /api/catalogo
const obtenerCatalogo = async (req, res, next) => {
    try {
        const { categoria, genero, nombre } = req.query

        let filtroPelicula = {}
        let filtroSerie = {}

        if (nombre) {
            filtroPelicula.nombre = { $regex: nombre, $options: 'i' }
            filtroSerie.nombre = { $regex: nombre, $options: 'i' }
        }

        if (genero) {
            filtroPelicula.generos = { $regex: genero, $options: 'i' }
            filtroSerie.generos = { $regex: genero, $options: 'i' }
        }

        let peliculas = []
        let series = []

        if (!categoria || categoria === 'pelicula' || categoria === 'cortometraje') {
            if (categoria) {
                filtroPelicula.categoria = categoria.toLowerCase()
            }
            peliculas = await Pelicula.find(filtroPelicula).lean()
        }

        if (!categoria || categoria === 'serie') {
            series = await Serie.find(filtroSerie).lean()
        }

        // Asegurar que cada elemento tenga un id accesible además de _id
        const resultado = [...peliculas, ...series].map(item => ({
            ...item,
            id: item._id.toString()
        }))

        return res.status(200).json(resultado)
    } catch (error) {
        next(error)
    }
}

// GET /api/catalogo/:id
const obtenerContenidoPorId = async (req, res, next) => {
    try {
        const { id } = req.params

        // Buscar primero en Peliculas
        let item = null
        if (/^[0-9a-fA-F]{24}$/.test(id)) {
            item = await Pelicula.findById(id).lean()
            if (!item) {
                item = await Serie.findById(id).lean()
            }
        }

        if (!item) {
            return res.status(404).json({ mensaje: 'Contenido audiovisual no encontrado.' })
        }

        return res.status(200).json({
            ...item,
            id: item._id.toString()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    obtenerCatalogo,
    obtenerContenidoPorId
}

