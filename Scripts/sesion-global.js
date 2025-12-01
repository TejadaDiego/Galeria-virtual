// === Sesión global: Cargar usuario en navbar ===
window.addEventListener("DOMContentLoaded", () => {

    const userBox = document.getElementById("navbarUserBox");
    const btnLogin = document.getElementById("btnLogin");

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"))
                || JSON.parse(localStorage.getItem("usuario"));

    actualizarNavbar(usuario);

    // Actualiza si cambia desde otra pestaña
    window.addEventListener("storage", () => {
        usuario = JSON.parse(localStorage.getItem("usuarioActivo"))
                || JSON.parse(localStorage.getItem("usuario"));
        actualizarNavbar(usuario);
    });

    function actualizarNavbar(user) {

        if (!user) {
            if (btnLogin) btnLogin.style.display = "inline-block";
            userBox.innerHTML = "";
            return;
        }

        if (btnLogin) btnLogin.style.display = "none";

        const foto = user.foto && user.foto.trim() !== ""
            ? user.foto
            : "img/default.png";

        userBox.innerHTML = `
            <div class="usuario-box" id="btnUsuario">
                <img src="${foto}" alt="foto">
                <span>${user.nombre}</span>
            </div>
        `;

        // Botón para abrir menú
        document.getElementById("btnUsuario").onclick = () => {
            document.getElementById("menuUsuario").classList.toggle("activo");
        };
    }
});
