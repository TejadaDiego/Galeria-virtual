document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar TODOS los formularios de login
    const forms = document.querySelectorAll(".login-form");
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            // Obtener email / password de cualquier login
            const email = formData.get("email")?.trim();
            const password = formData.get("password")?.trim();
            const tipo = formData.get("tipo") || "estudiante"; 
            // si no tiene tipo, será estudiante por defecto

            if (!email || !password) {
                alert("Completa todos los campos.");
                return;
            }

            try {
                // LLAMAMOS DIRECTAMENTE A login.php (SIN CARPETA Php)
                const response = await fetch("login.php", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (data.status === "error") {
                    alert(data.message);
                    return;
                }

                const user = data.user;

                // Guardar sesión global
                localStorage.setItem("usuario", JSON.stringify(user));

                // Redirección ÚNICA (solo tienes un inicio)
                window.location.href = "inicio.html";

            } catch (error) {
                alert("Error de conexión con el servidor. Verifica que Apache esté encendido.");
            }
        });
    });
});
