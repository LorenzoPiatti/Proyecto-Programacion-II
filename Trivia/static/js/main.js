window.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombreUsuario");
    if (nombre) {
        const saludo = document.getElementById("saludoUsuario");
        saludo.textContent = `Hola, ${nombre}`;
    }
});