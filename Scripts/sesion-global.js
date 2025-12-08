document.addEventListener("DOMContentLoaded", () => {
    const userBox = document.getElementById("navbarUserBox");
    const btnLogin = document.getElementById("btnLoginHeader");

    let usuario = null;

    try {
        usuario = JSON.parse(localStorage.getItem("usuario"));
    } catch (e) {}

    if (usuario && userBox) {
        userBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <img src="${usuario.foto || 'img/user.png'}" 
                     style="width:35px; height:35px; border-radius:50%;">
                <span style="font-weight:600;">${usuario.nombre}</span>
                <button id="logoutBtn" 
                        style="padding:5px 12px; background:#d33; color:white; border:none; border-radius:8px; cursor:pointer;">
                    Cerrar sesión
                </button>
            </div>
        `;

        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            location.reload();
        });
    }
});
