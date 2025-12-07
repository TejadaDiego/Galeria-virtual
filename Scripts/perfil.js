document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("nombreUsuario").value = usuario.nombre;
    document.getElementById("correoUsuario").value = usuario.email;
    document.getElementById("tipoUsuario").textContent = usuario.tipo;
    document.getElementById("fotoUsuario").src = usuario.foto;

    let nuevaFoto = null;

    document.getElementById("nuevaFoto").addEventListener("change", (e) => {
        nuevaFoto = e.target.files[0];
        if (nuevaFoto) {
            const reader = new FileReader();
            reader.onload = e => {
                document.getElementById("fotoUsuario").src = e.target.result;
            };
            reader.readAsDataURL(nuevaFoto);
        }
    });

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
        form.append("fotoActual", usuario.foto);

        if (nuevaFoto) form.append("foto", nuevaFoto);

        try {
            const res = await fetch("login.php", { method: "POST", body: form });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));
                alert("Perfil actualizado.");
                location.reload();
            }

        } catch (err) {
            console.error(err);
            alert("Error al conectarse con el servidor.");
        }
    });

    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    });

});
