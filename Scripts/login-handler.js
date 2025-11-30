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
                mostrarError("El servidor no envió datos del usuario.");
                return;
            }

            const u = data.usuario;

            // ==============================================
            // PROCESAR FOTO O ASIGNAR UNA POR DEFECTO
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
                correo: u.correo || "sin-correo",
                tipo: u.tipo || "comprador",
                foto: fotoFinal
            };

            // ==============================================
            // GUARDAR EN LOCALSTORAGE (SESIÓN GLOBAL)
            // ==============================================
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            mostrarExito("Inicio de sesión exitoso.");

            // ==============================================
            // REDIRECCIÓN POR TIPO DE USUARIO
            // ==============================================
            setTimeout(() => {
                switch (usuario.tipo) {
                    case "admin":
                        window.location.href = "login-admin.html";
                        break;
                    case "comprador":
                        window.location.href = "login-comprador.html";
                        break;
                    case "estudiante":
                        window.location.href = "login-estudiante.html";
                        break;
                    default:
                        window.location.href = "inicio.html";
                }
            }, 1200);

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

    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
