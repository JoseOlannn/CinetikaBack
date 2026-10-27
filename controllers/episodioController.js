
const Episodio = require('../models/episodioModel')
const Temporada = require('../models/temporadaModel')

const paginar = (data, page, limit, total) => ({
    data,
    pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
})

// GET /api/episodios?temporadaId=...&page=1&limit=20
const obtenerEpisodios = async (req, res, next) => {
    try {
        const { temporadaId, page, limit } = req.validated.query
        const filtros = {}

        if (temporadaId) filtros.temporadaId = temporadaId

        const [total, episodios] = await Promise.all([
            Episodio.countDocuments(filtros),
            Episodio.find(filtros)
                .sort({ temporadaId: 1, numero: 1 })
                .skip((page - 1) * limit)
                .limit(limit)
        ])

        return res.status(200).json(
            paginar(episodios, page, limit, total)
        )
    } catch (error) {
        next(error)
    }
}

// GET /api/temporadas/:temporadaId/episodios
const obtenerEpisodiosDeTemporada = async (req, res, next) => {
    try {
        const { temporadaId } = req.validated.params
        const { page, limit } = req.validated.query

        const temporadaExiste = await Temporada.exists({
            _id: temporadaId
        })

        if (!temporadaExiste) {
            return res.status(404).json({
                mensaje: 'Temporada no encontrada.'
            })
        }

        const filtros = { temporadaId }

        const [total, episodios] = await Promise.all([
            Episodio.countDocuments(filtros),
            Episodio.find(filtros)
                .sort({ numero: 1 })
                .skip((page - 1) * limit)
                .limit(limit)
        ])

        return res.status(200).json(
            paginar(episodios, page, limit, total)
        )
    } catch (error) {
        next(error)
    }
}

// GET /api/episodios/:id
const obtenerEpisodioPorId = async (req, res, next) => {
    try {
        const episodio = await Episodio.findById(
            req.validated.params.id
        )

        if (!episodio) {
            return res.status(404).json({
                mensaje: 'Episodio no encontrado.'
            })
        }

        return res.status(200).json(episodio)
    } catch (error) {
        next(error)
    }
}

// POST /api/episodios
const crearEpisodio = async (req, res, next) => {
    try {
        const datos = req.validated.body
        const temporadaExiste = await Temporada.exists({
            _id: datos.temporadaId
        })

        if (!temporadaExiste) {
            return res.status(404).json({
                mensaje: 'La temporada indicada no existe.'
            })
        }

        const episodio = await Episodio.create(datos)

        return res.status(201).json({
            mensaje: 'Episodio creado correctamente.',
            episodio
        })
    } catch (error) {
        next(error)
    }
}

// PUT /api/episodios/:id
const reemplazarEpisodio = async (req, res, next) => {
    try {
        const { id } = req.validated.params
        const datos = req.validated.body

        const episodio = await Episodio.findById(id)

        if (!episodio) {
            return res.status(404).json({
                mensaje: 'Episodio no encontrado.'
            })
        }

        // Se conserva temporadaId: no se puede mover el episodio
        // a otra temporada mediante esta operación.
        episodio.numero = datos.numero
        episodio.titulo = datos.titulo
        episodio.duracion = datos.duracion
        episodio.sinopsis = datos.sinopsis ?? ''
        episodio.fechaEstreno = datos.fechaEstreno
        episodio.videoUrl = datos.videoUrl ?? ''

        const guardado = await episodio.save()

        return res.status(200).json({
            mensaje: 'Episodio reemplazado correctamente.',
            episodio: guardado
        })
    } catch (error) {
        next(error)
    }
}

// PATCH /api/episodios/:id
const actualizarEpisodio = async (req, res, next) => {
    try {
        const episodio = await Episodio.findByIdAndUpdate(
            req.validated.params.id,
            { $set: req.validated.body },
            { returnDocument: 'after', runValidators: true }
        )

        if (!episodio) {
            return res.status(404).json({
                mensaje: 'Episodio no encontrado.'
            })
        }

        return res.status(200).json({
            mensaje: 'Episodio actualizado correctamente.',
            episodio
        })
    } catch (error) {
        next(error)
    }
}

// DELETE /api/episodios/:id
const eliminarEpisodio = async (req, res, next) => {
    try {
        const episodio = await Episodio.findByIdAndDelete(
            req.validated.params.id
        )

        if (!episodio) {
            return res.status(404).json({
                mensaje: 'Episodio no encontrado.'
            })
        }

        return res.status(200).json({
            mensaje: 'Episodio eliminado correctamente.',
            episodio
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    obtenerEpisodios,
    obtenerEpisodiosDeTemporada,
    obtenerEpisodioPorId,
    crearEpisodio,
    reemplazarEpisodio,
    actualizarEpisodio,
    eliminarEpisodio
}
