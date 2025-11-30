function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    location.href = "login.html";
}

/* =============================================
   ❗ CONTROL ÚNICO DEL NAVBAR (Versión final)
   — Funciona igual que en inicio.html en TODAS
============================================= */

document.addEventListener("DOMContentLoaded", () => {
    const usuarioNav = document.getElementById("usuarioNav");
    const btnLogin = document.getElementById("btnLogin");
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));

    // No hay usuario
    if (!user) {
        if (btnLogin) btnLogin.style.display = "inline-block";
        if (usuarioNav) usuarioNav.innerHTML = "";
        return;
    }

    // Hay usuario → ocultar botón login
    if (btnLogin) btnLogin.style.display = "none";

    const foto = user.foto && user.foto.trim() !== "" ? user.foto : "Img/default.png";

    usuarioNav.innerHTML = `
        <div class="usuario-box" id="btnUsuarioNav">
            <img src="${foto}">
            <span>${user.nombre}</span>
        </div>

        <div class="usuario-menu" id="menuFlotanteNav">
            <p><b>${user.nombre}</b></p>
            <p>${user.correo}</p>
            <hr>
            <button onclick="location.href='cuenta.html'">Mi cuenta</button>
            <button class="logout" onclick="cerrarSesion()">Cerrar sesión</button>
        </div>
    `;

    const btnUser = document.getElementById("btnUsuarioNav");
    const menu = document.getElementById("menuFlotanteNav");

    btnUser.addEventListener("click", () => {
        menu.classList.toggle("activo");
    });
});
