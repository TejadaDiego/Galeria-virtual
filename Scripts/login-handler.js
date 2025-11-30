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
                alert(data.error || "Error al iniciar sesión");
                return;
            }

            // =====================================================
            //  NORMALIZACIÓN COMPLETA DE DATOS DEL USUARIO
            // =====================================================
            const fotoFinal =
                data.usuario.foto && data.usuario.foto.startsWith("data:image")
                    ? data.usuario.foto             // Foto ya en Base64 desde el servidor
                    : data.usuario.foto && data.usuario.foto !== ""
                        ? data.usuario.foto         // Ruta almacenada
                        : "Img/default.png";        // Foto por defecto

            const usuario = {
                id: data.usuario.id ?? null,
                nombre: (data.usuario.nombre || "Usuario").trim(),
                correo: data.usuario.correo || "sin-correo",
                tipo: data.usuario.tipo || "comprador",
                foto: fotoFinal
            };

            // =====================================================
            //  GUARDAR USUARIO ACTIVO ÚNICO
            // =====================================================
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            alert("Inicio de sesión exitoso");

            // =====================================================
            //  REDIRECCIÓN SEGÚN TIPO DE USUARIO
            // =====================================================
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
            alert("Error de conexión con el servidor");
        }
    });
});
