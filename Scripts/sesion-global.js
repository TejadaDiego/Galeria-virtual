document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("navbar");
    const u = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!nav) return;

    if (!u) {
        nav.innerHTML = `
            <div class="nav-container">
                <a href="inicio.html">Inicio</a>
                <a href="login.html">Iniciar Sesión</a>
            </div>
        `;
        return;
    }

    nav.innerHTML = `
        <div class="nav-container">
            <a href="inicio.html">Inicio</a>
            <a href="perfil.html">
                <img src="${u.foto}" class="nav-foto">
                <span>${u.nombre}</span>
            </a>
        </div>
    `;
});
