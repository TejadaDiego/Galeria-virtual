document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("usuarioActivo"));

    // OBTENER NAVBAR
    const nav = document.querySelector(".navbar ul");
    if (!nav) {
        console.warn("⚠ No se encontró .navbar ul");
        return;
    }

    // DIFERENTES PÁGINAS PUEDEN USAR DIFERENTES IDS
    const loginBtn = document.getElementById("btnLogin") 
                  || document.getElementById("btnLoginNav");

    // ============================================================
    // 1. NO HAY SESIÓN → Mostrar botón Login y limpiar ítems previos
    // ============================================================
    if (!user) {

        if (loginBtn) loginBtn.style.display = "inline-block";

        // eliminar ítems previos
        document.querySelectorAll(".user-item").forEach(el => el.remove());

        return;
    }

    // ============================================================
    // 2. HAY SESIÓN → Mostrar perfil y ocultar botón Login
    // ============================================================
    if (loginBtn) loginBtn.style.display = "none";

    // evitar duplicados
    document.querySelectorAll(".user-item").forEach(el => el.remove());

    const li = document.createElement("li");
    li.classList.add("user-item");
    li.style.position = "relative";

    const foto = user.foto && user.foto.length > 10
        ? user.foto
        : "Img/default.png";

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
    // 3. ABRIR / CERRAR MENÚ
    // ============================================================
    const menuUsuario = li.querySelector("#menuUsuario");
    const usuarioMenu = li.querySelector("#usuarioMenu");

    if (menuUsuario && usuarioMenu) {

        menuUsuario.onclick = (e) => {
            e.stopPropagation();
            usuarioMenu.classList.toggle("activo");
        };

        document.addEventListener("click", (e) => {
            if (!usuarioMenu.contains(e.target) && !menuUsuario.contains(e.target)) {
                usuarioMenu.classList.remove("activo");
            }
        });
    }

});


// ============================================================
// 4. CERRAR SESIÓN GLOBAL
// ============================================================
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");

    // Detecta qué login debe abrir
    const tipo = JSON.parse(localStorage.getItem("usuarioActivo"))?.tipo;

    if (tipo === "admin") location.href = "login-administrador.html";
    else if (tipo === "estudiante") location.href = "login-estudiante.html";
    else if (tipo === "comprador") location.href = "login-comprador.html";
    else location.href = "login.html";
}
