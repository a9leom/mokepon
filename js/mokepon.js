// Función a ejecutar tras haberse cargado el HTML
function iniciarJuego() {
    // Seleccionando desde JS un elemento de HTML
    let botonMascotaJugador = document.getElementById("boton-mascota")
    // Escuchando evento click del elemento botón
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}
// Función a ejecutar tras dar click al botón
function seleccionarMascotaJugador() {
    alert("Seleccionaste tu mascota")
}

/* Escuchar evento del objeto window. Con load pedimos al navegador que avise cunado el HTML ya haya cargado */
window.addEventListener('load', iniciarJuego)