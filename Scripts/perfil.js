// ===============================
//     PERFIL DEL USUARIO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay sesión → ir al login
    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    // ===============================
    //   CARGAR DATOS DEL PERFIL
    // ===============================

    document.getElementById("fotoUsuario").src = usuario.foto || "img/default.png";
    document.getElementById("nombreUsuario").value = usuario.nombre || "";
    document.getElementById("correoUsuario").value = usuario.email || ""; // ✔ Corregido
    document.getElementById("tipoUsuario").textContent = usuario.tipo || "Estudiante";


    // ===============================
    //   CAMBIAR FOTO LOCAL
    // ===============================

    document.getElementById("nuevaFoto").addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("fotoUsuario").src = e.target.result;
            usuario.foto = e.target.result; // se guarda en localStorage
        };

        reader.readAsDataURL(file);
    });


    // ===============================
    //   GUARDAR CAMBIOS
    // ===============================

    document.getElementById("guardarCambios").onclick = () => {

        usuario.nombre = document.getElementById("nombreUsuario").value.trim();
        usuario.email = document.getElementById("correoUsuario").value.trim(); // ✔ Corregido

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        // Actualizar barra de navegación global
        window.dispatchEvent(new Event("storage"));

        alert("✔ Cambios guardados correctamente");
    };


    // ===============================
    //   CERRAR SESIÓN
    // ===============================

    document.getElementById("cerrarSesion").onclick = () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    };

});
