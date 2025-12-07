// Scripts/login-handler.js
document.addEventListener("DOMContentLoaded", () => {

    const loginForms = document.querySelectorAll("#loginForm");

    loginForms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            let response = await fetch("Php/login.php", {
                method: "POST",
                body: formData
            });

            let data = await response.json();

            if (data.ok) {
                // Guardamos info del usuario
                sessionStorage.setItem("nombre", data.nombre);
                sessionStorage.setItem("foto", data.foto);
                
                window.location.href = "inicio.html";
            } else {
                alert(data.msg || "Error al iniciar sesión");
            }
        });
    });
});
