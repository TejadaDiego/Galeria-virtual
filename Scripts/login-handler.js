document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const res = await fetch("login.php", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log("Respuesta del servidor:", data);

            if (!data.success) {
                alert(data.error || "Error en inicio de sesión");
                return;
            }

            // Datos del usuario
            const u = data.usuario;

            // Normalizar foto
            const foto =
                u.foto && u.foto.length > 10
                    ? u.foto
                    : "Img/default.png";

            // Crear usuario local
            const usuario = {
                id: u.id,
                nombre: u.nombre,
                email: u.email,
                tipo: u.tipo,
                foto: foto
            };

            // Guardar sesión en localStorage
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            alert("Inicio de sesión exitoso");

            // Redirección por rol
            if (usuario.tipo === "admin") {
                location.href = "panel_admin.html";
            } else if (usuario.tipo === "estudiante") {
                location.href = "panel_estudiante.html";
            } else {
                location.href = "panel_comprador.html";
            }

        } catch (err) {
            console.error(err);
            alert("Error en la conexión con el servidor");
        }
    });
});
