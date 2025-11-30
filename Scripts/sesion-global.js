document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));

    const nav = document.querySelector(".navbar ul");
    if (!nav) return;

    const loginBtn = document.getElementById("btnLogin");

    // Si NO está logueado
    if (!user) {
        if (loginBtn) loginBtn.style.display = "inline-block";
        // Quitar íconos duplicados
        document.querySelectorAll(".user-item").forEach(el => el.remove());
        return;
    }

    // Si está logueado → ocultar login
    if (loginBtn) loginBtn.style.display = "none";

    // Eliminar íconos duplicados ANTES de crear uno nuevo
    document.querySelectorAll(".user-item").forEach(el => el.remove());

    // Crear item único
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

    // Abrir menú
    document.getElementById("menuUsuario").onclick = () => {
        document.getElementById("usuarioMenu").classList.toggle("activo");
    };
});

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    location.href = "login.html";
}
