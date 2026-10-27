
const { z } = require('zod')

// Validación de los IDs de MongoDB.
const objectId = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'Debe ser un ObjectId válido de MongoDB.'
)

// Valida el parámetro :id de las rutas individuales.
const idSchema = z.object({
    id: objectId
})

// Valida el parámetro :temporadaId de la ruta de episodios.
const temporadaIdParamsSchema = z.object({
    temporadaId: objectId
})

// Valida los datos para crear una temporada.
const crearTemporadaSchema = z.object({
    serieId: objectId,
    numero: z.number().int().min(1),
    nombre: z.string().trim().max(150).optional(),
    anioEstreno: z.number().int()
        .min(1888)
        .max(new Date().getFullYear() + 10)
        .optional(),
    sinopsis: z.string().trim().max(3000).optional()
})

// Valida los datos requeridos para reemplazar una temporada.
const reemplazarTemporadaSchema = z.object({
    numero: z.number().int().min(1),
    nombre: z.string().trim().max(150).optional(),
    anioEstreno: z.number().int()
        .min(1888)
        .max(new Date().getFullYear() + 10)
        .optional(),
    sinopsis: z.string().trim().max(3000).optional()
})

// Valida las actualizaciones parciales.
const actualizarTemporadaSchema = reemplazarTemporadaSchema
    .partial()
    .refine(
        datos => Object.keys(datos).length > 0,
        'Debes enviar al menos un campo para actualizar.'
    )

// Valida los filtros y la paginación.
const buscarTemporadasSchema = z.object({
    serieId: objectId.optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20)
})

// Exportamos todos los esquemas que utilizan las rutas.
module.exports = {
    idSchema,
    temporadaIdParamsSchema,
    crearTemporadaSchema,
    reemplazarTemporadaSchema,
    actualizarTemporadaSchema,
    buscarTemporadasSchema
}
