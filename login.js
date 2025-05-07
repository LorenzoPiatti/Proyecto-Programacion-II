document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("loginForm");
    const usuarioInput = document.getElementById("usuario");
    const passwordInput = document.getElementById("password");



    usuarioInput.addEventListener("input", () => {
        validarUsuario(usuarioInput.value.trim());
    });

    passwordInput.addEventListener("input", () => {
        validarPassword(passwordInput.value.trim());
    });

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = usuarioInput.value.trim();
        const password = passwordInput.value.trim();

        const esUsuarioValido = validarUsuario(usuario);
        const esPasswordValida = validarPassword(password);

        if (esUsuarioValido && esPasswordValida) {
            formulario.reset();
            resetearValidacion();
            alert("¡Inicio de sesión exitoso!");
        }
    });
});

function validarUsuario(usuario) {
    const inputGroup = document.getElementById("grupo-usuario");
    const input = inputGroup.querySelector("input");
    const icon = inputGroup.querySelector(".validation-icon");
    const error = inputGroup.querySelector(".error-message");

    if (usuario === "" || !/^[a-zA-Z0-9_-]{4,16}$/.test(usuario)) {
        aplicarError(inputGroup, input, icon, error, "El usuario tiene que ser de 4 a 16 dígitos y solo puede contener números, letras y guion bajo.");
        return false;
    } else {
        aplicarExito(inputGroup, input, icon, error);
        return true;
    }
}

function validarPassword(password) {
    const inputGroup = document.getElementById("grupo-password");
    const input = inputGroup.querySelector("input");
    const icon = inputGroup.querySelector(".validation-icon");
    const error = inputGroup.querySelector(".error-message");

    const regex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;
    
    if (password === "" || !regex.test(password)) {
        aplicarError(inputGroup, input, icon, error, "La contraseña tiene que ser de 6 a 12 dígitos y debe contener al menos un caracter especial.");
        return false;
    } else {
        aplicarExito(inputGroup, input, icon, error);
        return true;
    }
}

function aplicarError(grupo, input, icono, mensajeEl, mensaje) {
    const contenedor = grupo.querySelector(".input-container");
    contenedor.classList.add("error");
    contenedor.classList.remove("success");
    icono.classList.add("fa-times-circle");
    icono.classList.remove("fa-check-circle");
    icono.style.color = "rgba(193, 6, 6, 0.831)";
    mensajeEl.textContent = mensaje;
    mensajeEl.classList.add("active");
}

function aplicarExito(grupo, input, icono, mensajeEl) {
    const contenedor = grupo.querySelector(".input-container");
    contenedor.classList.remove("error");
    contenedor.classList.add("success");
    icono.classList.remove("fa-times-circle");
    icono.classList.add("fa-check-circle");
    icono.style.color = "rgba(0, 128, 0, 0.7)";
    mensajeEl.textContent = "";
    mensajeEl.classList.remove("active");
}

function mostrarError(input, mensaje) {
    const grupo = input.closest(".form-group");
    const contenedor = grupo.querySelector(".input-container");
    const icono = grupo.querySelector(".validation-icon");
    const mensajeEl = grupo.querySelector(".error-message");

    contenedor.classList.add("error");
    contenedor.classList.remove("success");
    icono.classList.add("fa-times-circle");
    icono.classList.remove("fa-check-circle");
    icono.style.color = "rgba(193, 6, 6, 0.831)";
    mensajeEl.textContent = mensaje;
    mensajeEl.classList.add("active");
}

function resetearValidacion() {
    document.querySelectorAll(".form-group").forEach(grupo => {
        const contenedor = grupo.querySelector(".input-container");
        contenedor.classList.remove("error", "success");

        const icon = grupo.querySelector(".validation-icon");
        icon.classList.remove("fa-times-circle", "fa-check-circle");
        icon.style.color = "transparent";

        const mensajeEl = grupo.querySelector(".error-message");
        mensajeEl.textContent = "";
        mensajeEl.classList.remove("active");
    });
}
