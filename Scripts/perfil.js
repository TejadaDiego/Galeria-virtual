document.addEventListener("DOMContentLoaded", () => {

    // Obtener usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    // Rellenar datos
    document.getElementById("nombreUsuario").value = usuario.nombre;
    document.getElementById("correoUsuario").value = usuario.email;
    document.getElementById("tipoUsuario").textContent = usuario.tipo;
    document.getElementById("fotoUsuario").src = usuario.foto ? "uploads/" + usuario.foto : "img/user.png";

    let nuevaFotoFile = null;

    // PREVIEW FOTO
    document.getElementById("nuevaFoto").addEventListener("change", (e) => {
        nuevaFotoFile = e.target.files[0];
        if (nuevaFotoFile) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                document.getElementById("fotoUsuario").src = evt.target.result;
            };
            reader.readAsDataURL(nuevaFotoFile);
        }
    });

    // GUARDAR CAMBIOS
    document.getElementById("guardarCambios").addEventListener("click", async () => {

        const nombre = document.getElementById("nombreUsuario").value.trim();
        const email  = document.getElementById("correoUsuario").value.trim();

        if (nombre === "" || email === "") {
            alert("Completa todos los campos.");
            return;
        }

        const form = new FormData();
        form.append("accion", "actualizarPerfil");
        form.append("id", usuario.id);
        form.append("nombre", nombre);
        form.append("email", email);
        form.append("fotoActual", usuario.foto ?? "");

        if (nuevaFotoFile) {
            form.append("foto", nuevaFotoFile);
        }

        try {
            const res = await fetch("perfil.php", {
                method: "POST",
                body: form,
            });

            const data = await res.json();
            console.log(data);

            if (data.status === "success") {
                // Guardar nueva sesión
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                alert("Perfil actualizado correctamente.");
                location.reload();
            } else {
                alert("Error: " + data.message);
            }
        } catch (e) {
            console.error(e);
            alert("Error al conectar con el servidor.");
        }
    });

    // CERRAR SESIÓN
    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });

});
