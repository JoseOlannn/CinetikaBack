require('dotenv').config()

const express = require('express')
const cors = require('cors')
const conectarDB = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const peliculaRoutes = require('./routes/peliculaRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/usuarios', userRoutes)
app.use('/api/peliculas', peliculaRoutes)

const iniciarServidor = async () => {
    await conectarDB()
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
}

iniciarServidor()
