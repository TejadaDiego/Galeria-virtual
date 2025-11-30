document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));

    const nav = document.querySelector(".navbar ul");
    if (!nav) return;

    const loginBtn = document.getElementById("btnLogin");

    // ============================================
    // SI NO HAY USUARIO → MOSTRAR BOTÓN LOGIN
    // ============================================
    if (!user) {
        if (loginBtn) loginBtn.style.display = "inline-block";
        document.querySelectorAll(".user-item").forEach(el => el.remove());
        return;
    }

    // ============================================
    // SI HAY USUARIO → OCULTAR LOGIN Y MOSTRAR PERFIL
    // ============================================
    if (loginBtn) loginBtn.style.display = "none";

    // Evitar duplicados
    document.querySelectorAll(".user-item").forEach(el => el.remove());

    // Crear item único del usuario
    const li = document.createElement("li");
    li.classList.add("user-item");
    li.style.position = "relative";

    li.innerHTML = `
        <div class="usuario-box" id="menuUsuario">
            <img src="${user.foto || 'Img/default.png'}" class="user-photo">
            <span>${user.nombre}</span>
        </div>

        <div class="usuario-menu" id="usuarioMenu">
            <p><b>${user.nombre}</b></p>
            <p>${user.correo}</p>
            <hr>
            <button onclick="location.href='cuenta.html'">Mi cuenta</button>
            <button class="logout" onclick="cerrarSesion()">Cerrar sesión</button>
        </div>
    `;

    nav.appendChild(li);

    // Abrir / cerrar menú del usuario
    document.getElementById("menuUsuario").onclick = () => {
        document.getElementById("usuarioMenu").classList.toggle("activo");
    };

    // Cerrar menú si se hace clic fuera
    document.addEventListener("click", (e) => {
        const menu = document.getElementById("usuarioMenu");
        const trigger = document.getElementById("menuUsuario");
        if (!menu || !trigger) return;

        if (!menu.contains(e.target) && !trigger.contains(e.target)) {
            menu.classList.remove("activo");
        }
    });

});

// ============================================
// FUNCIÓN GLOBAL PARA CERRAR SESIÓN
// ============================================
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    location.href = "login.html";
}
