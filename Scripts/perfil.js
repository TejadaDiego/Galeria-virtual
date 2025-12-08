document.addEventListener("DOMContentLoaded", () => {

    // Obtener usuario desde la sesión REAL
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    // Rellenar datos en el formulario
    document.getElementById("nombreUsuario").value = usuario.nombre;
    document.getElementById("correoUsuario").value = usuario.email;
    document.getElementById("tipoUsuario").textContent = usuario.tipo;
    document.getElementById("fotoUsuario").src = usuario.foto || "img/user.png";

    let nuevaFoto = null;

    // mostrar preview al cargar foto
    document.getElementById("nuevaFoto").addEventListener("change", (e) => {
        nuevaFoto = e.target.files[0];

        if (nuevaFoto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("fotoUsuario").src = e.target.result;
            };
            reader.readAsDataURL(nuevaFoto);
        }
    });

    // GUARDAR CAMBIOS
    document.getElementById("guardarCambios").addEventListener("click", async () => {

        const nombre = document.getElementById("nombreUsuario").value.trim();
        const email = document.getElementById("correoUsuario").value.trim();

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

        if (nuevaFoto) {
            form.append("foto", nuevaFoto);
        }

        try {
            const res = await fetch("perfil.php", {
                method: "POST",
                body: form
            });

            const data = await res.json();
            console.log(data);

            if (data.status === "success") {

                // Actualizar sesión con la nueva información
                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                alert("Perfil actualizado correctamente.");
                location.reload();
            } else {
                alert("Error: " + data.message);
            }

        } catch (err) {
            console.error(err);
            alert("Error al conectarse con el servidor.");
        }
    });

    // cerrar sesión
    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });

});
