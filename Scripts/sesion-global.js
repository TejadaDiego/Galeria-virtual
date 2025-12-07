// Scripts/sesion-global.js

document.addEventListener("DOMContentLoaded", () => {

    const navbarUserBox = document.getElementById("navbarUserBox");
    const btnLoginNav   = document.getElementById("btnLoginNav");

    // Si no existe la navbar, no hacer nada
    if (!navbarUserBox) return;

    // Extraer los datos de sesión del usuario
    const nombre = sessionStorage.getItem("nombre");
    const foto   = sessionStorage.getItem("foto");

    // Si no hay sesión → mostrar botón "Iniciar sesión"
    if (!nombre) {
        if (btnLoginNav) btnLoginNav.style.display = "inline-block";
        navbarUserBox.innerHTML = "";
        return;
    }

    // Si hay sesión → ocultar botón "Iniciar Sesión"
    if (btnLoginNav) btnLoginNav.style.display = "none";

    // Mostrar información del usuario
    navbarUserBox.innerHTML = `
        <div class="user-box">
            <img src="${foto || 'https://cdn-icons-png.flaticon.com/512/709/709699.png'}" class="nav-user-photo">
            <span class="nav-user-name">${nombre}</span>
        </div>
    `;
});
