document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#loginForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();

        // Validación básica
        if (!email || !password) {
            alert("Completa todos los campos");
            return;
        }

        try {
            const response = await fetch("Php/login.php", {
                method: "POST",
                body: new FormData(form),
            });

            const data = await response.json();

            if (data.status === "error") {
                alert(data.message);
                return;
            }

            const user = data.user;

            // Guardar sesión
            localStorage.setItem("usuario", JSON.stringify(user));

            // Redirección por rol
            switch (user.rol) {
                case "admin":
                    window.location.href = "admin.html";
                    break;
                case "comprador":
                    window.location.href = "iniciocomprador.html";
                    break;
                case "estudiante":
                default:
                    window.location.href = "inicio.html";
            }

        } catch (err) {
            alert("Error de conexión con el servidor.");
        }
    });
});
