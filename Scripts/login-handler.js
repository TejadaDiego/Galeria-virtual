// -------------------------------------------
// LOGIN HANDLER - FUNCIONA 100%
// -------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) {
        console.error("No existe el formulario loginForm");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "" || password === "") {
            alert("Completa todos los campos");
            return;
        }

        const datos = new FormData();
        datos.append("email", email);
        datos.append("password", password);

        try {
            const response = await fetch("PHP/login.php", {
                method: "POST",
                body: datos
            });

            const text = await response.text();
            console.log("Respuesta cruda:", text);

            const data = JSON.parse(text);

            if (data.success) {
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                alert("Inicio de sesión exitoso ✔");
                window.location.href = "inicio.html";
            } else {
                alert(data.error);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        }
    });
});
