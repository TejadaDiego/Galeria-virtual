// ========================================================
//  Scripts/login-handler.js  (VERSIÓN FINAL Y FUNCIONAL)
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    if (!form) {
        console.warn("login-handler.js: No se encontró loginForm en este HTML");
        return;
    }

    // ========================================
    //   RUTA CORRECTA DEL PHP
    // ========================================
    let loginURL = "login.php";   // ✔ ESTA ES LA RUTA REAL

    console.log("Login enviará datos a:", loginURL);

    // ========================================
    //   PROCESAR LOGIN
    // ========================================
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const res = await fetch(loginURL, {
                method: "POST",
                body: formData
            });

            const txt = await res.text();
            let data;

            try {
                data = JSON.parse(txt);
            } catch (e) {
                alert("⚠ El servidor envió una respuesta inválida.");
                console.error("Respuesta del servidor:", txt);
                return;
            }

            // ========================================
            //   LOGIN CORRECTO
            // ========================================
            if (res.ok && data.usuario) {

                const u = data.usuario;

                const usuarioActivo = {
                    id: u.id,
                    nombre: u.nombre,
                    email: u.email,
                    foto: u.foto && u.foto.trim() !== "" ? u.foto : "Img/default.png",
                    tipo: u.tipo
                };

                // Guardamos usuario
                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

                // Redirigir al inicio
                window.location.href = "inicio.html";
                return;
            }

            // ========================================
            //   ERRORES DEL SERVIDOR
            // ========================================
            alert(data.error || "Credenciales incorrectas");

        } catch (error) {
            console.error("⚠ Error de conexión:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
});
