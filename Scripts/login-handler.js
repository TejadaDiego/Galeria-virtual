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

            // 🔥 GUARDAR CORRECTAMENTE LA SESIÓN
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            alert("Inicio de sesión exitoso");

            // Redirigir según tipo
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
