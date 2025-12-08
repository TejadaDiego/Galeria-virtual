// Scripts/login-handler.js
document.addEventListener("DOMContentLoaded", () => {

    // Detectar cualquier formulario con la clase login-form
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

                let response = await fetch("login.php", {   // ← ruta correcta
                    method: "POST",
                    body: formData
                });

                let data = await response.json();

                if (data.ok) {

                    // Guardar en localStorage porque sesion-global.js usa eso
                    localStorage.setItem("usuarioActivo", JSON.stringify({
                        nombre: data.nombre,
                        email: data.email,
                        foto: data.foto || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }));

                    window.location.href = "inicio.html";
                } else {
                    alert(data.msg || "Credenciales incorrectas");
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Error de conexión con el servidor. Revisa que Apache esté encendido y que la ruta login.php exista.");
            }

        });
    });
});
