const body = document.body;
const sonidoRuta = body.dataset.sonido;
const medallaRuta = body.dataset.medalla;
const relojRuta = body.dataset.reloj;
const mainUrl = body.dataset.mainUrl;

const sonidoContador = new Audio(sonidoRuta);

//cada cat es una lista de objetos con sus preguntas y opciones
const preguntasPorCategoria = {
    arte: [
        { pregunta: "¿Quién pintó la Mona Lisa?", opciones: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"], correcta: 1 },
        { pregunta: "¿Dónde se encuentra el museo del Louvre?", opciones: ["Madrid", "París", "Roma", "Berlín"], correcta: 1 },
        { pregunta: "¿Qué movimiento representa 'El Grito' de Munch?", opciones: ["Cubismo", "Surrealismo", "Expresionismo", "Barroco"], correcta: 2 },
    ],
    ciencia: [
        { pregunta: "¿Cuál es el planeta más grande del sistema solar?", opciones: ["Marte", "Júpiter", "Tierra", "Venus"], correcta: 1 },
        { pregunta: "¿Qué gas respiramos del aire?", opciones: ["Hidrógeno", "Oxígeno", "Nitrógeno", "Helio"], correcta: 1 },
        { pregunta: "¿Cuál es la fórmula del agua?", opciones: ["CO2", "O2", "H2O", "NaCl"], correcta: 2 },
    ],
    deportes: [
        { pregunta: "¿Cuántos jugadores hay en un equipo de fútbol?", opciones: ["11", "7", "9", "10"], correcta: 0 },
        { pregunta: "¿Dónde se originaron los Juegos Olímpicos?", opciones: ["Italia", "Egipto", "Grecia", "China"], correcta: 2 },
        { pregunta: "¿Quién ganó el Mundial de Fútbol 2022?", opciones: ["Argentina", "Alemania", "España", "Uruguay"], correcta: 0 },
    ],
};
// se guarda el estado actual, preguntas elegidas y el tiempo
let categoriaActual = "";
let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;
let tiempo = 30;
let temporizador;
sonidoContador.src = sonidoRuta;

//muestro solo una pantalla a la vez y oculto las demas
function mostrarPantalla(pantalla) {
    if (pantalla === "categoria") {
        document.getElementById("category-screen").style.display = "flex";
    } else {
        document.getElementById("category-screen").style.display = "none";
    }

    if (pantalla === "pregunta") {
        document.getElementById("question-screen").style.display = "flex";
    } else {
        document.getElementById("question-screen").style.display = "none";
    }

    if (pantalla === "resultado") {
        document.getElementById("result-screen").style.display = "flex";
    } else {
        document.getElementById("result-screen").style.display = "none";
    }
}
//cuando se elige una categ se guarda la cat, prepara las preguntas(mas arriba)
// reinicia el puntaje y posicion, muestra la pantalla de pregunts y arranca el reloj
function seleccionarCategoria(cat) {
    categoriaActual = cat;
    preguntas = preguntasPorCategoria[cat];
    preguntaActual = 0;
    puntaje = 0;
    mostrarPantalla("pregunta");
    document.getElementById("category-title").textContent = cat.toUpperCase();
    mostrarPregunta();
    iniciarTemporizador();
}
// muestra la pregunta actual con sus opciones
function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    document.getElementById("question-text").textContent = pregunta.pregunta;

    const contenedor = document.getElementById("answers-box");
    contenedor.innerHTML = "";
    document.getElementById("mensaje-respuesta").style.display = "none";

    pregunta.opciones.forEach((opcion, index) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.textContent = opcion;
        // aca se compara si el indice del boton es igual al indice de la resp correcta
        btn.onclick = () => responder(btn, index === pregunta.correcta);
        contenedor.appendChild(btn);
    });
}

function responder(boton, esCorrecta) {
    clearInterval(temporizador); //para el contador
    const botones = document.querySelectorAll("#answers-box .answer-btn");
    botones.forEach((btn) => (btn.disabled = true)); //deshabilita los otros botones




    if (esCorrecta) {
        boton.classList.add("correct");
        puntaje++;
        mostrarMensaje("correcto");
    } else {
        boton.classList.add("incorrect");
        mostrarMensaje("incorrecto");
    }
}
//muestra el resultado
function mostrarMensaje(tipo) {
    const mensaje = document.getElementById("mensaje-respuesta");
    mensaje.style.display = "block";

    if (tipo === "correcto") {
        mensaje.textContent = "¡Respuesta Correcta!";
        mensaje.className = "mensaje-respuesta mensaje-correcto";
    } else {
        mensaje.textContent = "Respuesta Incorrecta";
        mensaje.className = "mensaje-respuesta mensaje-incorrecto";
    }
}


function siguientePregunta() {
    preguntaActual++;
    //si hay preguntas para mostrar, pasa a la siguiente
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
        iniciarTemporizador();
    } else {
        mostrarResultado();
    }
}
//inicia el reloj de cuenta regresiva
function iniciarTemporizador() {
    sonidoContador.currentTime = 0;
    tiempo = 30;
    if (sonidoContador.paused) {
        sonidoContador.loop = true;
        sonidoContador.play();
    }

    document.getElementById("timer").textContent = tiempo;
    clearInterval(temporizador);
    temporizador = setInterval(() => {
        sonidoContador.play();
        tiempo--;
        document.getElementById("timer").textContent = tiempo;
        if (tiempo === 0) {
            clearInterval(temporizador);
            mostrarMensaje("incorrecto");



            const botones = document.querySelectorAll("#answers-box .answer-btn");
            botones.forEach((btn) => (btn.disabled = true));

            setTimeout(() => {
                siguientePregunta();
            }, 1500);
        }
    }, 1000);
}

function mostrarResultado() {
    // mostrar pantalla final
    mostrarPantalla("resultado");

    document.getElementById("reloj-icono").src = medallaRuta;
    document.getElementById("timer-circle").style.display = "none";
    document.getElementById("score-text").textContent = `Tu puntaje: ${puntaje}/${preguntas.length}`;

    // enviar puntaje a Flask
    fetch("/resultado", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `puntaje=${puntaje}`
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const btnCerrarSesion = document.getElementById("volver-btn");
    btnCerrarSesion.addEventListener("click", () => {
        window.location.href = "/main";
    });
});

function reiniciarJuego() {
    mostrarPantalla("categoria");
    clearInterval(temporizador);
    document.getElementById("timer").textContent = "30";
    document.getElementById("reloj-icono").src = relojRuta;
    document.getElementById("timer-circle").style.display = "flex";// vuelve a hacer visible el reloj y el contador.
    
}

