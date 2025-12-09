document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".login-form");
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const email = formData.get("email")?.trim();
            const password = formData.get("password")?.trim();
            let tipo = formData.get("tipo"); // viene desde los login por rol

            // Si el formulario no trae "tipo", lo leemos desde localStorage (caso login.html)
            if (!tipo) {
                tipo = localStorage.getItem("tipoLogin");
                formData.append("tipo", tipo);
            }

            if (!email || !password) {
                alert("Completa todos los campos.");
                return;
            }

            if (!tipo) {
                alert("Error: No se detectó el tipo de usuario.");
                return;
            }

            try {
                const response = await fetch("login_handler.php", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Respuesta HTTP inválida");
                }

                let data;
                try {
                    data = await response.json();
                } catch (parseError) {
                    console.error("Error al convertir JSON:", parseError);
                    alert("El servidor respondió con formato incorrecto.");
                    return;
                }

                if (data.status === "error" || !data.success) {
                    alert(data.message || data.error);
                    return;
                }

                const user = data.usuario || data.user;

                // Guardamos usuario en localStorage
                localStorage.setItem("usuario", JSON.stringify(user));

                // Redirección
                window.location.href = "inicio.html";

            } catch (error) {
                console.error("Error en login:", error);
                alert("Error de conexión con el servidor. Asegúrate de que Apache/XAMPP esté ejecutándose.");
            }
        });
    });
});
