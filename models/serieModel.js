const mongoose = require('mongoose')

const serieSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },
        categoria: {
            type: String,
            default: 'serie',
            trim: true,
            lowercase: true,
            immutable: true
        },

        anio: {
            type: Number,
            required: true,
            min: 1888,
            max: new Date().getFullYear() + 10
        },

        poster: {
            type: String,
            required: true,
            trim: true
        },

        banner: {
            type: String,
            trim: true,
            default: ''
        },

        duracion: {
            type: String,
            trim: true,
            default: ''
        },

        sinopsis: {
            type: String,
            required: true,
            trim: true,
            maxlength: 3000
        },

        generos: {
            type: [String],
            required: true,
            validate: {
                validator: function (generos) {
                    return (
                        generos.length > 0 &&
                        generos.every(
                            genero =>
                                typeof genero === 'string' &&
                                genero.trim().length > 0
                        )
                    )
                },
                message: 'La serie debe tener al menos un género válido.'
            }
        },

        calificacion: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        videoUrl: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
)

// Índice para facilitar las búsquedas por nombre.
serieSchema.index({ nombre: 1 })

const Serie = mongoose.model('Serie', serieSchema)

module.exports = Serie
