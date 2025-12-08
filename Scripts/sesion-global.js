document.addEventListener("DOMContentLoaded", () => {

    const userBox = document.getElementById("navbarUserBox");

    // Detectar cualquiera de los IDs usados en tus páginas
    const btnLogin =
        document.getElementById("btnLoginHeader") ||
        document.getElementById("btnLogin") ||
        document.getElementById("btnLoginBox") ||
        document.getElementById("btnLoginNav");

    let usuario = null;

    try {
        usuario = JSON.parse(localStorage.getItem("usuario"));
    } catch (e) {
        usuario = null;
    }

    // SI NO HAY USUARIO → Mostrar botón login
    if (!usuario) {
        if (btnLogin) btnLogin.style.display = "block";
        if (userBox) userBox.innerHTML = "";
        return;
    }

    // SI HAY USUARIO → Ocultar botón login
    if (btnLogin) btnLogin.style.display = "none";

    // Mostrar información del usuario en el navbar
    if (userBox) {
        userBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <img src="${usuario.foto || 'img/user.png'}"
                     style="width:40px; height:40px; border-radius:50%; border:2px solid #b34cff;">
                <span style="font-weight:600; color:#fff;">${usuario.nombre}</span>

                <button id="logoutBtn"
                    style="padding:5px 12px; background:#d33; color:white; border:none;
                    border-radius:8px; cursor:pointer;">
                    Cerrar sesión
                </button>
            </div>
        `;
    }

    // Evento cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "login.html";
        });
    }
});
