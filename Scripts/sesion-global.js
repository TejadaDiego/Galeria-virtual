// === Sesión global: Cargar usuario en navbar ===
window.addEventListener("DOMContentLoaded", () => {

    const userBox = document.getElementById("navbarUserBox");
    const btnLogin = document.getElementById("btnLogin");
    const menuUsuario = document.getElementById("menuUsuario");

    if (!userBox) return; // Seguridad

    let usuario =
        JSON.parse(localStorage.getItem("usuarioActivo")) ||
        JSON.parse(localStorage.getItem("usuario"));

    actualizarNavbar(usuario);

    // Si otra pestaña cambia la sesión
    window.addEventListener("storage", () => {
        usuario =
            JSON.parse(localStorage.getItem("usuarioActivo")) ||
            JSON.parse(localStorage.getItem("usuario"));
        actualizarNavbar(usuario);
    });


    // ===========================
    //   FUNCIÓN PRINCIPAL
    // ===========================
    function actualizarNavbar(user) {

        // --- No hay usuario ---
        if (!user) {
            if (btnLogin) btnLogin.style.display = "inline-block";
            userBox.innerHTML = "";
            if (menuUsuario) menuUsuario.classList.remove("activo");
            return;
        }

        // --- Si hay usuario logueado ---
        if (btnLogin) btnLogin.style.display = "none";

        const foto =
            user.foto && user.foto.trim() !== ""
                ? user.foto
                : "img/default.png";

        userBox.innerHTML = `
            <div class="usuario-box" id="btnUsuario">
                <img src="${foto}" alt="foto">
                <span>${user.nombre}</span>
            </div>
        `;

        // Activar botón del menú
        const btnUsuario = document.getElementById("btnUsuario");

        if (btnUsuario && menuUsuario) {
            btnUsuario.onclick = () => {
                menuUsuario.classList.toggle("activo");
            };
        }
    }
});
