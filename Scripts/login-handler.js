// Scripts/login-handler.js
document.addEventListener("DOMContentLoaded", () => {

    // Detecta cualquier formulario que tenga la clase "login-form"
    const loginForms = document.querySelectorAll(".login-form");

    if (loginForms.length === 0) {
        console.warn("⚠ No se encontró ningún formulario con la clase .login-form");
        return;
    }

    loginForms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                let response = await fetch("login.php", {
                    method: "POST",
                    body: formData
                });

                let data = await response.json();

                if (data.ok) {
                    // Guardamos datos del usuario en sesión
                    sessionStorage.setItem("nombre", data.nombre);
                    sessionStorage.setItem("foto", data.foto || "");

                    window.location.href = "inicio.html";
                } else {
                    alert(data.msg || "Error al iniciar sesión");
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Error de conexión con el servidor");
            }
        });
    });
});
