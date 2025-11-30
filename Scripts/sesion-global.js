// ==========================
//  CARGAR DATOS DEL USUARIO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".navbar ul");
    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!nav) return; // Si la navbar no existe, no hacer nada

    if (user) {
        // Ocultar "Iniciar sesión" si existe
        const loginBtn = document.getElementById("btnLogin");
        if (loginBtn) loginBtn.style.display = "none";

        // Crear botón del usuario
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="usuario-box" id="menuUsuario">
                <img src="${user.foto || 'Img/default.png'}">
                <span>${user.nombre}</span>
            </div>

            <div class="usuario-menu" id="usuarioMenu">
                <p><b>${user.nombre}</b></p>
                <p>${user.correo}</p>
                <hr>
                <button onclick="editarNombre()">Cambiar nombre</button>
                <button onclick="cambiarFoto()">Cambiar foto</button>
                <button onclick="cerrarSesion()" class="logout">Cerrar sesión</button>
            </div>
        `;
        nav.appendChild(li);

        // Evento para abrir/cerrar menú
        document.getElementById("menuUsuario").onclick = () => {
            document.getElementById("usuarioMenu").classList.toggle("activo");
        };
    }
});


// ==========================
//  FUNCIONES DEL MENÚ
// ==========================

function editarNombre() {
    let nuevo = prompt("Ingresa tu nuevo nombre:");

    if (!nuevo) return;

    let user = JSON.parse(localStorage.getItem("usuario"));
    user.nombre = nuevo;

    localStorage.setItem("usuario", JSON.stringify(user));
    location.reload();
}

function cambiarFoto() {
    let nueva = prompt("Pega la URL de tu nueva foto:");

    if (!nueva) return;

    let user = JSON.parse(localStorage.getItem("usuario"));
    user.foto = nueva;

    localStorage.setItem("usuario", JSON.stringify(user));
    location.reload();
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    location.href = "login.html";
}
