require('dotenv').config()
const mongoose = require('mongoose')
const Pelicula = require('./models/peliculaModel')
const Serie = require('./models/serieModel')

const genresMap = {
    1: 'Ciencia Ficción',
    2: 'Acción',
    3: 'Drama',
    4: 'Comedia',
    5: 'Terror',
    6: 'Animación',
    7: 'Aventura',
    8: 'Fantasía',
    9: 'Misterio',
    10: 'Suspenso'
}

const mockContents = [
    {
        nombre: 'Blade Runner',
        categoria: 'pelicula',
        anio: 1982,
        poster: 'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg',
        banner: 'https://image.tmdb.org/t/p/original/eIqy21pI9aeYn3nU5qQxN5hA1oU.jpg',
        sinopsis: 'En un futuro distópico, el ex policía Rick Deckard es llamado para rastrear y retirar a cuatro replicantes que han regresado a la Tierra.',
        duracion: '117 min',
        generos: [1, 2, 10],
        calificacion: 4.8,
        videoUrl: 'https://www.youtube.com/watch?v=eogpIG53Cjc'
    },
    {
        nombre: 'Los cazafantasmas',
        categoria: 'pelicula',
        anio: 1984,
        poster: 'https://image.tmdb.org/t/p/w500/h2593n1tB5QZpQY17FpCj067j8A.jpg',
        banner: 'https://image.tmdb.org/t/p/original/cRh8yL6zQ01Y2W3v7fM2o7P0s8N.jpg',
        sinopsis: 'Un grupo de científicos funda un negocio dedicado a capturar fantasmas mientras una amenaza sobrenatural se aproxima a Nueva York.',
        duracion: '105 min',
        generos: [4, 8],
        calificacion: 4.5,
        videoUrl: 'https://www.youtube.com/watch?v=6hDkhw5Wkas'
    },
    {
        nombre: 'Volver al futuro',
        categoria: 'pelicula',
        anio: 1985,
        poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        banner: 'https://image.tmdb.org/t/p/original/58POx3d0gH0xV4n0gK8fP5iG6k1.jpg',
        sinopsis: 'Marty McFly viaja accidentalmente a 1955 y debe conseguir que sus padres se enamoren para no alterar su propia existencia.',
        duracion: '116 min',
        generos: [1, 4, 7],
        calificacion: 4.9,
        videoUrl: 'https://www.youtube.com/watch?v=qvsgGtivCgs'
    },
    {
        nombre: 'The Simpsons',
        categoria: 'serie',
        anio: 1989,
        poster: 'https://image.tmdb.org/t/p/w500/vHql6915bK5QZ5q8vJ5k4xK3j2l.jpg',
        banner: 'https://image.tmdb.org/t/p/original/f53F9sdDX1aaI9n5j7q1t7cE2.jpg',
        sinopsis: 'Una familia de Springfield protagoniza situaciones absurdas que satirizan la vida cotidiana, la cultura popular y la sociedad.',
        duracion: '4 temporadas (81 episodios)',
        generos: [6, 4],
        calificacion: 4.8,
        videoUrl: 'https://www.youtube.com/watch?v=HRn2z3E3K2k'
    },
    {
        nombre: 'Twin Peaks',
        categoria: 'serie',
        anio: 1990,
        poster: 'https://image.tmdb.org/t/p/w500/lK0Y8V7p8mF5uK7x9x7F4g2l8.jpg',
        banner: 'https://image.tmdb.org/t/p/original/o8b8p7q6F8l4z7o0q8x1b7y9.jpg',
        sinopsis: 'El agente Dale Cooper llega a un pequeño pueblo para investigar el asesinato de Laura Palmer y descubre secretos inquietantes entre sus habitantes.',
        duracion: '2 temporadas (30 episodios)',
        generos: [3, 9, 10],
        calificacion: 4.8,
        videoUrl: 'https://www.youtube.com/watch?v=q6g3t7c7m3k'
    },
    {
        nombre: 'Luxo Jr.',
        categoria: 'cortometraje',
        anio: 1986,
        poster: 'https://image.tmdb.org/t/p/w500/e9c7r6p5l4f3t2.jpg',
        banner: 'https://image.tmdb.org/t/p/original/t6u7p8m9q1x3k5.jpg',
        sinopsis: 'Un flexo grande observa cómo un flexo más pequeño juega con una pelota de goma que acaba pinchándose.',
        duracion: '2 min',
        generos: [6, 4],
        calificacion: 4.6,
        videoUrl: 'https://www.youtube.com/watch?v=6G3t7c7m3k'
    }
]

async function sembrarDatos() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado a MongoDB Atlas para sembrar datos iniciales...')

        const totalPelis = await Pelicula.countDocuments()
        const totalSeries = await Serie.countDocuments()

        if (totalPelis > 0 || totalSeries > 0) {
            console.log(`Ya existen datos (${totalPelis} películas, ${totalSeries} series). Omitiendo sembrado.`)
            process.exit(0)
        }

        for (const item of mockContents) {
            const generosNombres = item.generos.map(id => genresMap[id] || 'General')

            if (item.categoria === 'serie') {
                await Serie.create({
                    nombre: item.nombre,
                    categoria: 'serie',
                    anio: item.anio,
                    poster: item.poster,
                    banner: item.banner,
                    duracion: item.duracion,
                    sinopsis: item.sinopsis,
                    generos: generosNombres,
                    calificacion: item.calificacion,
                    videoUrl: item.videoUrl
                })
            } else {
                await Pelicula.create({
                    nombre: item.nombre,
                    categoria: item.categoria, // 'pelicula' o 'cortometraje'
                    anio: item.anio,
                    poster: item.poster,
                    banner: item.banner,
                    duracion: item.duracion,
                    sinopsis: item.sinopsis,
                    generos: generosNombres,
                    calificacion: item.calificacion,
                    videoUrl: item.videoUrl
                })
            }
        }

        console.log('¡Datos iniciales sembrados con éxito en MongoDB Atlas!')
        process.exit(0)
    } catch (error) {
        console.error('Error al sembrar datos:', error.message)
        process.exit(1)
    }
}

sembrarDatos()

