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

// Constantes del trabajo con canvas
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const anchoMaximoMapa = 350

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
let mokeponJugador
let mokeponEnemigo
let ataques // Variable para guardar los ataques del mokepón jugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
// Variables que eran const se pasan a let para después guardarles los elementos correspondientes
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
// Variables del trabajo con canvas
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = '/assets/mokemap.webp'
let mascotaJugadorObjeto
let anchoMapa = window.innerWidth - 20
// Variables para trabajar con el backend
let jugadorId = null
let mokeponesEnemigos = []
let enemigoId = null

if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa - 20
}

let alturaBuscada = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaBuscada

// Cración de clases
class Mokepon {
    constructor(nombre, foto, vida, tipo, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.tipo = tipo
        this.ataques = []
        this.ancho = 35
        this.alto = 35
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    // Método de la clase
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

// Creación objetos
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, 'AGUA', '/assets/hipodoge.webp')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, 'TIERRA', '/assets/capipepo.webp')
let ratigueya = new Mokepon('Ratigüeya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, 'FUEGO', '/assets/ratigueya.webp')
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, 'FUEGO', '/assets/mokepons_mokepon_langostelvis_attack.png')
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, 'AGUA', '/assets/mokepons_mokepon_tucapalma_attack.png')
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, 'TIERRA', '/assets/mokepons_mokepon_pydos_attack.png')

// Constantes para guardar los ataques de los mokepones
const HIPODOGE_ATAQUES = [
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
]
const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'}
]
const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
]
const LANGOSTELVIS_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
]
const TUCAPLAMA_ATAQUES = [    
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌊', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'}
]
const PYDOS_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌊', id: 'boton-agua'}
]

// ... agregando ataques a cada mokepón sin comportase como una lista
hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)
tucapalma.ataques.push(...TUCAPLAMA_ATAQUES)
pydos.ataques.push(...PYDOS_ATAQUES)

// Populamos un array con cada uno de los Mokepones creados
mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

// Función a ejecutar tras haberse cargado el HTML 2
function iniciarJuego() {
    // Modificando el display de un elemento a través de su propiedad style
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display= 'none'

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
    })
    // Una vez creada la estructura HTML se seleccionan los elementos por su id
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigüeya')
    inputLangostelvis = document.getElementById('Langostelvis')
    inputTucapalma = document.getElementById('Tucapalma')
    inputPydos = document.getElementById('Pydos')

    // Llamado a función
    unirseAlJuego()

    // Escuchando evento de los elementos de HTML
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}
// Invoca el servicio de nodejs
function unirseAlJuego() {
    // Petición al servidor a través de fetch
    fetch('http://localhost:8080/unirse')
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })                
            }
        })
}
// Función a ejecutar tras dar click al botón seleccionar (mascota)
function seleccionarMascotaJugador() {
    // Modificando el display de un elemento a través de su propiedad style
    sectionSeleccionarMascota.style.display = 'none'
    // Se modifica el atributo display de los estilos por defecto
    sectionVerMapa.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else {
        alert('Debes seleccionar una mascota')
        // Si el jugador no selecciona mascota se muestra la sección elegir mascota y se bloquea la de elegir ataque
        sectionSeleccionarMascota.style.display = 'flex'
        sectionSeleccionarAtaque.style.display = 'none'
        sectionVerMapa.style.display = 'none'
    }
    
    // Llamado a función
    seleccionarMokepon(mascotaJugador)
    // Función para mover el mokepón con el mouse o con teclas
    iniciarMapa()
}
// función que envía el id del jugador y el mokepón que seleccionó
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}
function iniciarMapa() {
    // Se modifican las dimensiones del canvas
    mascotaJugadorObjeto = obtenerObjetoMascota()
    // setIterval es una función que llama a otra función para que se ejecute cada cierto tiempo. La función retorna un ID del intervalo con la que se puede remover esta función
    intervalo = setInterval(pintarCanvas, 50)

    // Se añaden escuchadores de eventos para la acción de oprimir teclas
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}
// Función que pinta el background, el Mokepón del jugador y los mokepones enemigos en el canvas
function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height) // Limpia el canvas
    // background
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    // Llamdo función
    enviarPosicion(mascotaJugadorObjeto.x,  mascotaJugadorObjeto.y)
    
    // Se dibujan los mokepones enemigos
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    } else {
        detenerMovimiento()
        clearInterval(intervalo)

        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo)
    }
}
// Función que se ejecuta justo después que el jugador seleccione mascota
function seleccionarMascotaEnemigo(enemigo) {
    // Se inyecta, en el HTML, el nombre del mokepón ubicado en el índice señalado
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    // Se guardan los ataques que que tiene el mokepón asignado al enemigo
    ataquesMokeponEnemigo = enemigo.ataques
    // Se guarda el mokepón del enemigo
    mokeponEnemigo = enemigo
    // Llamado a función
    extraerAtaques(mascotaJugador)
}
// Se envían las coordenadas del mokepón del jugador
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                // ({enemigos}) extrae la variable específica de la respuesta
            .then(function ({enemigos}) {
                console.log(enemigos)
                // El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ''
                    if (mokeponNombre === 'Hipodoge') {
                        mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, 'AGUA', '/assets/hipodoge.webp', enemigo.id)
                        mokeponEnemigo.ataques.push(...HIPODOGE_ATAQUES)
                    } else if (mokeponNombre === 'Capipepo') {
                        mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, 'TIERRA', '/assets/capipepo.webp', enemigo.id)
                        mokeponEnemigo.ataques.push(...CAPIPEPO_ATAQUES)
                    } else if (mokeponNombre === 'Ratigüeya') {
                        mokeponEnemigo = new Mokepon('Ratigüeya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, 'FUEGO', '/assets/ratigueya.webp', enemigo.id)
                        mokeponEnemigo.ataques.push(...RATIGUEYA_ATAQUES)
                    } else if (mokeponNombre === 'Langostelvis') {
                        mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, 'FUEGO', '/assets/mokepons_mokepon_langostelvis_attack.png', enemigo.id)
                        mokeponEnemigo.ataques.push(...LANGOSTELVIS_ATAQUES)
                    } else if (mokeponNombre === 'Tucapalma') {
                        mokeponEnemigo =new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, 'AGUA', '/assets/mokepons_mokepon_tucapalma_attack.png', enemigo.id)
                        mokeponEnemigo.ataques.push(...TUCAPLAMA_ATAQUES)
                    } else if (mokeponNombre === 'Pydos') {
                        mokeponEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, 'TIERRA', '/assets/mokepons_mokepon_pydos_attack.png', enemigo.id)
                        mokeponEnemigo.ataques.push(...PYDOS_ATAQUES)
                    }
                    
                    // Se actualiza la coordenada del mokepón enemigo
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                    return mokeponEnemigo
                })
            })
        }
    })
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        // Validación
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

// Función que busca los ataques del mokepón seleccionado
function extraerAtaques(mascotaJugador) {
    for (let i = 0; i < mokepones.length; i++) {
        // Validación
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
            // Se guarda el mokepón del jugador
            mokeponJugador = mokepones[i]
        }
    }
    // Lamado a función
    validacionTipo(mokeponJugador, mokeponEnemigo)
    // Llamado a función
    mostrarAtaques(ataques)
}
// Función que valida su un tipo se impone sobre otro
function validacionTipo(mokeponJugador, mokeponEnemigo) {
    if (mokeponJugador.tipo === mokeponEnemigo.tipo) {
        console.log('Es un empate en el tipo')
    } else if ((mokeponJugador.tipo === 'FUEGO' && mokeponEnemigo.tipo === 'TIERRA') || (mokeponJugador.tipo === 'AGUA' && mokeponEnemigo.tipo === 'FUEGO') || (mokeponJugador.tipo === 'TIERRA' && mokeponEnemigo.tipo === 'AGUA')) {
        ataques.unshift(
            {nombre: mokeponJugador.ataques[0].nombre, id: mokeponJugador.ataques[0].id}
        )
        console.log(ataques)
    } else {
        ataquesMokeponEnemigo.unshift(
            {nombre: mokeponEnemigo.ataques[0].nombre, id: mokeponEnemigo.ataques[0].id}
        )
        console.log('ataques mokepón enemigo', ataquesMokeponEnemigo)
    }
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

    // Populo una variable array a través del método querySelectAll, que selecciona todos los elementos que cuenten con un valor específico (en este caso una clase)
    botones = document.querySelectorAll('.b-ataque')
    // Llamado a la función
    secuenciaAtaque() // CAMBIAR DE POSICIÓN
}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled = true
            } else if (e.target.textContent === '🌊') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled = true
            }

            // Se envían una vez se han seleccionado los 5 ataques
            if (ataqueJugador.length === 5) {
                // Se envía el ataque seleccionado por el jugador al backend
                enviarAtaques()
            }
        })
    })
}
// Se envían los ataques del jugador al servidor
function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
}

// Función para asignar ataque enemigo
function ataqueAleatorioEnemigo() {
    // Se obtiene un número aleatorio, que servirá como índice, acorde al rango de ataques
    let i = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    // Condición para inyectar en el nuevo array el ataque aleatorio
    if (ataquesMokeponEnemigo[i].nombre === '🔥') {
        ataqueEnemigo.push('FUEGO')
    } else if (ataquesMokeponEnemigo[i].nombre === '🌊') {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    // Se elimina uno de los ataques ubicado en el índice (i)
    ataquesMokeponEnemigo.splice(i, 1)

    // Llamdo a función
    iniciarPelea()
}
// Función que valida si están completos los arreglos de los ataques
function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        botones.forEach((boton) => {
            if (boton.disabled == false) {
                boton.disabled = true
                boton.style.background = '#112F58'
            }
        })
        // Llamado función
        combate()
    }
}
// Función combate
function combate() {
    // Para recorrer ambos arreglos
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE 😑")
        } else if ((ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') || (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') || (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA')) {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE 😢")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    
    // Llamado a función
    revisarVictorias()
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
// Función para constatar victorias del jugador y el enemigo
function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Esto fue un empate! 🤝')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICITACIONES! Ganaste 👏')
    } else {
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

// Función que mueve al mokepón en el canvas
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

/* Escuchar evento del objeto window. Con load pedimos al navegador que avise cunado el HTML ya haya cargado 1 */
window.addEventListener('load', iniciarJuego)