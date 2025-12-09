document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".login-form");
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            let email = formData.get("email")?.trim();
            let password = formData.get("password")?.trim();
            let tipo = formData.get("tipo");

            // Caso login.html (rol seleccionado antes)
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
                const response = await fetch("login.php", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("HTTP error");

                const data = await response.json();
                console.log("RESPUESTA:", data);

                if (!data.success) {
                    alert(data.error || "Datos incorrectos");
                    return;
                }

                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                window.location.href = "inicio.html";

            } catch (error) {
                console.error("Error en login:", error);
                alert("Error al conectar con el servidor.");
            }
        });
    });
});
