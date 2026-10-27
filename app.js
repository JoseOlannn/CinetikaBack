require('dotenv').config()

const express = require('express')
const cors = require('cors')
const conectarDB = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const peliculaRoutes = require('./routes/peliculaRoutes')
const serieRoutes = require('./routes/serieRoutes')
const temporadaRoutes = require('./routes/temporadaRoutes')
const episodioRoutes = require('./routes/episodioRoutes')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/usuarios', userRoutes)
app.use('/api/peliculas', peliculaRoutes)
app.use('/api/series', serieRoutes)
app.use('/api/temporadas', temporadaRoutes)
app.use('/api/episodios', episodioRoutes)

app.use(errorMiddleware)

const iniciarServidor = async () => {
    await conectarDB()
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
}

iniciarServidor()
