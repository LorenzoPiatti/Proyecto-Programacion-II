window.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombreUsuario");
    if (nombre) {
        const saludo = document.getElementById("saludoUsuario");
        saludo.textContent = `Hola, ${nombre}`;
    }
    const audio = new Audio("static/audio/lobby.mp3");
    audio.loop = true;
    audio.play();
});