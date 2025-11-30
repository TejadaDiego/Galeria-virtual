document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("usuarioActivo"));

    const nav = document.querySelector(".navbar ul");
    if (!nav) return console.warn("⚠ No se encontró .navbar ul en esta página.");

    const loginBtn = document.getElementById("btnLogin");

    // ============================================================
    // 1. NO HAY SESIÓN → Mostrar botón Login y limpiar ítems previos
    // ============================================================
    if (!user) {
        if (loginBtn) loginBtn.style.display = "inline-block";

        document.querySelectorAll(".user-item").forEach(el => el.remove());
        return;
    }

    // ============================================================
    // 2. HAY SESIÓN → Ocultar botón Login y mostrar perfil
    // ============================================================
    if (loginBtn) loginBtn.style.display = "none";

    // Evitar duplicados al recargar o cambiar de página
    document.querySelectorAll(".user-item").forEach(el => el.remove());

    // Crear bloque único del usuario
    const li = document.createElement("li");
    li.classList.add("user-item");
    li.style.position = "relative";

    const foto = user.foto && user.foto.length > 10 ? user.foto : "Img/default.png";

    li.innerHTML = `
        <div class="usuario-box" id="menuUsuario">
            <img src="${foto}" class="user-photo" alt="Foto">
            <span>${user.nombre || "Usuario"}</span>
        </div>

        <div class="usuario-menu" id="usuarioMenu">
            <p><b>${user.nombre || "Sin nombre"}</b></p>
            <p>${user.correo || "correo-desconocido"}</p>
            <hr>
            <button onclick="location.href='cuenta.html'">Mi cuenta</button>
            <button class="logout" onclick="cerrarSesion()">Cerrar sesión</button>
        </div>
    `;

    nav.appendChild(li);

    // ============================================================
    // 3. Abrir/cerrar el menú del usuario
    // ============================================================
    const menuUsuario = document.getElementById("menuUsuario");
    const usuarioMenu = document.getElementById("usuarioMenu");

    if (menuUsuario && usuarioMenu) {
        menuUsuario.onclick = (e) => {
            e.stopPropagation();   
            usuarioMenu.classList.toggle("activo");
        };

        // Cerrar el menú cuando se hace clic fuera
        document.addEventListener("click", (e) => {
            if (!usuarioMenu.contains(e.target) && !menuUsuario.contains(e.target)) {
                usuarioMenu.classList.remove("activo");
            }
        });
    }

});


// ============================================================
// 4. FUNCIÓN GLOBAL PARA CERRAR SESIÓN
// ============================================================
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    location.href = "login.html";
}
