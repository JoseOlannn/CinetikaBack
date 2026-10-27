const validar = (esquema, propiedad = 'body') => {
    return (req, res, next) => {
        if (!esquema || typeof esquema.safeParse !== 'function') {
            return next(
                new Error(
                    `El esquema de validación para "${propiedad}" no está definido o no tiene safeParse.`
                )
            )
        }

        const resultado = esquema.safeParse(req[propiedad])

        if (!resultado.success) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son válidos.',
                errores: resultado.error.issues.map(error => ({
                    campo: error.path.join('.'),
                    mensaje: error.message
                }))
            })
        }

        req.validated = req.validated || {}
        req.validated[propiedad] = resultado.data

        next()
    }
}

module.exports = validar