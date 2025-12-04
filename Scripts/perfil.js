// ===============================
//     PERFIL DEL USUARIO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    // Si no hay sesión → ir al login
    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    // ===============================
    //   CARGAR DATOS DEL PERFIL
    // ===============================

    const fotoUsuario = document.getElementById("fotoUsuario");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const correoUsuario = document.getElementById("correoUsuario");
    const usernameUsuario = document.getElementById("usernameUsuario");
    const tipoUsuario = document.getElementById("tipoUsuario");

    if (fotoUsuario) fotoUsuario.src = usuario.foto || "img/default.png";
    if (nombreUsuario) nombreUsuario.value = usuario.nombre || "";
    if (correoUsuario) correoUsuario.value = usuario.email || "";
    if (usernameUsuario) usernameUsuario.value = usuario.username || "";
    if (tipoUsuario) tipoUsuario.textContent = usuario.tipo || "Estudiante";

    // ===============================
    //   CAMBIAR FOTO LOCAL
    // ===============================

    const nuevaFoto = document.getElementById("nuevaFoto");

    if (nuevaFoto) {
        nuevaFoto.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {
                if (fotoUsuario) fotoUsuario.src = e.target.result;

                usuario.foto = e.target.result; // Guardar imagen en base64
            };

            reader.readAsDataURL(file);
        });
    }

    // ===============================
    //   GUARDAR CAMBIOS
    // ===============================

    const guardar = document.getElementById("guardarCambios");

    if (guardar) {
        guardar.onclick = () => {

            // Validaciones básicas
            if (!nombreUsuario.value.trim()) {
                alert("El nombre no puede estar vacío");
                return;
            }
            if (!correoUsuario.value.trim()) {
                alert("El correo no puede estar vacío");
                return;
            }

            // Actualizar datos del usuario activo
            usuario.nombre = nombreUsuario.value.trim();
            usuario.email = correoUsuario.value.trim();
            usuario.username = usernameUsuario.value.trim();

            // Sincronizar también en la lista global de usuarios
            const index = usuariosRegistrados.findIndex(u => u.email === usuario.email || u.username === usuario.username);

            if (index !== -1) {
                usuariosRegistrados[index] = usuario;
            }

            // Guardar en localStorage
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

            alert("✔ Cambios guardados correctamente");
        };
    }

    // ===============================
    //   CERRAR SESIÓN
    // ===============================

    const cerrar = document.getElementById("cerrarSesion");

    if (cerrar) {
        cerrar.onclick = () => {
            localStorage.removeItem("usuarioActivo");
            window.location.href = "login.html";
        };
    }

});
