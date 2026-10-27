
const mongoose = require('mongoose')

const episodioSchema = new mongoose.Schema(
    {
        // Temporada a la que pertenece este episodio.
        temporadaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Temporada',
            required: true
        },

        numero: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: 'El número de episodio debe ser un entero.'
            }
        },

        titulo: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        duracion: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: 'La duración debe expresarse en minutos enteros.'
            }
        },

        sinopsis: {
            type: String,
            trim: true,
            maxlength: 3000,
            default: ''
        },

        fechaEstreno: {
            type: Date
        },

        videoUrl: {
            type: String,
            trim: true,
            default: ''
        }
    },
    { timestamps: true }
)

// No puede repetirse el número de episodio dentro
// de la misma temporada.
episodioSchema.index(
    { temporadaId: 1, numero: 1 },
    { unique: true }
)

module.exports = mongoose.model('Episodio', episodioSchema)
