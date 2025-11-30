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

            // ==============================================
            // VALIDACIONES BÁSICAS
            // ==============================================
            if (!data || typeof data !== "object") {
                alert("Respuesta inválida del servidor");
                return;
            }

            if (!data.success) {
                alert(data.error || "Credenciales incorrectas");
                return;
            }

            if (!data.usuario) {
                alert("No se recibió información del usuario");
                return;
            }

            const u = data.usuario;

            // ==============================================
            // NORMALIZACIÓN COMPLETA DE DATOS
            // ==============================================
            const fotoFinal =
                u.foto && u.foto.startsWith("data:image")
                    ? u.foto                               // Base64 válida
                    : u.foto && u.foto.trim() !== ""
                        ? u.foto                           // URL guardada en BD
                        : "Img/default.png";               // Foto por defecto

            const usuario = {
                id: u.id ?? null,
                nombre: (u.nombre || "Usuario").trim(),
                correo: u.correo || "sin-correo",
                tipo: u.tipo || "comprador",
                foto: fotoFinal
            };

            // ==============================================
            // GUARDAR UN SOLO USUARIO ACTIVO
            // ==============================================
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            alert("Inicio de sesión exitoso");

            // ==============================================
            // REDIRECCIONAR SEGÚN ROL
            // ==============================================
            switch (usuario.tipo) {
                case "admin":
                    window.location.href = "panel_admin.html";
                    break;

                case "comprador":
                    window.location.href = "panel_comprador.html";
                    break;

                case "estudiante":
                    window.location.href = "panel_estudiante.html";
                    break;

                default:
                    window.location.href = "inicio.html";
            }

        } catch (err) {
            console.error("Error de conexión:", err);
            alert("Error al conectar con el servidor");
        }
    });
});
