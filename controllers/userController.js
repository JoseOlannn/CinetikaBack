const Usuario = require('../models/userModel');

// GET: Obtener todos los usuarios
const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find();

        return res.status(200).json(usuarios);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerUsuarios
};