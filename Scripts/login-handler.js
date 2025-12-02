document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    if (!form) return; // Evita errores si el formulario no existe en esta página

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const datos = new FormData(form);

        try {
            const res = await fetch("Php/login.php", {
                method: "POST",
                body: datos
            });

            // Evita errores si el servidor responde texto en vez de JSON
            const respuesta = await res.json().catch(() => null);

            if (!respuesta) {
                alert("Error inesperado del servidor.");
                return;
            }

            if (respuesta.error) {
                alert(respuesta.error);
                return;
            }

            if (respuesta.success) {
                // Guarda al usuario en localStorage
                localStorage.setItem("usuarioActivo", JSON.stringify(respuesta.usuario));

                // Redirección al Inicio
                window.location.href = "inicio.html";
            }

        } catch (error) {
            console.error("Error al conectar con login.php:", error);
            alert("No se pudo conectar con el servidor.");
        }

    });

});
