console.log("🔥 PUBLICAR.JS CARGADO");

document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuario:", usuario);

    if (!usuario) {
        alert("⚠️ Debes iniciar sesión para publicar.");
        window.location.href = "login.html";
        return;
    }

    const form = document.getElementById("formPublicar");
    const preview = document.getElementById("previewImg");

    // PREVIEW DE IMAGEN
    document.getElementById("imagen").addEventListener("change", function() {
        const file = this.files[0];

        if (file) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";
        }
    });

    // SUBIR TRABAJO
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let fd = new FormData(form);
        fd.append("usuario_id", usuario.id);

        console.log("📤 Enviando datos:", Object.fromEntries(fd));

        const res = await fetch("publicar_handler.php", {
            method: "POST",
            body: fd
        });

        const data = await res.json();
        console.log("📥 Respuesta:", data);

        if (!data.success) {
            alert("⚠️ Error: " + data.error);
            return;
        }

        // MENSAJE DE ÉXITO
        alert("🎉 Tu trabajo se ha subido con éxito");

        // LIMPIAR FORMULARIO
        form.reset();
        preview.style.display = "none";
    });

});
