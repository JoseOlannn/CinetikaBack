require('dotenv').config()

const mongoose = require('mongoose')

const Pelicula = require('./models/peliculaModel')
const Serie = require('./models/serieModel')
const Cortometraje = require('./models/cortometrajeModel')
const Temporada = require('./models/temporadaModel')
const Episodio = require('./models/episodioModel')

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

// --------------------------------------------------
// CONTENIDO ORIGINAL + NUEVAS SERIES
// --------------------------------------------------

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
        nombre: 'Chernobyl',
        categoria: 'serie',
        anio: 2019,
        poster: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg',
        banner: 'https://image.tmdb.org/t/p/w1280/900tHlUYUkp7Ol04XFSoAaEIXcT.jpg',
        sinopsis: 'Miniserie que recrea el desastre nuclear de Chernóbil ocurrido en 1986 y los sacrificios de quienes intentaron contener sus consecuencias.',
        duracion: '1 temporada (5 episodios)',
        generos: [3, 9, 10],
        calificacion: 4.9,
        videoUrl: 'https://www.youtube.com/watch?v=PMlwjCID3Io'
    },
    {
        nombre: 'Over the Garden Wall',
        categoria: 'serie',
        anio: 2014,
        poster: 'https://image.tmdb.org/t/p/w500/2kcGFbt768xAiqvj748FFlO9Gvl.jpg',
        banner: 'https://image.tmdb.org/t/p/w1280/7vWXXOfsFiopxyuE1U303aej0fT.jpg',
        sinopsis: 'Dos hermanos, Wirt y Greg, se pierden en un misterioso bosque conocido como Lo Desconocido. Durante su viaje encuentran criaturas extrañas y buscan el camino de regreso a casa.',
        duracion: '1 temporada (10 episodios)',
        generos: [6, 8, 9],
        calificacion: 4.9,
        videoUrl: 'https://www.youtube.com/watch?v=MchGCjJMv3E'
    },

    // ------------------- 7 NUEVAS SERIES ORIGINALES -------------------
    {
        nombre: 'Código Ecos',
        categoria: 'serie',
        anio: 2023,
        poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500',
        banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280',
        sinopsis: 'Un grupo de criptógrafos descubre frecuencias anómalas en la red eléctrica global que predicen eventos catastróficos minutos antes de que sucedan.',
        duracion: '2 temporadas (6 episodios)',
        generos: [1, 9, 10],
        calificacion: 4.7,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        nombre: 'El Abismo Azul',
        categoria: 'serie',
        anio: 2022,
        poster: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
        banner: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1280',
        sinopsis: 'En una estación submarina a 8,000 metros de profundidad, la tripulación empieza a sufrir alucinaciones compartidas sobre una civilización sumergida.',
        duracion: '2 temporadas (6 episodios)',
        generos: [5, 9, 10],
        calificacion: 4.6,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        nombre: 'Crónicas de Neo-Tokio',
        categoria: 'serie',
        anio: 2024,
        poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500',
        banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1280',
        sinopsis: 'Un detective privado cibernético y una androide renegada investigan el mercado negro de memorias artificiales en las calles neón de Tokio.',
        duracion: '2 temporadas (6 episodios)',
        generos: [1, 2, 6],
        calificacion: 4.9,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        nombre: 'Sombras del Pasado',
        categoria: 'serie',
        anio: 2021,
        poster: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=500',
        banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280',
        sinopsis: 'Una abogada penalista reabre un caso no resuelto de 1995 al descubrir que la víctima sigue enviando cartas anónimas a la fiscalía.',
        duracion: '2 temporadas (6 episodios)',
        generos: [3, 9, 10],
        calificacion: 4.5,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        nombre: 'Reino de Cenizas',
        categoria: 'serie',
        anio: 2023,
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
        banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1280',
        sinopsis: 'Tras la caída del Imperio Solar, tres casas nobles rivales luchan por controlar la única forja capaz de sintetizar energía eterna.',
        duracion: '2 temporadas (6 episodios)',
        generos: [2, 7, 8],
        calificacion: 4.8,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        nombre: 'Risas de Oficina',
        categoria: 'serie',
        anio: 2022,
        poster: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500',
        banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280',
        sinopsis: 'Las caóticas peripecias de una agencia publicitaria en quiebra que intenta sobrevivir aceptando los clientes más absurdos e inusuales.',
        duracion: '2 temporadas (6 episodios)',
        generos: [4],
        calificacion: 4.4,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        nombre: 'Horizonte Cero',
        categoria: 'serie',
        anio: 2024,
        poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500',
        banner: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1280',
        sinopsis: 'La primera colonia humana en Marte pierde contacto total con la Tierra y debe tomar medidas extremas para racionar sus recursos vitales.',
        duracion: '2 temporadas (6 episodios)',
        generos: [1, 3, 7],
        calificacion: 4.7,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },

    // CORTOMETRAJES ORIGINALES
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
        sinopsis: 'Cortometraje sobre el Día de Muertos.',
        duracion: '12 min',
        generos: [6, 3],
        calificacion: 4.8,
        videoUrl: 'https://youtu.be/nbBLLNGeyiY?si=QrGMpE8Lwoxov6rB'
    }
]

// --------------------------------------------------
// TEMPORADAS
// --------------------------------------------------

const mockTemporadas = [
    {
        serieNombre: 'Chernobyl',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2019,
        sinopsis: 'Los acontecimientos posteriores al accidente nuclear de Chernóbil y los esfuerzos por controlar la catástrofe.'
    },
    {
        serieNombre: 'Over the Garden Wall',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2014,
        sinopsis: 'Wirt y Greg recorren un bosque misterioso mientras intentan encontrar el camino de regreso a casa.'
    },

    // TEMPORADAS SERIE 1: Código Ecos
    {
        serieNombre: 'Código Ecos',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2023,
        sinopsis: 'Descubrimiento de las frecuencias anómalas y los primeros desastres evitados.'
    },
    {
        serieNombre: 'Código Ecos',
        numero: 2,
        nombre: 'Temporada 2',
        anioEstreno: 2024,
        sinopsis: 'La red colapsa a nivel global mientras el equipo busca el origen del código transmisor.'
    },

    // TEMPORADAS SERIE 2: El Abismo Azul
    {
        serieNombre: 'El Abismo Azul',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2022,
        sinopsis: 'Tensiones crecientes en la estación sumergida tras el hallazgo de la fosa.'
    },
    {
        serieNombre: 'El Abismo Azul',
        numero: 2,
        nombre: 'Temporada 2',
        anioEstreno: 2023,
        sinopsis: 'Invasión de agua en la estructura y el desvelamiento del misterio abisal.'
    },

    // TEMPORADAS SERIE 3: Crónicas de Neo-Tokio
    {
        serieNombre: 'Crónicas de Neo-Tokio',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2024,
        sinopsis: 'Cacería en los subterráneos neón para detener el tráfico ilegítimo de recuerdos.'
    },
    {
        serieNombre: 'Crónicas de Neo-Tokio',
        numero: 2,
        nombre: 'Temporada 2',
        anioEstreno: 2025,
        sinopsis: 'La rebelión androide toma fuerza tras revelar la verdadera identidad del creador.'
    },

    // TEMPORADAS SERIE 4: Sombras del Pasado
    {
        serieNombre: 'Sombras del Pasado',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2021,
        sinopsis: 'Análisis de las pistas dejadas hace tres décadas y contradicciones en los informes.'
    },
    {
        serieNombre: 'Sombras del Pasado',
        numero: 2,
        nombre: 'Temporada 2',
        anioEstreno: 2022,
        sinopsis: 'Juicio decisivo donde se confrontan las autoridades corruptas de la ciudad.'
    },

    // TEMPORADAS SERIE 5: Reino de Cenizas
    {
        serieNombre: 'Reino de Cenizas',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2023,
        sinopsis: 'Alianzas endebles y batallas por los territorios fronterizos del Imperio.'
    },
    {
        serieNombre: 'Reino de Cenizas',
        numero: 2,
        nombre: 'Temporada 2',
        anioEstreno: 2024,
        sinopsis: 'La batalla final por el control de la Forja Solar y el resplandor Supremo.'
    },

    // TEMPORADAS SERIE 6: Risas de Oficina
    {
        serieNombre: 'Risas de Oficina',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2022,
        sinopsis: 'El equipo lucha por salvar la empresa de la quiebra inminente.'
    },
    {
        serieNombre: 'Risas de Oficina',
        numero: 2,
        nombre: 'Temporada 2',
        anioEstreno: 2023,
        sinopsis: 'Nuevos inversionistas intentan automatizar a todo el personal creativo.'
    },

    // TEMPORADAS SERIE 7: Horizonte Cero
    {
        serieNombre: 'Horizonte Cero',
        numero: 1,
        nombre: 'Temporada 1',
        anioEstreno: 2024,
        sinopsis: 'Primer mes de aislamiento total y enfrentamiento por el control del oxígeno.'
    },
    {
        serieNombre: 'Horizonte Cero',
        numero: 2,
        nombre: 'Temporada 2',
        anioEstreno: 2025,
        sinopsis: 'Construcción del domo exterior y recepción de una misteriosa señal de radio.'
    }
]

// --------------------------------------------------
// EPISODIOS
// --------------------------------------------------

const mockEpisodios = [

    // CHERNOBYL - TEMPORADA 1
    {
        serieNombre: 'Chernobyl',
        temporadaNumero: 1,
        numero: 1,
        titulo: '1:23:45',
        duracion: 62,
        sinopsis: 'Una explosión en la central nuclear de Chernóbil provoca una emergencia que los trabajadores y bomberos intentan controlar.',
        fechaEstreno: '2019-05-06'
    },
    {
        serieNombre: 'Chernobyl',
        temporadaNumero: 1,
        numero: 2,
        titulo: 'Please Remain Calm',
        duracion: 69,
        sinopsis: 'Los científicos intentan comprender la magnitud del desastre mientras las autoridades organizan la evacuación de la población.',
        fechaEstreno: '2019-05-13'
    },
    {
        serieNombre: 'Chernobyl',
        temporadaNumero: 1,
        numero: 3,
        titulo: 'Open Wide, O Earth',
        duracion: 65,
        sinopsis: 'Las consecuencias de la radiación afectan a los habitantes y trabajadores que estuvieron expuestos al accidente.',
        fechaEstreno: '2019-05-20'
    },
    {
        serieNombre: 'Chernobyl',
        temporadaNumero: 1,
        numero: 4,
        titulo: 'The Happiness of All Mankind',
        duracion: 72,
        sinopsis: 'Los equipos de descontaminación trabajan para retirar los residuos radiactivos mientras continúa la investigación.',
        fechaEstreno: '2019-05-27'
    },
    {
        serieNombre: 'Chernobyl',
        temporadaNumero: 1,
        numero: 5,
        titulo: 'Vichnaya Pamyat',
        duracion: 72,
        sinopsis: 'Se reconstruyen los acontecimientos que provocaron el accidente y se exponen las decisiones que contribuyeron a la tragedia.',
        fechaEstreno: '2019-06-03'
    },

    // OVER THE GARDEN WALL - TEMPORADA 1
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 1,
        titulo: 'The Old Grist Mill',
        duracion: 12,
        sinopsis: 'Wirt y Greg se pierden en un bosque desconocido y conocen a un leñador que les advierte sobre una criatura peligrosa.',
        fechaEstreno: '2014-11-03'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 2,
        titulo: "Hard Times at the Huskin' Bee",
        duracion: 12,
        sinopsis: 'Los hermanos conocen a Beatrice, un pájaro azul que les ofrece ayuda para encontrar el camino a casa.',
        fechaEstreno: '2014-11-03'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 3,
        titulo: 'Schooltown Follies',
        duracion: 12,
        sinopsis: 'Wirt, Greg y Beatrice llegan a una escuela habitada por animales que esconden un problema inesperado.',
        fechaEstreno: '2014-11-04'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 4,
        titulo: 'Songs of the Dark Lantern',
        duracion: 12,
        sinopsis: 'Los hermanos buscan orientación en una taberna llena de personajes extraños.',
        fechaEstreno: '2014-11-04'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 5,
        titulo: 'Mad Love',
        duracion: 12,
        sinopsis: 'Wirt y Greg llegan a una mansión donde una situación aparentemente romántica se convierte en algo inquietante.',
        fechaEstreno: '2014-11-05'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 6,
        titulo: 'Lullaby in Frogland',
        duracion: 12,
        sinopsis: 'Los hermanos viajan en un barco lleno de ranas y se encuentran con nuevos personajes durante su recorrido.',
        fechaEstreno: '2014-11-05'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 7,
        titulo: 'The Ringing of the Bell',
        duracion: 12,
        sinopsis: 'Wirt y Greg conocen a una joven que vive en una casa donde suceden acontecimientos sobrenaturales.',
        fechaEstreno: '2014-11-06'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 8,
        titulo: 'Babes in the Wood',
        duracion: 12,
        sinopsis: 'Greg y Wirt se enfrentan a una situación que pone a prueba su esperanza de regresar a casa.',
        fechaEstreno: '2014-11-06'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 9,
        titulo: 'Into the Unknown',
        duracion: 12,
        sinopsis: 'Un recuerdo revela cómo Wirt y Greg llegaron al misterioso mundo conocido como Lo Desconocido.',
        fechaEstreno: '2014-11-07'
    },
    {
        serieNombre: 'Over the Garden Wall',
        temporadaNumero: 1,
        numero: 10,
        titulo: 'The Unknown',
        duracion: 12,
        sinopsis: 'Los hermanos se enfrentan a la Bestia en el capítulo final de su aventura.',
        fechaEstreno: '2014-11-07'
    },

    // EPISODIOS: Código Ecos (T1 & T2)
    { serieNombre: 'Código Ecos', temporadaNumero: 1, numero: 1, titulo: 'Frecuencia Cero', duracion: 45, sinopsis: 'El equipo detecta un patrón inusual en los servidores de la ciudad.', fechaEstreno: '2023-01-10' },
    { serieNombre: 'Código Ecos', temporadaNumero: 1, numero: 2, titulo: 'Resonancia', duracion: 48, sinopsis: 'Una catástrofe evitada levanta las sospechas del gobierno.', fechaEstreno: '2023-01-17' },
    { serieNombre: 'Código Ecos', temporadaNumero: 1, numero: 3, titulo: 'Interferencia', duracion: 50, sinopsis: 'Descubren que el origen del mensaje proviene del espacio profundo.', fechaEstreno: '2023-01-24' },
    { serieNombre: 'Código Ecos', temporadaNumero: 2, numero: 1, titulo: 'Apagón Global', duracion: 52, sinopsis: 'La red eléctrica se detiene por completo en tres continentes.', fechaEstreno: '2024-02-01' },
    { serieNombre: 'Código Ecos', temporadaNumero: 2, numero: 2, titulo: 'Ecos del Pasado', duracion: 49, sinopsis: 'Decodifican un archivo oculto creado hace más de cincuenta años.', fechaEstreno: '2024-02-08' },
    { serieNombre: 'Código Ecos', temporadaNumero: 2, numero: 3, titulo: 'El Último Transmisor', duracion: 55, sinopsis: 'Se realiza la transmisión final para intentar salvar las comunicaciones.', fechaEstreno: '2024-02-15' },

    // EPISODIOS: El Abismo Azul (T1 & T2)
    { serieNombre: 'El Abismo Azul', temporadaNumero: 1, numero: 1, titulo: 'Presión Crítica', duracion: 50, sinopsis: 'La estación marina detecta vibraciones desconocidas a gran profundidad.', fechaEstreno: '2022-04-05' },
    { serieNombre: 'El Abismo Azul', temporadaNumero: 1, numero: 2, titulo: 'Luces en la Oscuridad', duracion: 53, sinopsis: 'Un sumergible no tripulado captura imágenes inquietantes de una estructura antigua.', fechaEstreno: '2022-04-12' },
    { serieNombre: 'El Abismo Azul', temporadaNumero: 1, numero: 3, titulo: 'Falta de Oxígeno', duracion: 47, sinopsis: 'Fallas técnicas obligan a la tripulación a aislar el módulo principal.', fechaEstreno: '2022-04-19' },
    { serieNombre: 'El Abismo Azul', temporadaNumero: 2, numero: 1, titulo: 'Inundación', duracion: 51, sinopsis: 'El módulo secundario colapsa y la tripulación busca refugio.', fechaEstreno: '2023-05-10' },
    { serieNombre: 'El Abismo Azul', temporadaNumero: 2, numero: 2, titulo: 'Llamado Abisal', duracion: 54, sinopsis: 'Extraños sonidos a través del casco manipulan la mente del capitán.', fechaEstreno: '2023-05-17' },
    { serieNombre: 'El Abismo Azul', temporadaNumero: 2, numero: 3, titulo: 'Emergencia a la Superficie', duracion: 58, sinopsis: 'Los sobrevivientes intentan un ascenso desesperado.', fechaEstreno: '2023-05-24' },

    // EPISODIOS: Crónicas de Neo-Tokio (T1 & T2)
    { serieNombre: 'Crónicas de Neo-Tokio', temporadaNumero: 1, numero: 1, titulo: 'Luces de Neón', duracion: 24, sinopsis: 'Kenji acepta investigar la desaparición de un chip de memoria militar.', fechaEstreno: '2024-03-01' },
    { serieNombre: 'Crónicas de Neo-Tokio', temporadaNumero: 1, numero: 2, titulo: 'El Mercado Negro', duracion: 23, sinopsis: 'Una incursión en los bajos fondos revela conexiones con altos ejecutivos.', fechaEstreno: '2024-03-08' },
    { serieNombre: 'Crónicas de Neo-Tokio', temporadaNumero: 1, numero: 3, titulo: 'Líneas de Código', duracion: 25, sinopsis: 'La androide Aoi descifra la contraseña que revela un plan secreto.', fechaEstreno: '2024-03-15' },
    { serieNombre: 'Crónicas de Neo-Tokio', temporadaNumero: 2, numero: 1, titulo: 'Alianza de Androides', duracion: 24, sinopsis: 'Aoi busca refugio con un grupo de sintéticos rebeldes.', fechaEstreno: '2025-04-02' },
    { serieNombre: 'Crónicas de Neo-Tokio', temporadaNumero: 2, numero: 2, titulo: 'Protocolo de Purga', duracion: 26, sinopsis: 'Las fuerzas corporativas despliegan cazadores para erradicar la rebelión.', fechaEstreno: '2025-04-09' },
    { serieNombre: 'Crónicas de Neo-Tokio', temporadaNumero: 2, numero: 3, titulo: 'Conciencia Libre', duracion: 28, sinopsis: 'Una transmisión masiva libera los recuerdos restringidos de la población.', fechaEstreno: '2025-04-16' },

    // EPISODIOS: Sombras del Pasado (T1 & T2)
    { serieNombre: 'Sombras del Pasado', temporadaNumero: 1, numero: 1, titulo: 'Expediente Perdido', duracion: 42, sinopsis: 'Elena encuentra inconsistencias clave en las pruebas archivadas de 1995.', fechaEstreno: '2021-09-02' },
    { serieNombre: 'Sombras del Pasado', temporadaNumero: 1, numero: 2, titulo: 'Testigo Anónimo', duracion: 45, sinopsis: 'Una pista la conduce a un antiguo oficial de policía en retiro.', fechaEstreno: '2021-09-09' },
    { serieNombre: 'Sombras del Pasado', temporadaNumero: 1, numero: 3, titulo: 'Secretos de Familia', duracion: 44, sinopsis: 'Descubre que la familia de la víctima oculta un segundo testamento.', fechaEstreno: '2021-09-16' },
    { serieNombre: 'Sombras del Pasado', temporadaNumero: 2, numero: 1, titulo: 'Nuevas Pruebas', duracion: 46, sinopsis: 'La fiscalía admite evidencia de ADN que cambia el rumbo del caso.', fechaEstreno: '2022-10-05' },
    { serieNombre: 'Sombras del Pasado', temporadaNumero: 2, numero: 2, titulo: 'Amenazas en la Sombra', duracion: 43, sinopsis: 'Elena recibe presiones externas para retirar los cargos presentados.', fechaEstreno: '2022-10-12' },
    { serieNombre: 'Sombras del Pasado', temporadaNumero: 2, numero: 3, titulo: 'Veredicto Final', duracion: 50, sinopsis: 'La verdad sale a la luz tras una intensa jornada en los tribunales.', fechaEstreno: '2022-10-19' },

    // EPISODIOS: Reino de Cenizas (T1 & T2)
    { serieNombre: 'Reino de Cenizas', temporadaNumero: 1, numero: 1, titulo: 'La Caída del Trono', duracion: 58, sinopsis: 'La muerte del viejo rey desata la disputa por el trono de la capital.', fechaEstreno: '2023-06-12' },
    { serieNombre: 'Reino de Cenizas', temporadaNumero: 1, numero: 2, titulo: 'Estrategia de Acero', duracion: 55, sinopsis: 'Las casas del norte forjan una alianza para resguardar la frontera.', fechaEstreno: '2023-06-19' },
    { serieNombre: 'Reino de Cenizas', temporadaNumero: 1, numero: 3, titulo: 'La Forja Escondida', duracion: 60, sinopsis: 'Exploradores descubren la mítica forja en el corazón de la montaña.', fechaEstreno: '2023-06-26' },
    { serieNombre: 'Reino de Cenizas', temporadaNumero: 2, numero: 1, titulo: 'Marcha de Sombras', duracion: 57, sinopsis: 'Un ejército rebelde avanza hacia las puertas de la fortaleza central.', fechaEstreno: '2024-07-10' },
    { serieNombre: 'Reino de Cenizas', temporadaNumero: 2, numero: 2, titulo: 'Fuego Antiguo', duracion: 62, sinopsis: 'La energía de la forja se despierta provocando caos entre las tropas.', fechaEstreno: '2024-07-17' },
    { serieNombre: 'Reino de Cenizas', temporadaNumero: 2, numero: 3, titulo: 'La Nueva Era', duracion: 65, sinopsis: 'Se corona al nuevo gobernante entre las ruinas del antiguo imperio.', fechaEstreno: '2024-07-24' },

    // EPISODIOS: Risas de Oficina (T1 & T2)
    { serieNombre: 'Risas de Oficina', temporadaNumero: 1, numero: 1, titulo: 'El Nuevo Cliente', duracion: 22, sinopsis: 'La agencia debe diseñar una campaña absurda para una marca de calcetines.', fechaEstreno: '2022-02-14' },
    { serieNombre: 'Risas de Oficina', temporadaNumero: 1, numero: 2, titulo: 'Café en Mal Estado', duracion: 20, sinopsis: 'Una confusión con las compras desata el caos durante una reunión clave.', fechaEstreno: '2022-02-21' },
    { serieNombre: 'Risas de Oficina', temporadaNumero: 1, numero: 3, titulo: 'La Auditoría', duracion: 25, sinopsis: 'Los empleados intentan esconder sus gastos insólitos al inspector.', fechaEstreno: '2022-02-28' },
    { serieNombre: 'Risas de Oficina', temporadaNumero: 2, numero: 1, titulo: 'Inteligencia Artificial', duracion: 21, sinopsis: 'Instalan un software automático que empieza a reemplazar las tareas diarias.', fechaEstreno: '2023-03-05' },
    { serieNombre: 'Risas de Oficina', temporadaNumero: 2, numero: 2, titulo: 'Retiro en la Naturaleza', duracion: 23, sinopsis: 'Un viaje de integración laboral sale completamente mal en el bosque.', fechaEstreno: '2023-03-12' },
    { serieNombre: 'Risas de Oficina', temporadaNumero: 2, numero: 3, titulo: 'Fiesta de Fin de Año', duracion: 26, sinopsis: 'Celebran la supervivencia de la empresa con una fiesta caótica.', fechaEstreno: '2023-03-19' },

    // EPISODIOS: Horizonte Cero (T1 & T2)
    { serieNombre: 'Horizonte Cero', temporadaNumero: 1, numero: 1, titulo: 'Aislamiento', duracion: 48, sinopsis: 'La colonia en Marte pierde la señal con la Tierra y declara estado de emergencia.', fechaEstreno: '2024-01-15' },
    { serieNombre: 'Horizonte Cero', temporadaNumero: 1, numero: 2, titulo: 'Reservas Rojas', duracion: 50, sinopsis: 'Se racionan las reservas de agua y surgen disputas entre científicos.', fechaEstreno: '2024-01-22' },
    { serieNombre: 'Horizonte Cero', temporadaNumero: 1, numero: 3, titulo: 'Tormenta de Arena', duracion: 52, sinopsis: 'Una tormenta masiva daña los paneles solares exteriores de la base.', fechaEstreno: '2024-01-29' },
    { serieNombre: 'Horizonte Cero', temporadaNumero: 2, numero: 1, titulo: 'Semillas en Marte', duracion: 49, sinopsis: 'Inicia el proyecto de cultivo experimental en suelo marciano.', fechaEstreno: '2025-02-10' },
    { serieNombre: 'Horizonte Cero', temporadaNumero: 2, numero: 2, titulo: 'Eco Distante', duracion: 51, sinopsis: 'Capta una señal misteriosa de radio proveniente de una coordenada lejana.', fechaEstreno: '2025-02-17' },
    { serieNombre: 'Horizonte Cero', temporadaNumero: 2, numero: 3, titulo: 'El Gran Domo', duracion: 56, sinopsis: 'Finaliza la construcción del domo que garantiza el futuro de la colonia.', fechaEstreno: '2025-02-24' }
]

// --------------------------------------------------
// FUNCIONES PARA SEMBRAR CONTENIDOS
// --------------------------------------------------

async function sembrarContenidos() {
    const seriesMap = new Map()

    for (const item of mockContents) {
        const generosNombres = item.generos.map(
            id => genresMap[id] || 'General'
        )

        const datos = {
            nombre: item.nombre,
            categoria: item.categoria,
            anio: item.anio,
            poster: item.poster,
            banner: item.banner,
            duracion: item.duracion,
            sinopsis: item.sinopsis,
            generos: generosNombres,
            calificacion: item.calificacion,
            videoUrl: item.videoUrl
        }

        if (item.categoria === 'serie') {
            const serie = await Serie.create({
                ...datos,
                categoria: 'serie'
            })

            // Guardamos el ID real de MongoDB
            seriesMap.set(item.nombre, serie._id)

        } else if (item.categoria === 'cortometraje') {
            await Cortometraje.create({
                ...datos,
                categoria: 'cortometraje'
            })

        } else {
            await Pelicula.create(datos)
        }
    }

    return seriesMap
}

// --------------------------------------------------
// FUNCIÓN PARA SEMBRAR TEMPORADAS
// --------------------------------------------------

async function sembrarTemporadas(seriesMap) {
    const temporadasMap = new Map()

    for (const item of mockTemporadas) {
        const serieId = seriesMap.get(item.serieNombre)

        if (!serieId) {
            throw new Error(
                `No se encontró la serie: ${item.serieNombre}`
            )
        }

        const temporada = await Temporada.create({
            serieId,
            numero: item.numero,
            nombre: item.nombre,
            anioEstreno: item.anioEstreno,
            sinopsis: item.sinopsis
        })

        // Relacionamos el nombre de la serie y número de temporada
        // con el ID generado por MongoDB.
        const clave = `${item.serieNombre}:${item.numero}`

        temporadasMap.set(clave, temporada._id)
    }

    return temporadasMap
}

// --------------------------------------------------
// FUNCIÓN PARA SEMBRAR EPISODIOS
// --------------------------------------------------

async function sembrarEpisodios(temporadasMap) {
    let totalEpisodios = 0

    for (const item of mockEpisodios) {
        const clave = `${item.serieNombre}:${item.temporadaNumero}`

        const temporadaId = temporadasMap.get(clave)

        if (!temporadaId) {
            throw new Error(
                `No se encontró la temporada ${item.temporadaNumero} de ${item.serieNombre}`
            )
        }

        await Episodio.create({
            temporadaId,
            numero: item.numero,
            titulo: item.titulo,
            duracion: item.duracion,
            sinopsis: item.sinopsis,
            fechaEstreno: new Date(`${item.fechaEstreno}T12:00:00.000Z`)
        })

        totalEpisodios++
    }

    return totalEpisodios
}

// --------------------------------------------------
// FUNCIÓN PRINCIPAL
// --------------------------------------------------

async function sembrarDatos() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log('Conectado a MongoDB Atlas para sembrar datos iniciales...')

        const totalPelis = await Pelicula.countDocuments()
        const totalSeries = await Serie.countDocuments()
        const totalCortos = await Cortometraje.countDocuments()

        // Se conserva la comprobación original.
        if (totalPelis > 0 || totalSeries > 0 || totalCortos > 0) {
            console.log(
                `Ya existen datos (${totalPelis} películas, ${totalSeries} series, ${totalCortos} cortometrajes). Omitiendo sembrado.`
            )

            return
        }

        // 1. Primero creamos películas, series y cortometrajes.
        const seriesMap = await sembrarContenidos()

        // 2. Después creamos las temporadas relacionadas con sus series.
        const temporadasMap = await sembrarTemporadas(seriesMap)

        // 3. Finalmente creamos los episodios relacionados con sus temporadas.
        const totalEpisodios = await sembrarEpisodios(temporadasMap)

        console.log('¡Datos iniciales sembrados con éxito en MongoDB Atlas!')

        console.log(`
        RESUMEN DEL SEMBRADO

        Películas: ${await Pelicula.countDocuments()}
        Series: ${await Serie.countDocuments()}
        Cortometrajes: ${await Cortometraje.countDocuments()}
        Temporadas: ${await Temporada.countDocuments()}
        Episodios: ${totalEpisodios}
        `)

    } catch (error) {
        console.error('Error al sembrar datos:', error.message)

    } finally {
        await mongoose.disconnect()
        console.log('Conexión a MongoDB cerrada.')
    }
}

sembrarDatos()