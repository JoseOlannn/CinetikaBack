
const { z } = require('zod')

const objectId = z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    'Debe ser un ObjectId válido de MongoDB.'
)

const idSchema = z.object({
    id: objectId
})

const temporadaIdParamsSchema = z.object({
    temporadaId: objectId
})

const crearEpisodioSchema = z.object({
    temporadaId: objectId,
    numero: z.number().int().min(1),
    titulo: z.string().trim().min(1).max(200),
    duracion: z.number().int().min(1),
    sinopsis: z.string().trim().max(3000).optional(),
    fechaEstreno: z.string().datetime().optional(),
    videoUrl: z.string().trim().optional()
})

const reemplazarEpisodioSchema = z.object({
    numero: z.number().int().min(1),
    titulo: z.string().trim().min(1).max(200),
    duracion: z.number().int().min(1),
    sinopsis: z.string().trim().max(3000).optional(),
    fechaEstreno: z.string().datetime().optional(),
    videoUrl: z.string().trim().optional()
})

const actualizarEpisodioSchema = reemplazarEpisodioSchema
    .partial()
    .refine(
        datos => Object.keys(datos).length > 0,
        'Debes enviar al menos un campo para actualizar.'
    )

const buscarEpisodiosSchema = z.object({
    temporadaId: objectId.optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20)
})

// Exportamos todos los esquemas para utilizarlos en las rutas.
module.exports = {
    idSchema,
    temporadaIdParamsSchema,
    crearEpisodioSchema,
    reemplazarEpisodioSchema,
    actualizarEpisodioSchema,
    buscarEpisodiosSchema
}
