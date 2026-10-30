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

const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

// Middlewares de Express
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/usuarios', userRoutes)
app.use('/api/peliculas', peliculaRoutes)
app.use('/api/series', serieRoutes)
app.use('/api/temporadas', temporadaRoutes)
app.use('/api/episodios', episodioRoutes)

// Middleware centralizado de errores
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

const iniciarServidor = async () => {
    await conectarDB()
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
}

iniciarServidor()
