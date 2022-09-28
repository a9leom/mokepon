// Importación librería express
const express = require('express')

// Se crea una aplicación que represente al servidor. Va a recibir las peticiones de los clientes y a responder las mismas

// Variable que almacena la aplicación. Se genera una instancia del servidor
const app = express()

// Variable que guarda lista de jugadores
const jugadores = []

// Clase para crear un jugador
class Jugador {
    constructor(id) {
        this.id = id
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
// Función que mantiene al servidor escuchando las peticiones por medio de un puerto
app.listen(8080, () => {
    console.log('Servidor funcionando')
})