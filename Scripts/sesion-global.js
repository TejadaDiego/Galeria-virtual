

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    location.href = "login.html";
}

// --- ELIMINAR BLOQUES INSERTADOS EN EL CENTRO ---
document.querySelectorAll(".perfil-info, .perfil-detalle, #bloqueUsuario, .user-panel")
  .forEach(el => el.remove());



/* ============================================================
   🔥 NUEVA FUNCIÓN — MISMO DISEÑO QUE EN inicio.html 🔥
   (NO reemplaza nada, solo complementa y mejora)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const usuarioNav = document.getElementById("usuarioNav");
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si el HTML tiene <li id="usuarioNav">, úsalo también
    if (usuarioNav && user) {
        usuarioNav.innerHTML = `
            <div class="usuario-box" id="btnUsuarioNav">
                <img src="${user.foto || 'Img/default.png'}">
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

        // Evento del menú
        const btnUser = document.getElementById("btnUsuarioNav");
        const menu = document.getElementById("menuFlotanteNav");

        btnUser.addEventListener("click", () => {
            menu.classList.toggle("activo");
        });
    }
});
