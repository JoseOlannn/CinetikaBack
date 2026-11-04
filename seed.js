require('dotenv').config()
const mongoose = require('mongoose')
const Pelicula = require('./models/peliculaModel')
const Serie = require('./models/serieModel')
const Cortometraje = require('./models/cortometrajeModel')

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
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmAcdcgEDdsOn8XLrwfR--mgl3loviw6axzn4fZys4zXgakWIlUj_OO68&s=10',
        sinopsis: 'En un futuro distópico, el ex policía Rick Deckard es llamado para rastrear y retirar a cuatro replicantes que han regresado a la Tierra.',
        duracion: '117 min',
        generos: [1, 2, 10],
        calificacion: 4.8,
        videoUrl: 'https://youtu.be/qoEyZoOTtss?si=GrRj0zGMGlvqdRaj'
    },
    {
        nombre: 'Los cazafantasmas',
        categoria: 'pelicula',
        anio: 1984,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ6EMnvNpCSutI6NtBUJzUFHkP9IzBobA0WdhKcvSRaA&s=10',
        banner: 'https://images.mubicdn.net/images/artworks/561063/cache-561063-1686644206/images-original.png',
        sinopsis: 'Un grupo de científicos funda un negocio dedicado a capturar fantasmas mientras una amenaza sobrenatural se aproxima a Nueva York.',
        duracion: '105 min',
        generos: [4, 8],
        calificacion: 4.5,
        videoUrl: 'https://youtu.be/6hDkhw5Wkas?si=Mo1leUpSBgOiwQz2'
    },
    {
        nombre: 'Volver al futuro',
        categoria: 'pelicula',
        anio: 1985,
        poster: 'https://m.media-amazon.com/images/I/71KgOSSzS1L._AC_UF894,1000_QL80_.jpg',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sTlM2I_YpdONm4OfkWpfBEnsBlCYZdEkFW3OG3Ef4Wn7tyWd9MFPADK&s=10',
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
        poster: 'https://m.media-amazon.com/images/M/MV5BNTU2OWE0YWYtMjRlMS00NTUwLWJmZWUtODFhNzJiMGJlMzI3XkEyXkFqcGc@._V1_.jpg',
        banner: 'https://daily.jstor.org/wp-content/uploads/2016/11/the_simpsons_more_than_just_a_cartoon_1050x700.jpg',
        sinopsis: 'Una familia de Springfield protagoniza situaciones absurdas que satirizan la vida cotidiana, la cultura popular y la sociedad.',
        duracion: '4 temporadas (81 episodios)',
        generos: [6, 4],
        calificacion: 4.8,
        videoUrl: 'https://youtu.be/ZwTylNpEG3A?si=GTr2hO3dXSYc_8i0'
    },
    {
        nombre: 'Twin Peaks',
        categoria: 'serie',
        anio: 1990,
        poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p183906_b_v8_ab.jpg',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvDwaTO8ptoHXKUT-1Om4KtBnCkmTeb30A3hlCKadolRQ6CsNZ0wvySmB&s=10',
        sinopsis: 'El agente Dale Cooper llega a un pequeño pueblo para investigar el asesinato de Laura Palmer y descubre secretos inquietantes entre sus habitantes.',
        duracion: '2 temporadas (30 episodios)',
        generos: [3, 9, 10],
        calificacion: 4.8,
        videoUrl: 'https://youtu.be/sIj0RaIlhMM?si=OgOUt8KRaYkBLl42'
    },
    {
        nombre: 'Luxo Jr.',
        categoria: 'cortometraje',
        anio: 1986,
        poster: 'https://m.media-amazon.com/images/M/MV5BMWUzZDMzYjgtMjU1MS00YjNjLWJjMWUtMDA0ODRiNTZlYzg2XkEyXkFqcGc@._V1_.jpg',
        banner: 'https://image.tmdb.org/t/p/original/t6u7p8m9q1x3k5.jpg',
        sinopsis: 'Un flexo grande observa cómo un flexo más pequeño juega con una pelota de goma que acaba pinchándose.',
        duracion: '2 min',
        generos: [6, 4],
        calificacion: 4.6,
        videoUrl: 'https://www.youtube.com/watch?v=Ltud8Ll1JjY'
    },
    {
        nombre: 'Hasta los huesos - Cortometraje animado de Rene Castillo',
        categoria: 'cortometraje',
        anio: 2013,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUkMHFyVRa8fdQYbWzqxJGlMzG1etRdZtPLzV2i919-uc-RPJKksfRp7m&s=10',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkES3hChiMgKSWY6hL9Lu6zoDUhX-48EjOa7sOTujtlyut1JO0eKNEA-c&s=10',
        sinopsis: 'Cortometraje sobre el Día de Muertos',
        duracion: '12 min',
        generos: [6, 3], 
        calificacion: 4.8,
        videoUrl: 'https://youtu.be/nbBLLNGeyiY?si=QrGMpE8Lwoxov6rB'
    }
]

async function sembrarDatos() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado a MongoDB Atlas para sembrar datos iniciales...')

        const totalPelis = await Pelicula.countDocuments()
        const totalSeries = await Serie.countDocuments()
        const totalCortos = await Cortometraje.countDocuments()

        if (totalPelis > 0 || totalSeries > 0 || totalCortos > 0) {
            console.log(`Ya existen datos (${totalPelis} películas, ${totalSeries} series, ${totalCortos} cortometrajes). Omitiendo sembrado.`)
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
            } else if (item.categoria === 'cortometraje') {
                await Cortometraje.create({ // <--- Ahora usa el modelo correcto
                    nombre: item.nombre,
                    categoria: 'cortometraje',
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

