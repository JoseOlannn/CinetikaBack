const { z } = require('zod');

// Validación para registrar un usuario
const registroSchema = z.object({
    nombre: z.string({
        error: 'El nombre es obligatorio y debe ser texto.'
    })
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .max(80, 'El nombre no puede superar los 80 caracteres.'),

    email: z.string({
        error: 'El correo electrónico es obligatorio y debe ser texto.'
    })
        .trim()
        .email('Debes proporcionar un correo electrónico válido.')
        .toLowerCase(),

    password: z.string({
        error: 'La contraseña es obligatoria y debe ser texto.'
    })
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .max(25, 'La contraseña no puede superar los 25 caracteres.'),

    confirmarPassword: z.string({
        error: 'Debes confirmar tu contraseña.'
    })
        .min(1, 'Debes confirmar tu contraseña.')
}).refine(
    (datos) => datos.password === datos.confirmarPassword,
    {
        message: 'Las contraseñas no coinciden.',
        path: ['confirmarPassword']
    }
);

// Validación para iniciar sesión
const loginSchema = z.object({
    email: z.string({
        error: 'El correo electrónico es obligatorio y debe ser texto.'
    })
        .trim()
        .email('Debes proporcionar un correo electrónico válido.')
        .toLowerCase(),

    password: z.string({
        error: 'La contraseña es obligatoria y debe ser texto.'
    })
        .min(1, 'La contraseña es obligatoria.')
        .max(25, 'La contraseña no puede superar los 25 caracteres.')
});

module.exports = {
    registroSchema,
    loginSchema
};
