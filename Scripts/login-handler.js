document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const res = await fetch("login.php", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log("Respuesta del servidor:", data);

            // ==============================================
            // VALIDACIONES DE RESPUESTA
            // ==============================================
            if (!data || typeof data !== "object") {
                mostrarError("Respuesta inválida del servidor.");
                return;
            }

            if (!data.success) {
                mostrarError(data.error || "Credenciales incorrectas.");
                return;
            }

            if (!data.usuario) {
                mostrarError("No se recibió información del usuario.");
                return;
            }

            const u = data.usuario;

            // ==============================================
            // PROCESAR FOTO
            // ==============================================
            const fotoFinal =
                u.foto && u.foto.startsWith("data:image")
                    ? u.foto
                    : u.foto && u.foto.trim() !== ""
                        ? u.foto
                        : "Img/default.png";

            // ==============================================
            // NORMALIZAR USUARIO
            // ==============================================
            const usuario = {
                id: u.id ?? null,
                nombre: (u.nombre || "Usuario").trim(),
                correo: u.email || "sin-correo", // CORREGIDO: email viene desde PHP como emailBD
                tipo: u.tipo || "comprador",
                foto: fotoFinal
            };

            // ==============================================
            // GUARDAR EN LOCALSTORAGE
            // ==============================================
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            mostrarExito("Inicio de sesión exitoso");

            // ==============================================
            // REDIRECCIÓN (FUNCIONA)
            // ==============================================
            setTimeout(() => {
                window.location.href = "inicio.html";
            }, 1000);

        } catch (err) {
            console.error("Error de conexión:", err);
            mostrarError("No se pudo conectar con el servidor.");
        }
    });
});


// ========================================================
//                   SISTEMA DE TOASTS
// ========================================================

function mostrarError(msg) {
    mostrarToast(msg, "error");
}

function mostrarExito(msg) {
    mostrarToast(msg, "exito");
}

function mostrarToast(mensaje, tipo) {
    let toast = document.createElement("div");
    toast.className = `toast ${tipo}`;
    toast.innerText = mensaje;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
