// Funciones globales
let ataqueJugador

// Función a ejecutar tras haberse cargado el HTML
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
    let ataqueAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (ataqueAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (ataqueAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = ' Ratigüeya'
    }
}
// Funciones de ataque
function ataqueFuego() {
    ataqueJugador = 'Fuego'
    alert(ataqueJugador)
}
function ataqueAgua() {
    ataqueJugador = 'Agua'
    alert(ataqueJugador)
}
function ataqueTierra() {
    ataqueJugador = 'Tierra'
    alert(ataqueJugador)
}
// Función de aletoriedad
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/* Escuchar evento del objeto window. Con load pedimos al navegador que avise cunado el HTML ya haya cargado */
window.addEventListener('load', iniciarJuego)