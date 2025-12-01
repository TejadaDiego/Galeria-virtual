// === Sesión global: Cargar usuario en navbar ===
window.addEventListener("DOMContentLoaded", () => {

    const userBox = document.getElementById("navbarUserBox");
    const btnLogin = document.getElementById("btnLogin");

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    actualizarNavbar(usuario);

    // Si cambia el usuario desde otra pestaña
    window.addEventListener("storage", () => {
        usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        actualizarNavbar(usuario);
    });

    function actualizarNavbar(user) {

        if (!user) {
            userBox.innerHTML = "";
            if (btnLogin) btnLogin.style.display = "inline-block";
            return;
        }

        // Oculta login
        if (btnLogin) btnLogin.style.display = "none";

        const foto = user.foto && user.foto !== ""
            ? user.foto
            : "img/default.png";

        userBox.innerHTML = `
            <div class="usuario-navbar" onclick="location.href='cuenta.html'">
                <img src="${foto}" alt="foto">
                <span>${user.nombre}</span>
            </div>
        `;
    }
});
