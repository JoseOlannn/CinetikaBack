const express = require('express')
const cors = require('cors')
require('dotenv').config()

const conectarDB = require('./config/database')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const peliculaRoutes = require('./routes/peliculaRoutes')
const serieRoutes = require('./routes/serieRoutes')
const temporadaRoutes = require('./routes/temporadaRoutes')
const episodioRoutes = require('./routes/episodioRoutes')
const catalogoRoutes = require('./routes/catalogoRoutes')
const cortometrajeRoutes = require('./routes/cortometrajeRoutes')

const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

// Middlewares de Express
app.use(cors())
app.use(express.json())

// Middleware para asegurar la conexión a la base de datos (compatible con Serverless y Local)
app.use(async (req, res, next) => {
    try {
        await conectarDB()
        next()
    } catch (error) {
        next(error)
    }
})

// Ruta raíz de bienvenida y health check
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Cinetika funcionando correctamente',
        estado: 'Online',
        version: '1.0.0',
        endpoints: [
            '/api/catalogo',
            '/api/auth',
            '/api/usuarios',
            '/api/peliculas',
            '/api/series',
            '/api/cortometrajes'
        ]
    })
})

// Rutas de la API
app.use('/api/auth', authRoutes)
app.use('/api/usuarios', userRoutes)
app.use('/api/peliculas', peliculaRoutes)
app.use('/api/series', serieRoutes)
app.use('/api/temporadas', temporadaRoutes)
app.use('/api/episodios', episodioRoutes)
app.use('/api/catalogo', catalogoRoutes)
app.use('/api/cortometrajes', cortometrajeRoutes)

// Middleware centralizado de errores
app.use(errorMiddleware)

// Exportar app para despliegues Serverless (como Vercel)
module.exports = app

// Iniciar servidor local si no estamos en entorno Vercel
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000
    const iniciarServidor = async () => {
        try {
            await conectarDB()
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`)
            })
        } catch (error) {
            console.error('Error al iniciar el servidor:', error.message)
        }
    }
    iniciarServidor()
}
