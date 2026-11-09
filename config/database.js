const mongoose = require('mongoose')

let isConnected = false

const conectarDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 8000,
        })
        isConnected = true
        console.log('MongoDB conectado correctamente')
    } catch (error) {
        console.log('Error al conectar MongoDB:', error.message)
        throw error
    }
}

module.exports = conectarDB
