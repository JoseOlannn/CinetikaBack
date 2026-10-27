
const { z } = require('zod')

// Valida el identificador de MongoDB recibido en la URL.
const idSchema = z.object({
    id: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        'El ID debe ser un ObjectId válido de MongoDB.'
    )
})

// Campos obligatorios para crear o sustituir una serie.
const crearSerieSchema = z.object({
    nombre: z.string()
        .trim()
        .min(1, 'El nombre es obligatorio.')
        .max(150, 'El nombre no puede superar los 150 caracteres.'),

    anio: z.number()
        .int('El año debe ser un número entero.')
        .min(1888, 'El año no es válido.')
        .max(
            new Date().getFullYear() + 10,
            'El año es demasiado futuro.'
        ),

    poster: z.string()
        .trim()
        .min(1, 'El póster es obligatorio.'),

    sinopsis: z.string()
        .trim()
        .min(1, 'La sinopsis es obligatoria.')
        .max(3000, 'La sinopsis no puede superar los 3000 caracteres.'),

    generos: z.array(
        z.string().trim().min(1, 'Los géneros no pueden estar vacíos.')
    ).min(1, 'La serie debe tener al menos un género.'),

    calificacion: z.number()
        .min(0, 'La calificación mínima es 0.')
        .max(5, 'La calificación máxima es 5.')
        .optional(),

    videoUrl: z.string()
        .trim()
        .optional()
})

// PUT: requiere todos los campos esenciales del recurso.
// calificacion y videoUrl pueden omitirse porque tienen valores
// predeterminados en el modelo.
const reemplazarSerieSchema = crearSerieSchema

// PATCH: permite enviar uno o varios campos.
// Rechaza una petición vacía.
const actualizarSerieSchema = crearSerieSchema
    .partial()
    .refine(
        datos => Object.keys(datos).length > 0,
        'Debes enviar al menos un campo para actualizar.'
    )

// Valida los filtros de búsqueda.
const buscarSeriesSchema = z.object({
    nombre: z.string().trim().optional(),
    genero: z.string().trim().optional(),
    categoria: z.literal('serie').optional()
})

module.exports = {
    idSchema,
    crearSerieSchema,
    reemplazarSerieSchema,
    actualizarSerieSchema,
    buscarSeriesSchema
}
