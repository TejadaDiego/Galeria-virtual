document.addEventListener("DOMContentLoaded", () => {
    const userBox = document.getElementById("navbarUserBox");
    const btnLogin = document.getElementById("btnLoginHeader");

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && userBox) {
        // Crear avatar + nombre
        userBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png">
                <span>${usuario.nombre}</span>
                <button id="logoutBtn" style="padding:5px 12px; background:#d33; color:white; border:none; border-radius:8px; cursor:pointer;">
                    Cerrar sesión
                </button>
            </div>
        `;

        if (btnLogin) btnLogin.style.display = "none";

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("usuario");
            location.reload();
        });

    } else {
        if (userBox) userBox.innerHTML = "";
    }
});
