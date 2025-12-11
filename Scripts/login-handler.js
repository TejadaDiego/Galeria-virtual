document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // ==========================
        // LEER ROL DEL FRONTEND
        // ==========================
        const tipoFrontend = localStorage.getItem("tipoLogin");

        if (!tipoFrontend) {
            alert("Debe seleccionar un tipo de acceso.");
            window.location.href = "seleccionar_rol.html";
            return;
        }

        // ==========================
        // MAPEO AL TIPO REAL DE BD
        // ==========================
        const rolesBD = {
            comprador: "Profesor",
            estudiante: "Estudiante",
            admin: "Administrador"
        };

        const tipoReal = rolesBD[tipoFrontend];

        if (!tipoReal) {
            alert("Tipo de usuario inválido.");
            return;
        }

        // ==========================
        // VALIDAR CAMPOS
        // ==========================
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (!email || !password) {
            alert("Completa todos los campos.");
            return;
        }

        // ==========================
        // ARMAR FORM DATA
        // ==========================
        const fd = new FormData();
        fd.append("email", email);
        fd.append("password", password);
        fd.append("tipo", tipoReal);

        // ==========================
        // CONSULTA AL BACKEND
        // ==========================
        try {
            const res = await fetch("login.php", { method: "POST", body: fd });

            if (!res.ok) {
                throw new Error("Error de conexión con el servidor.");
            }

            const data = await res.json();

            console.log("RESPUESTA DEL SERVIDOR:", data);

            if (!data.success) {
                alert("Error: " + data.error);
                return;
            }

            // ==========================
            // GUARDAR SESIÓN
            // ==========================
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            // ==========================
            // REDIRIGIR
            // ==========================
            window.location.href = "inicio.html";

        } catch (error) {
            console.error("ERROR EN LOGIN:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
});
