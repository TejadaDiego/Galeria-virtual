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

            const raw = await res.text();
            let data = JSON.parse(raw);

            if (data.success && data.usuario) {

                const u = data.usuario;

                const usuarioActivo = {
                    id: u.id,
                    nombre: u.nombre,
                    email: u.email,
                    foto: u.foto && u.foto !== "" ? u.foto : "img/default.png",
                    tipo: u.tipo
                };

                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

                window.location.href = "inicio.html";
                return;
            }

            if (data.error) {
                alert(data.error);
                return;
            }

            alert("Credenciales incorrectas.");

        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor.");
        }
    });

});
