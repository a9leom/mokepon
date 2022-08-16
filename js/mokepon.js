// Funciones globales
let ataqueJugador
let ataqueEnemigo

// Función a ejecutar tras haberse cargado el HTML 2
function iniciarJuego() {
    // Seleccionando desde JS un elemento de HTML
    let botonMascotaJugador = document.getElementById("boton-mascota")
    // Escuchando evento click del elemento botón
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    // Variables selección de ataque
    let botonFuego = document.getElementById('boton-fuego')
    let botonAgua = document.getElementById('boton-agua')
    let botonTierra = document.getElementById('boton-tierra')

    // Escuchando evento click del botones de selección ataque
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
}
// Función a ejecutar tras dar click al botón seleccionar (mascota)
function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigüeya'
    } else {
        alert('Debes seleccionar una mascota')
    }

    // Llamando función
    seleccionarMascotaEnemigo()
}
// Función que se ejecuta justo después que el jugador seleccione mascota
function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = ' Ratigüeya'
    }
}
// Funciones de ataque
function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}
// Función para asignar ataque enemigo
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    // Momento de para llamar a la función de combate
    combate()
}
// Función combate
function combate() {
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE 😑")
    } else if((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') || (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')) {
        crearMensaje("GANASTE 🎉")
    } else {
        crearMensaje("PERDISTE 😭")
    }
}
// Función para insertar nuevos mensajes en la sección mensaje
function crearMensaje(resultado) {
    // Método de manipulación del DOM
    let sectionMensajes = document.getElementById('mensajes')
    // Se crea un nuevo elemento, un párrafo en este caso
    let parrafo = document.createElement('p')
    // Se define el mensaje del párrafo utilizando atributo innerHTML
    parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + ' - ' + resultado
    // Se inserta el elemento (párrafo) al elemento especificado (section)
    sectionMensajes.appendChild(parrafo)
}
// Función de aletoriedad
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/* Escuchar evento del objeto window. Con load pedimos al navegador que avise cunado el HTML ya haya cargado 1 */
window.addEventListener('load', iniciarJuego)