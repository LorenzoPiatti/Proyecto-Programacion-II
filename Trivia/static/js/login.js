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
        const usuario = usuarioInput.value.trim();
        const password = passwordInput.value.trim();

        const esUsuarioValido = validarUsuario(usuario);
        const esPasswordValida = validarPassword(password);
        
        if (!esUsuarioValido || !esPasswordValida) {
            e.preventDefault();
            alert("Por favor completa todos los campos correctamente");
        }
    });
});

function validarUsuario(usuario) {
    const grupo = document.getElementById("grupo-usuario");
    const icon = grupo.querySelector(".validation-icon");
    const mensajeError = grupo.querySelector(".error-message");

    if (usuario === "" || !/^[a-zA-Z0-9_-]{4,16}$/.test(usuario)) {
        aplicarError(grupo, icon, mensajeError, "El usuario debe tener de 4 a 16 caracteres y solo puede contener letras, números, guiones o guiones bajos.");
        return false;
    } else {
        aplicarExito(grupo, icon, mensajeError);
        return true;
    }
}

function validarPassword(password) {
    const grupo = document.getElementById("grupo-password");
    const icon = grupo.querySelector(".validation-icon");
    const mensajeError = grupo.querySelector(".error-message");

    const regex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;

    if (password === "" || !regex.test(password)) {
        aplicarError(grupo, icon, mensajeError, "La contraseña debe tener entre 6 y 12 caracteres y al menos un símbolo especial.");
        return false;
    } else {
        aplicarExito(grupo, icon, mensajeError);
        return true;
    }
}

function aplicarError(grupo, icono, mensajeError, mensaje) {
    const contenedor = grupo.querySelector(".input-container");
    contenedor.classList.add("error");
    contenedor.classList.remove("success");
    icono.classList.add("fa-times-circle");
    icono.classList.remove("fa-check-circle");
    icono.style.color = "rgba(193, 6, 6, 0.831)";
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("active");
}

function aplicarExito(grupo, icono, mensajeError) {
    const contenedor = grupo.querySelector(".input-container");
    contenedor.classList.remove("error");
    contenedor.classList.add("success");
    icono.classList.remove("fa-times-circle");
    icono.classList.add("fa-check-circle");
    icono.style.color = "rgba(0, 128, 0, 0.7)";
    mensajeError.textContent = "";
    mensajeError.classList.remove("active");
}

function resetearValidacion() {
    document.querySelectorAll(".form-group").forEach(grupo => {
        const contenedor = grupo.querySelector(".input-container");
        contenedor.classList.remove("error", "success");

        const icon = grupo.querySelector(".validation-icon");
        icon.classList.remove("fa-times-circle", "fa-check-circle");
        icon.style.color = "transparent";

        const mensajeError = grupo.querySelector(".error-message");
        mensajeError.textContent = "";
        mensajeError.classList.remove("active");
    });
}

