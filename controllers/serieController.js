
const Serie = require('../models/serieModel')

// GET /api/series
const obtenerSeries = async (req, res, next) => {
    try {
        const { nombre, genero } = req.validated.query
        const filtros = {}

        if (nombre) {
            filtros.nombre = { $regex: nombre, $options: 'i' }
        }

        if (genero) {
            filtros.generos = { $regex: genero, $options: 'i' }
        }

        const series = await Serie.find(filtros)

        return res.status(200).json(series)
    } catch (error) {
        next(error)
    }
}

// GET /api/series/:id
const obtenerSeriePorId = async (req, res, next) => {
    try {
        const { id } = req.validated.params
        const serie = await Serie.findById(id)

        if (!serie) {
            return res.status(404).json({
                mensaje: 'Serie no encontrada.'
            })
        }

        return res.status(200).json(serie)
    } catch (error) {
        next(error)
    }
}

// POST /api/series
const crearSerie = async (req, res, next) => {
    try {
        const nuevaSerie = new Serie(req.validated.body)
        const serieGuardada = await nuevaSerie.save()

        return res.status(201).json({
            mensaje: 'Serie creada correctamente.',
            serie: serieGuardada
        })
    } catch (error) {
        next(error)
    }
}

// PUT /api/series/:id
// Sustituye todos los campos editables de la serie.
const reemplazarSerie = async (req, res, next) => {
    try {
        const { id } = req.validated.params
        const datos = req.validated.body

        const serie = await Serie.findById(id)

        if (!serie) {
            return res.status(404).json({
                mensaje: 'Serie no encontrada.'
            })
        }

        // Sustituye todos los campos editables.
        serie.nombre = datos.nombre
        serie.anio = datos.anio
        serie.poster = datos.poster
        serie.sinopsis = datos.sinopsis
        serie.generos = datos.generos

        // Si se omiten estos campos, se restablecen sus valores
        // predeterminados en vez de conservar los valores anteriores.
        serie.calificacion = datos.calificacion ?? 0
        serie.videoUrl = datos.videoUrl ?? ''

        const serieGuardada = await serie.save()

        return res.status(200).json({
            mensaje: 'Serie reemplazada correctamente.',
            serie: serieGuardada
        })
    } catch (error) {
        next(error)
    }
}

// PATCH /api/series/:id
// Modifica solamente los campos recibidos y validados.
const actualizarSerie = async (req, res, next) => {
    try {
        const { id } = req.validated.params
        const datos = req.validated.body

        const serieActualizada = await Serie.findByIdAndUpdate(
			id,
			{ $set: datos },
			{
				returnDocument: "after",
				runValidators: true,
			},
		);

        if (!serieActualizada) {
            return res.status(404).json({
                mensaje: 'Serie no encontrada.'
            })
        }

        return res.status(200).json({
            mensaje: 'Serie actualizada correctamente.',
            serie: serieActualizada
        })
    } catch (error) {
        next(error)
    }
}

// DELETE /api/series/:id
const eliminarSerie = async (req, res, next) => {
    try {
        const { id } = req.validated.params
        const serieEliminada = await Serie.findByIdAndDelete(id)

        if (!serieEliminada) {
            return res.status(404).json({
                mensaje: 'Serie no encontrada.'
            })
        }

        return res.status(200).json({
            mensaje: 'Serie eliminada correctamente.',
            serie: serieEliminada
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    obtenerSeries,
    obtenerSeriePorId,
    crearSerie,
    reemplazarSerie,
    actualizarSerie,
    eliminarSerie
}
