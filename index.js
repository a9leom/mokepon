// Importación librería express
const express = require('express')
// Cors es una librería que permite el acceso
const cors = require('cors')

// Se crea una aplicación que represente al servidor. Va a recibir las peticiones de los clientes y a responder las mismas

// Variable que almacena la aplicación. Se genera una instancia del servidor
const app = express()

// Se le indica al servidor, que usa express, que use la librería cors
app.use(cors())
app.use(express.json())

// Variable que guarda lista de jugadores
const jugadores = []

// Clase para crear un jugador
class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

// Función que realiza algo cada que el cliente solicita (get) un recurso
app.get('/unirse', (req, res) => {
    // Se crea el id del jugador nuevo
    const id = `${Math.random()}` // template string

    // Se intancia el nuevo jugador
    const jugador = new Jugador(id)

    // Se agrega el nuevo jugador a la lista de jugadores
    jugadores.push(jugador)

    // Se agrega una cabecera que indica al navegador que se permiten llamadas desde cualquier origen *
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Devuelve el id del jugador creado
    res.send(id)
})

app.post('/mokepon/:jugadorId', (req, res) => {
    // Se extrae el id que viene en la solicitud como parámetro
    const jugadorId = req.params.jugadorId || ''
    // Extrae la información del paquete de datos tipo JSON (el mokepón seleccionado)
    const nombre = req.body.mokepon || ''
    const mokepon = new Mokepon(nombre)
    
    // Extrae el index de la lista de jugadores de acuerdo a una validación
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    // valida que el jugador exista (0 o > es que existe)
    if (jugadorIndex >= 0) {
        // asigna al jugador existente en la lista, a través de un método de la clase, el mokepón correspondiente
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    // Termina la petición
    res.end()
})

// Servicion que actualiza las coordenadas del jugador
app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    // se obtiene coordendas 'x' y 'y'
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        // Se actualizan las coordenadas 'x' y 'y' mediante un método de la clase
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    // Se filtran todos lo jugadores, menos el actual
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    // Se configura la respuesta para que envíe las coordenadas de todos los demás jugadores, menos del que hace la solicitud. En express solo se pueden devolver json
    res.send({
        enemigos
    })
})

app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    // Se extrae el id que viene en la solicitud como parámetro
    const jugadorId = req.params.jugadorId || ''
    // Extrae la información del paquete de datos tipo JSON (los atques del mokepón del jugador)
    const ataques = req.body.ataques || ''
    
    // Extrae el index de la lista de jugadores de acuerdo a una validación
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    // valida que el jugador exista (0 o > es que existe)
    if (jugadorIndex >= 0) {
        // asigna al jugador existente en la lista, a través de un método de la clase, el mokepón correspondiente
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    // Termina la petición
    res.end()
})

// Función que mantiene al servidor escuchando las peticiones por medio de un puerto
app.listen(8080, () => {
    console.log('Servidor funcionando')
})