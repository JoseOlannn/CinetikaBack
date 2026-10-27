
const mongoose = require('mongoose')

const temporadaSchema = new mongoose.Schema(
    {
        // Serie a la que pertenece esta temporada.
        serieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Serie',
            required: true
        },

        // Número de temporada dentro de la serie.
        numero: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: 'El número de temporada debe ser un entero.'
            }
        },

        nombre: {
            type: String,
            trim: true,
            maxlength: 150,
            default: ''
        },

        anioEstreno: {
            type: Number,
            min: 1888,
            max: new Date().getFullYear() + 10
        },

        sinopsis: {
            type: String,
            trim: true,
            maxlength: 3000,
            default: ''
        }
    },
    { timestamps: true }
)

// No puede haber dos temporadas con el mismo número
// dentro de una misma serie.
temporadaSchema.index(
    { serieId: 1, numero: 1 },
    { unique: true }
)

module.exports = mongoose.model('Temporada', temporadaSchema)
