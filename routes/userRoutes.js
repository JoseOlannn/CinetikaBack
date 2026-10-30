const express = require('express');

const {
    obtenerUsuarios
} = require('../controllers/userController');

const router = express.Router();

router.get('/', obtenerUsuarios);

module.exports = router;