document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const userBox = document.getElementById("navbarUserBox");
    const btnLogin =
        document.getElementById("btnLoginHeader") ||
        document.getElementById("btnLogin") ||
        null;

    // === NO HAY USUARIO ===
    if (!usuario) {
        if (btnLogin) btnLogin.style.display = "block";
        if (userBox) userBox.innerHTML = "";
        return;
    }

    // === HAY USUARIO → OCULTAR LOGIN ===
    if (btnLogin) btnLogin.style.display = "none";

    // === MOSTRAR USUARIO ===
    if (userBox) {
        userBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <img src="${usuario.foto ? "uploads/" + usuario.foto : 'img/user.png'}"
                     style="width:40px; height:40px; border-radius:50%; border:2px solid #b34cff;">
                <span style="font-weight:600;">${usuario.nombre}</span>
            </div>
        `;
    }
});
