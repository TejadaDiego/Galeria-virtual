document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

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
            // 🔥 GUARDAR TODO CORRECTO EN LOCALSTORAGE
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            localStorage.setItem("correoUsuario", data.usuario.email);

            alert("Inicio de sesión exitoso");
            window.location.href = "inicio.html"; 
        } else {
            alert(data.error || "Error desconocido");
        }

    } catch (error) {
        console.error("Error JS:", error);
        alert("Error en el sistema.");
    }
});
