// Scripts/sesion-global.js
document.addEventListener("DOMContentLoaded", () => {

    const navbarUserBox = document.getElementById("navbarUserBox");
    const btnLoginNav = document.getElementById("btnLoginNav");

    // Usuario guardado en localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!navbarUserBox) return;

    if (!usuario) {
        // No logeado
        if (btnLoginNav) btnLoginNav.style.display = "inline-block";
        navbarUserBox.innerHTML = "";
        return;
    }

    // Logeado → ocultar botón login
    if (btnLoginNav) btnLoginNav.style.display = "none";

    navbarUserBox.innerHTML = `
        <div class="user-box">
            <img src="${usuario.foto}" class="nav-user-photo">
            <span class="nav-user-name">${usuario.nombre}</span>
            <button id="logoutBtn" class="logout-btn">Salir</button>
        </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    });

});

