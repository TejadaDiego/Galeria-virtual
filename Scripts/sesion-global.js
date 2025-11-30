document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("usuario"));

    const nav = document.querySelector(".navbar ul");
    if (!nav) return;

    const loginBtn = document.getElementById("btnLogin");

    // Si NO hay usuario → mostrar login y no hacer más
    if (!user) {
        if (loginBtn) loginBtn.style.display = "inline-block";
        return;
    }

    // Si HAY usuario → ocultar botón login
    if (loginBtn) loginBtn.style.display = "none";

    // Crear visual del usuario
    const li = document.createElement("li");
    li.style.position = "relative";

    li.innerHTML = `
        <div class="usuario-box" id="menuUsuario">
            <img src="${user.foto || 'Img/default.png'}" />
            <span>${user.nombre}</span>
        </div>

        <div class="usuario-menu" id="usuarioMenu">
            <p><b>${user.nombre}</b></p>
            <p>${user.correo}</p>
            <hr>
            <button onclick="editarNombre()">Cambiar nombre</button>
            <button onclick="cambiarFoto()">Cambiar foto</button>
            <button class="logout" onclick="cerrarSesion()">Cerrar sesión</button>
        </div>
    `;

    nav.appendChild(li);

    // Evento para abrir el menú
    document.getElementById("menuUsuario").onclick = () => {
        document.getElementById("usuarioMenu").classList.toggle("activo");
    };
});


// -------- Cambiar nombre --------
function editarNombre() {
    let nuevo = prompt("Nuevo nombre:");
    if (!nuevo) return;

    let user = JSON.parse(localStorage.getItem("usuario"));
    user.nombre = nuevo;

    localStorage.setItem("usuario", JSON.stringify(user));
    location.reload();
}

// -------- Cambiar foto --------
function cambiarFoto() {
    let nueva = prompt("Pega la URL de tu nueva foto:");
    if (!nueva) return;

    let user = JSON.parse(localStorage.getItem("usuario"));
    user.foto = nueva;

    localStorage.setItem("usuario", JSON.stringify(user));
    location.reload();
}

// -------- Cerrar sesión --------
function cerrarSesion() {
    localStorage.removeItem("usuario");
    location.href = "login.html";
}
