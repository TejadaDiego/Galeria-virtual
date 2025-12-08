// Scripts/sesionglobal.js

document.addEventListener("DOMContentLoaded", () => {
    const userBox = document.getElementById("navbarUserBox");
    const btnLogin = document.getElementById("btnLoginHeader");

    // Obtenemos el usuario desde localStorage
    let usuario = null;
    try {
        usuario = JSON.parse(localStorage.getItem("usuario"));
    } catch (e) {
        console.warn("⚠ Error al leer usuario de localStorage");
    }

    if (usuario && userBox) {
        // Mostrar avatar + nombre + botón logout
        userBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" 
                     style="width:35px; height:35px; border-radius:50%;">
                <span style="font-weight:600;">${usuario.nombre}</span>
                <button id="logoutBtn" 
                        style="padding:5px 12px; background:#d33; color:white; border:none; border-radius:8px; cursor:pointer;">
                    Cerrar sesión
                </button>
            </div>
        `;

        // Ocultar botón de login si existe
        if (btnLogin) btnLogin.style.display = "none";

        // Evento cerrar sesión
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("usuario");
                location.reload();
            });
        }

    } else {
        // Si no hay usuario logueado
        if (userBox) userBox.innerHTML = "";

        // Mostrar botón login si existe
        if (btnLogin) btnLogin.style.display = "inline-block";
    }
});
