document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".login-form, #loginForm");
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            // ======================
            // LEER CAMPOS
            // ======================
            let email = formData.get("email")?.trim();
            let password = formData.get("password")?.trim();

            // Tipo de usuario (rol)
            let tipo = formData.get("tipo");
            if (!tipo) {
                tipo = localStorage.getItem("tipoLogin");
                formData.append("tipo", tipo);
            }

            // ======================
            // VALIDACIONES
            // ======================
            if (!email || !password) {
                alert("Completa todos los campos.");
                return;
            }

            if (!tipo) {
                alert("Debe seleccionar un tipo de acceso.");
                window.location.href = "seleccionar_rol.html";
                return;
            }

            // ======================
            // PETICIÓN AL BACKEND
            // ======================
            try {
                const response = await fetch("login.php", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Respuesta inesperada del servidor.");
                }

                const data = await response.json();
                console.log("RESPUESTA LOGIN.PHP:", data);

                // Error desde PHP
                if (!data.success) {
                    alert(data.error);
                    return;
                }

                // ======================
                // GUARDAR SESIÓN
                // ======================
                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                // ======================
                // REDIRIGIR
                // ======================
                window.location.href = "inicio.html";

            } catch (error) {
                console.error("ERROR EN LOGIN:", error);
                alert("No se pudo conectar con el servidor.");
            }
        });
    });
});
