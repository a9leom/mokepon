// Función a ejecutar tras haberse cargado el HTML
function iniciarJuego() {
    // Seleccionando desde JS un elemento de HTML
    let botonMascotaJugador = document.getElementById("boton-mascota")
    // Escuchando evento click del elemento botón
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}
// Función a ejecutar tras dar click al botón seleccionar (mascota)
function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')

    if (inputHipodoge.checked) {
        alert('Seleccionaste a Hipodoge')
    } else if (inputCapipepo.checked) {
        alert('Seleccionaste a Capipepo')
    } else if (inputRatigueya.checked) {
        alert('Seleccionaste a Ratigüeya')
    } else {
        alert('Debes seleccionar una mascota')
    }
}

/* Escuchar evento del objeto window. Con load pedimos al navegador que avise cunado el HTML ya haya cargado */
window.addEventListener('load', iniciarJuego)