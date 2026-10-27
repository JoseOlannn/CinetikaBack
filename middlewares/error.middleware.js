
const errorMiddleware = (error, req, res, next) => {
    // Si la respuesta ya comenzó, Express debe continuar
    // con su propio manejo del error.
    if (res.headersSent) {
        return next(error)
    }

    // Error de validación de Mongoose.
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            mensaje: 'Los datos no cumplen las validaciones del modelo.',
            error: error.message
        })
    }

    // Error por un ObjectId con formato incorrecto.
    if (error.name === 'CastError') {
        return res.status(400).json({
            mensaje: 'El identificador proporcionado no es válido.'
        })
    }

    // Error por intentar duplicar un valor único.
    if (error.code === 11000) {
        return res.status(409).json({
            mensaje: 'Ya existe un registro con ese valor único.'
        })
    }

    // Error inesperado: no exponer detalles internos al cliente.
    console.error(error)

    return res.status(500).json({
        mensaje: 'Ocurrió un error interno en el servidor.'
    })
}

module.exports = errorMiddleware
