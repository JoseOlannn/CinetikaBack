const mongoose = require('mongoose')

const cortometrajeSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        categoria: {
            type: String,
            default: 'cortometraje',
            trim: true,
            lowercase: true
        },
        anio: {
            type: Number,
            required: true
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
        sinopsis: {
            type: String,
            required: true,
            trim: true
        },
        duracion: {
            type: String,
            required: true,
            trim: true
        },
        generos: {
            type: [String],
            required: true
        },
        calificacion: {
            type: Number,
            default: 0
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

const Cortometraje = mongoose.model('Cortometraje', cortometrajeSchema)
module.exports = Cortometraje