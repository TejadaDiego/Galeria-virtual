document.addEventListener("DOMContentLoaded", () => {

    // Obtener usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const userBox = document.getElementById("navbarUserBox");
    const btnLogin =
        document.getElementById("btnLoginHeader") ||
        document.getElementById("btnLogin") ||
        null;

    // === CASO 1: NO HAY USUARIO LOGUEADO ===
    if (!usuario) {
        if (btnLogin) btnLogin.style.display = "block";
        if (userBox) userBox.innerHTML = "";
        return;
    }

    // === CASO 2: HAY USUARIO → OCULTAR LOGIN ===
    if (btnLogin) btnLogin.style.display = "none";

    // === MOSTRAR USUARIO EN NAVBAR DE FORMA CLICKEABLE ===
    if (userBox) {
        userBox.innerHTML = `
            <div id="userNavbarBox"
                style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    cursor:pointer;
                ">
                
                <img src="${usuario.foto ? "uploads/" + usuario.foto : 'img/user.png'}"
                     style="
                        width:40px; 
                        height:40px; 
                        border-radius:50%; 
                        border:2px solid #b34cff;
                        object-fit:cover;
                     ">
                
                <span style="font-weight:600;">${usuario.nombre}</span>
            </div>
        `;
    }

    // === AL HACER CLICK EN EL USUARIO → IR A CUENTA.HTML ===
    const clickableUser = document.getElementById("userNavbarBox");
    if (clickableUser) {
        clickableUser.addEventListener("click", () => {
            window.location.href = "cuenta.html";
        });
    }
});
