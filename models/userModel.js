const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 80
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        foto_perfil: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
)

const Usuario = mongoose.models.Usuario || mongoose.model("Usuario", userSchema)

module.exports = Usuario
