// ========================================================
//  Scripts/sesion-global.js
//  Maneja la sesión en todas las páginas del sistema
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Elementos del navbar (si existen)
    const contenedorUsuario = document.getElementById("contenedorUsuario");
    const fotoUsuario = document.getElementById("fotoUsuario");
    const nombreUsuario = document.getElementById("nombreUsuario");

    const linkLogin = document.getElementById("linkLogin");
    const linkLogout = document.getElementById("linkLogout");

    // Leer usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    // =============================================
    //    Si no hay usuario → redirigir al login
    // =============================================
    const paginasProtegidas = [
        "inicio.html",
        "contenido.html",
        "publicar.html",
        "mi_cuenta.html"
    ];

    const archivoActual = window.location.pathname.split("/").pop();

    if (paginasProtegidas.includes(archivoActual) && !usuario) {
        console.warn("No estás logueado → Redirigiendo al login...");
        window.location.href = "index.html";
        return;
    }

    // =============================================
    //    Si hay usuario → mostrar datos en navbar
    // =============================================
    if (usuario) {
        if (contenedorUsuario) contenedorUsuario.style.display = "flex";

        if (fotoUsuario) fotoUsuario.src = usuario.foto || "Img/default.png";
        if (nombreUsuario) nombreUsuario.textContent = usuario.nombre;

        if (linkLogin) linkLogin.style.display = "none";  // ocultar "Iniciar sesión"
        if (linkLogout) linkLogout.style.display = "block"; // mostrar "Cerrar sesión"
    } else {
        // Usuario no logueado
        if (contenedorUsuario) contenedorUsuario.style.display = "none";

        if (linkLogin) linkLogin.style.display = "block";
        if (linkLogout) linkLogout.style.display = "none";
    }

    // =============================================
    //    Botón Cerrar Sesión
    // =============================================
    if (linkLogout) {
        linkLogout.addEventListener("click", async () => {

            // 1. Llamar al archivo PHP logout.php
            try {
                await fetch("Php/logout.php");
            } catch (e) {
                console.warn("No se pudo contactar logout.php, pero se cerrará la sesión local");
            }

            // 2. Eliminar storage
            localStorage.removeItem("usuarioActivo");

            // 3. Redirigir
            window.location.href = "index.html";
        });
    }

});
