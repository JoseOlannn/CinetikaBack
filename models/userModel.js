const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true,
            trim: true,
            minLenght: 2,
            maxlength: 80
        },
        email:{
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
        }
    },
    {
        timestamps: true
    }
)

const Usuario = mongoose.models.Usuario || mongoose.model("Usuario", userSchema)


module.exports = Usuario


