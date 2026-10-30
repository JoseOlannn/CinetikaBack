const { z } = require('zod')

// Validación para registrar un usuario
const registroSchema = z.object({
    nombre: z.string()
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .max(80, 'El nombre no puede superar los 80 caracteres.'),

    email: z.string()
        .trim()
        .email('Debes proporcionar un correo electrónico válido.')
        .toLowerCase(),

    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .max(25, 'La contraseña no puede superar los 25 caracteres.')
})

// Validación para iniciar sesión
const loginSchema = z.object({
    email: z.string()
        .trim()
        .email('Debes proporcionar un correo electrónico válido.')
        .toLowerCase(),

    password: z.string()
        .min(1, 'La contraseña es obligatoria.')
        .max(25, 'La contraseña no puede superar los 25 caracteres.')
})

module.exports = {
    registroSchema,
    loginSchema
}