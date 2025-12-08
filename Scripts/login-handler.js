// Scripts/login-handler.js
document.addEventListener("DOMContentLoaded", () => {

    const loginForms = document.querySelectorAll(".login-form");

    if (loginForms.length === 0) {
        console.warn("⚠ No se encontró ningún formulario .login-form");
        return;
    }

    loginForms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch("login.php", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (data.ok) {

                    // Guardar sesión global
                    localStorage.setItem("usuarioActivo", JSON.stringify({
                        nombre: data.nombre,
                        email: data.email,
                        foto: data.foto || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }));

                    window.location.href = "inicio.html";
                } 
                else {
                    alert(data.msg || "Correo o contraseña incorrectos");
                }

            } catch (error) {
                console.error(error);
                alert("Error de conexión. Asegúrate de que Apache está activo y login.php existe.");
            }

        });
    });

});
