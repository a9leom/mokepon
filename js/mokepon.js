// Seleccionando elementos del HTML
// Función iniciarJuego
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById('boton-reiniciar')

// Función seleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

// Función seleccionarMascotaEnemigo
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

// Función combate
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

// Función crearMensaje
const divMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

// Otras variables globales
let mokepones = [] // Variable tipo array
let opcionDeMokepones
let ataquesMokepon
let ataquesMokeponEnemigo
let botones = []
let ataqueJugador = []
let mascotaJugador
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
// Variables que eran const se pasan a let para después guardarles los elementos correspondientes
let inputHipodoge
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra

// Cración de clases
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

// Creación objetos
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5)
let ratigueya = new Mokepon('Ratigüeya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5)

// Agregando ataques a cada mokepón
hipodoge.ataques.push(
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)
capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'}
)
ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
)

// Populamos un array con cada uno de los Mokepones creados
mokepones.push(hipodoge, capipepo, ratigueya)

// Función a ejecutar tras haberse cargado el HTML 2
function iniciarJuego() {
    // Modificando el display de un elemento a través de su propiedad style
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    // Cargando el array que contiene los mokepones al momento de inciar el juego
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="Mokepón ${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        // Una vez creada la estructura HTML se seleccionan los elementos por su id
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigüeya')
    })

    // Escuchando evento de los elementos de HTML
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}
// Función a ejecutar tras dar click al botón seleccionar (mascota)
function seleccionarMascotaJugador() {
    // Modificando el display de un elemento a través de su propiedad style
    sectionSeleccionarMascota.style.display = 'none'
    
    // Se modifica el atributo display de los estilos por defecto
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Debes seleccionar una mascota')
        // Si el jugador no selecciona mascota se muestra la sección elegir mascota y se bloquea la de elegir ataque
        sectionSeleccionarMascota.style.display = 'block'
        sectionSeleccionarAtaque.style.display = 'none'
    }

    // Llamado a función
    extraerAtaques(mascotaJugador)
    // Llamando función
    seleccionarMascotaEnemigo()
}
// Función que busca los ataques del mokepón seleccionado
function extraerAtaques(mascotaJugador) {
    // Variable interna para guardar los ataques del mokepón
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        // Validación
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    // Llamado a función
    mostrarAtaques(ataques)
}
// Fución que inyecta los ataques en el HTML
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque b-ataque">${ataque.nombre}</button>
        `

        // Se inyecta la estructura en el contenedor de HTML
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    // El error que se genera es porque al incio del HTML se busca obtener un elemento de HTML que aún no se ha creado, por esa obtención se traslada aquí
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    // Populo una variable array a través del método querySelectAll, que selecciona todos los elementos que cuenten con un valor específico (en este caso una clase)
    botones = document.querySelectorAll('.b-ataque')
}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
            } else if (e.target.textContent === '🌊') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
            }
            // Llamado a la función
            ataqueAleatorioEnemigo()
        })
    })
}
// Función que se ejecuta justo después que el jugador seleccione mascota
function seleccionarMascotaEnemigo() {
    // Se cambian los parámetros de la función para que se ajusten a los índices del array
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1)
    // Se inyecta, en el HTML, el nombre del mokepón ubicado en el índice señalado
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    // Se guardan los ataques que que tiene el mokepón asignado al enemigo
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    // Llamado a la función
    secuenciaAtaque()
}
// Función para asignar ataque enemigo
function ataqueAleatorioEnemigo() {
    // Se hace la función dinámica al hacerla dependiente de la cantidad de ataques que tenga el mokepón
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)

    // Llamdo a función
    iniciarPelea()
}
// Función que valida si están completos los arreglos de los ataques
function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        // Llamado función
        combate()
    }
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
// Función combate
function combate() {
    // Para recorrer ambos arreglos
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE 😑")
        } else if ((ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') || (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') || (ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA')) {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE 😢")
        }
    }

    // Llamado a función revisarVidas
    revisarVidas()
}
// Función para constatar vidas de las mascotas
function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal('FELICITACIONES! Ganaste 👏')
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste 💔')
    }
}
// Función para insertar nuevos mensajes en la sección mensaje
function crearMensaje(resultado) {
    // Se crea un nuevo elemento, un párrafo en este caso
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    // Se define el mensaje del párrafo utilizando atributo innerHTML
    divMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    // Se inserta el elemento (párrafo) al elemento especificado (section)
    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}
// Función para inserta mensaje de victoria o derrota
function crearMensajeFinal(resultadoFinal) {
    // Se define el mensaje del párrafo utilizando atributo innerHTML
    divMensajes.innerHTML = resultadoFinal
    
    // Bloqueando botones mediante atributo disabled
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    // Se habilita sección de botón reiniciar
    sectionReiniciar.style.display = 'block'
}
// Función para reiniciar juego
function reiniciarJuego() {
    location.reload()
}
// Función de aletoriedad
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/* Escuchar evento del objeto window. Con load pedimos al navegador que avise cunado el HTML ya haya cargado 1 */
window.addEventListener('load', iniciarJuego)