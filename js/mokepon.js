// Función a ejecutar tras suceder el evento
function seleccionarMascotaJugador() {
    alert("Seleccionaste tu mascota")
}

// Seleccionando desde JS un elemento de HTML
let botonMascotaJugador = document.getElementById("boton-mascota")
// Escuchando evento click del botón
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)