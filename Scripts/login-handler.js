document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".login-form");
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const email = formData.get("email")?.trim();
            const password = formData.get("password")?.trim();

            if (!email || !password) {
                alert("Completa todos los campos.");
                return;
            }

            try {
                const response = await fetch("login.php", {
                    method: "POST",
                    body: formData,
                });

                // Verificar si el servidor respondió correctamente
                if (!response.ok) {
                    throw new Error("Respuesta HTTP inválida");
                }

                // Intentar convertir la respuesta a JSON
                let data;
                try {
                    data = await response.json();
                } catch (parseError) {
                    console.error("Error al convertir JSON:", parseError);
                    alert("Respuesta inesperada del servidor.");
                    return;
                }

                // Verificar errores enviados por PHP
                if (data.status === "error") {
                    alert(data.message);
                    return;
                }

                const user = data.user;

                // Guardamos usuario en localStorage
                localStorage.setItem("usuario", JSON.stringify(user));

                // Redirección después de login exitoso
                window.location.href = "inicio.html";

            } catch (error) {
                console.error("Error en login:", error);
                alert("Error de conexión con el servidor. Verifica que Apache esté encendido.");
            }
        });
    });
});
