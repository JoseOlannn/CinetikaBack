
const Temporada = require('../models/temporadaModel')
const Episodio = require('../models/episodioModel')
const Serie = require('../models/serieModel')

// Construye una respuesta paginada uniforme.
const paginar = (data, page, limit, total) => ({
    data,
    pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
})

// GET /api/temporadas?serieId=...&page=1&limit=20
const obtenerTemporadas = async (req, res, next) => {
    try {
        const { serieId, page, limit } = req.validated.query
        const filtros = {}

        if (serieId) filtros.serieId = serieId

        const [total, temporadas] = await Promise.all([
            Temporada.countDocuments(filtros),
            Temporada.find(filtros)
                .sort({ serieId: 1, numero: 1 })
                .skip((page - 1) * limit)
                .limit(limit)
        ])

        return res.status(200).json(
            paginar(temporadas, page, limit, total)
        )
    } catch (error) {
        next(error)
    }
}

// GET /api/series/:serieId/temporadas
const obtenerTemporadasDeSerie = async (req, res, next) => {
    try {
        const { serieId } = req.validated.params
        const { page, limit } = req.validated.query

        const serieExiste = await Serie.exists({ _id: serieId })

        if (!serieExiste) {
            return res.status(404).json({
                mensaje: 'Serie no encontrada.'
            })
        }

        const filtros = { serieId }

        const [total, temporadas] = await Promise.all([
            Temporada.countDocuments(filtros),
            Temporada.find(filtros)
                .sort({ numero: 1 })
                .skip((page - 1) * limit)
                .limit(limit)
        ])

        return res.status(200).json(
            paginar(temporadas, page, limit, total)
        )
    } catch (error) {
        next(error)
    }
}

// GET /api/temporadas/:id
const obtenerTemporadaPorId = async (req, res, next) => {
    try {
        const temporada = await Temporada.findById(
            req.validated.params.id
        )

        if (!temporada) {
            return res.status(404).json({
                mensaje: 'Temporada no encontrada.'
            })
        }

        return res.status(200).json(temporada)
    } catch (error) {
        next(error)
    }
}

// POST /api/temporadas
const crearTemporada = async (req, res, next) => {
    try {
        const datos = req.validated.body
        const serieExiste = await Serie.exists({ _id: datos.serieId })

        if (!serieExiste) {
            return res.status(404).json({
                mensaje: 'La serie indicada no existe.'
            })
        }

        const temporada = await Temporada.create(datos)

        return res.status(201).json({
            mensaje: 'Temporada creada correctamente.',
            temporada
        })
    } catch (error) {
        next(error)
    }
}

// PUT /api/temporadas/:id
const reemplazarTemporada = async (req, res, next) => {
    try {
        const { id } = req.validated.params
        const datos = req.validated.body

        const temporada = await Temporada.findById(id)

        if (!temporada) {
            return res.status(404).json({
                mensaje: 'Temporada no encontrada.'
            })
        }

        // PUT reemplaza todos los campos editables.
        // La relación serieId se conserva.
        temporada.numero = datos.numero
        temporada.nombre = datos.nombre ?? ''
        temporada.anioEstreno = datos.anioEstreno
        temporada.sinopsis = datos.sinopsis ?? ''

        const guardada = await temporada.save()

        return res.status(200).json({
            mensaje: 'Temporada reemplazada correctamente.',
            temporada: guardada
        })
    } catch (error) {
        next(error)
    }
}

// PATCH /api/temporadas/:id
const actualizarTemporada = async (req, res, next) => {
    try {
        const temporada = await Temporada.findByIdAndUpdate(
            req.validated.params.id,
            { $set: req.validated.body },
            { returnDocument: 'after', runValidators: true }
        )

        if (!temporada) {
            return res.status(404).json({
                mensaje: 'Temporada no encontrada.'
            })
        }

        return res.status(200).json({
            mensaje: 'Temporada actualizada correctamente.',
            temporada
        })
    } catch (error) {
        next(error)
    }
}

// DELETE /api/temporadas/:id
const eliminarTemporada = async (req, res, next) => {
    try {
        const temporada = await Temporada.findById(
            req.validated.params.id
        )

        if (!temporada) {
            return res.status(404).json({
                mensaje: 'Temporada no encontrada.'
            })
        }

        const tieneEpisodios = await Episodio.exists({
            temporadaId: temporada._id
        })

        if (tieneEpisodios) {
            return res.status(409).json({
                mensaje: 'Elimina primero los episodios de esta temporada.'
            })
        }

        await temporada.deleteOne()

        return res.status(200).json({
            mensaje: 'Temporada eliminada correctamente.',
            temporada
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    obtenerTemporadas,
    obtenerTemporadasDeSerie,
    obtenerTemporadaPorId,
    crearTemporada,
    reemplazarTemporada,
    actualizarTemporada,
    eliminarTemporada
}
