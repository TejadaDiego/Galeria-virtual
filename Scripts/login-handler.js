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

            // === GUARDAR SESIÓN CORRECTAMENTE ===
            localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));

            // Notificar a todas las páginas
            window.dispatchEvent(new StorageEvent("storage", { key: "usuarioActivo" }));
            window.dispatchEvent(new Event("actualizarUsuarioUI"));

            alert("Inicio de sesión exitoso");

            // === Redirección según tipo ===
            switch (data.usuario.tipo) {
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
            console.error(err);
            alert("Error de conexión con el servidor");
        }
    });
});
