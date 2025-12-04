// ========================================================
//  Scripts/login-handler.js  (VERSIÓN FINAL Y FUNCIONAL)
// ========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Detectar si existe un loginForm en esta página
    const form = document.getElementById("loginForm");
    if (!form) {
        console.warn("login-handler.js: No se encontró loginForm en este HTML");
        return;
    }

    // ========================================
    //   Detectar ruta PHP según el login actual
    // ========================================
    let loginURL = "login.php";   // Por defecto (solo lo usa login.html)

    const ruta = window.location.pathname.toLowerCase();

    // Estos 3 logins usan Php/login.php
    if (ruta.includes("logincomprador") ||
        ruta.includes("loginestudiante") ||
        ruta.includes("loginadmin")) {
        loginURL = "login.php";
    }

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

            const txt = await res.text(); // por si el servidor responde texto
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
                    foto: u.foto && u.foto.trim() !== "" ? u.foto : "img/default.png",
                    tipo: u.tipo
                };

                // Guardamos en localStorage
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
