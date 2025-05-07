document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("registroForm");
    const usuarioInput = document.getElementById("usuario");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const generoInput = document.getElementById("genero");
    const terminosInput = document.getElementById("terminos");

    

    usuarioInput.addEventListener("input", () => {
        validarUsuario(usuarioInput.value.trim());
    });

    emailInput.addEventListener("input", () => {
        validarEmail(emailInput.value.trim());
    });

    passwordInput.addEventListener("input", () => {
        validarPassword(passwordInput.value.trim());
    });

    generoInput.addEventListener("change", () => {
        validarGenero(generoInput.value);
    });

    terminosInput.addEventListener("change", () => {
        validarTerminos(terminosInput.checked);
    });

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = usuarioInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const genero = generoInput.value;
        const terminos = terminosInput.checked;

        const esUsuarioValido = validarUsuario(usuario);
        const esEmailValido = validarEmail(email);
        const esPasswordValido = validarPassword(password);
        const esGeneroValido = validarGenero(genero);
        const esTerminosValido = validarTerminos(terminos);

        if (esUsuarioValido && esEmailValido && esPasswordValido && esGeneroValido && esTerminosValido) {
            formulario.reset();
            resetearValidacion();
            alert("¡Registro exitoso!");
        }
    });
});

function validarUsuario(usuario) {
    const grupo = document.getElementById("grupo-usuario");
    const input = grupo.querySelector("input");
    const icon = grupo.querySelector(".validation-icon");
    const error = grupo.querySelector(".error-message");

    const regex = /^[a-zA-Z0-9_]{4,16}$/;
    if (!regex.test(usuario)) {
        aplicarError(grupo, icon, error, "El usuario debe tener de 4 a 16 caracteres y solo letras, números o guión bajo.");
        return false;
    } else {
        aplicarExito(grupo, icon, error);
        return true;
    }
}

function validarEmail(email) {
    const grupo = document.getElementById("grupo-email");
    const icon = grupo.querySelector(".validation-icon");
    const error = grupo.querySelector(".error-message");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        aplicarError(grupo, icon, error, "Ingrese un correo electrónico válido.");
        return false;
    } else {
        aplicarExito(grupo, icon, error);
        return true;
    }
}

function validarPassword(password) {
    const grupo = document.getElementById("grupo-password");
    const icon = grupo.querySelector(".validation-icon");
    const error = grupo.querySelector(".error-message");

    const regex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;
    if (!regex.test(password)) {
        aplicarError(grupo, icon, error, "Debe tener de 6 a 12 caracteres y al menos un carácter especial.");
        return false;
    } else {
        aplicarExito(grupo, icon, error);
        return true;
    }
}

function validarGenero(genero) {
    const grupo = document.getElementById("grupo-genero");
    const icon = grupo.querySelector(".validation-icon");
    const error = grupo.querySelector(".error-message");

    if (genero === "") {
        aplicarError(grupo, icon, error, "Seleccione su género.");
        return false;
    } else {
        aplicarExito(grupo, icon, error);
        return true;
    }
}

function validarTerminos(aceptado) {
    const grupo = document.getElementById("grupo-terminos");
    const icon = grupo.querySelector(".validation-icon");
    const error = grupo.querySelector(".error-message");

    if (!aceptado) {
        if (icon) icon.style.color = "rgba(193, 6, 6, 0.831)";
        error.textContent = "Debe aceptar los términos y condiciones.";
        error.classList.add("active");
        grupo.querySelector(".input-container")?.classList.add("error");
        return false;
    } else {
        if (icon) icon.style.color = "rgba(0, 128, 0, 0.7)";
        error.textContent = "";
        error.classList.remove("active");
        grupo.querySelector(".input-container")?.classList.remove("error");
        grupo.querySelector(".input-container")?.classList.add("success");
        return true;
    }
}

function aplicarError(grupo, icon, mensajeEl, mensaje) {
    const contenedor = grupo.querySelector(".input-container");
    contenedor?.classList.add("error");
    contenedor?.classList.remove("success");
    icon.classList.add("fa-times-circle");
    icon.classList.remove("fa-check-circle");
    icon.style.color = "rgba(193, 6, 6, 0.831)";
    mensajeEl.textContent = mensaje;
    mensajeEl.classList.add("active");
}

function aplicarExito(grupo, icon, mensajeEl) {
    const contenedor = grupo.querySelector(".input-container");
    contenedor?.classList.remove("error");
    contenedor?.classList.add("success");
    icon.classList.remove("fa-times-circle");
    icon.classList.add("fa-check-circle");
    icon.style.color = "rgba(0, 128, 0, 0.7)";
    mensajeEl.textContent = "";
    mensajeEl.classList.remove("active");
}

function mostrarError(input, mensaje) {
    const grupo = input.closest(".form-group");
    const contenedor = grupo.querySelector(".input-container");
    const icono = grupo.querySelector(".validation-icon");
    const mensajeEl = grupo.querySelector(".error-message");

    contenedor?.classList.add("error");
    contenedor?.classList.remove("success");
    icono?.classList.add("fa-times-circle");
    icono?.classList.remove("fa-check-circle");
    icono.style.color = "rgba(193, 6, 6, 0.831)";
    mensajeEl.textContent = mensaje;
    mensajeEl.classList.add("active");
}

function resetearValidacion() {
    document.querySelectorAll(".form-group").forEach(grupo => {
        const contenedor = grupo.querySelector(".input-container");
        contenedor?.classList.remove("error", "success");
        const icon = grupo.querySelector(".validation-icon");
        icon?.classList.remove("fa-times-circle", "fa-check-circle");
        icon.style.color = "transparent";
        const mensajeEl = grupo.querySelector(".error-message");
        mensajeEl.textContent = "";
        mensajeEl.classList.remove("active");
    });
}