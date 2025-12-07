// ========================================================
//  Scripts/login-handler.js  (VERSIÓN FINAL SIN CARPETA PHP)
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    if (!form) {
        console.warn("login-handler.js: No se encontró loginForm en este HTML");
        return;
    }

    // ========================================
    //   RUTA DEL PHP (SIN CARPETA)
    // ========================================
    let loginURL = "login.php";

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

            const raw = await res.text();

            console.log("Respuesta RAW del servidor:", raw);

            let data;

            try {
                data = JSON.parse(raw);
            } catch (e) {
                console.error("❌ JSON inválido recibido desde login.php");
                console.error(raw);

                alert("⚠ El servidor envió una respuesta inválida. Revisa login.php o conexion.php");
                return;
            }

            // ========================================
            //   LOGIN CORRECTO
            // ========================================
            if (data.success && data.usuario) {

                const u = data.usuario;

                const usuarioActivo = {
                    id: u.id,
                    nombre: u.nombre,
                    email: u.email,
                    foto: (u.foto && u.foto.trim() !== "" ? u.foto : "Img/default.png"),
                    tipo: u.tipo
                };

                // Guardar usuario
                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

                console.log("Usuario logueado:", usuarioActivo);

                // Redirigir
                window.location.href = "inicio.html";
                return;
            }

            // ========================================
            //   ERROR DEL SERVIDOR
            // ========================================
            if (data.error) {
                alert(data.error);
                return;
            }

            alert("Credenciales incorrectas.");

        } catch (error) {
            console.error("⚠ Error de conexión:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });

});
