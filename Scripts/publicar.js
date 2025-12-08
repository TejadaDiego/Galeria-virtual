console.log("🔥 PUBLICAR.JS SE ESTÁ EJECUTANDO");

document.addEventListener("DOMContentLoaded", () => {

    console.log("🔥 PUBLICAR.JS SE ESTÁ EJECUTANDO");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuario cargado:", usuario);

    if (!usuario) {
        alert("⚠️ Debes iniciar sesión para publicar.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("formPublicar").addEventListener("submit", async function (e) {
        e.preventDefault();

        const form = document.getElementById("formPublicar");
        const formData = new FormData(form);

        // Agregar ID del usuario
        console.log("Enviando usuario_id:", usuario.id);
        formData.append("usuario_id", usuario.id);

        const res = await fetch("publicar_handler.php", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        console.log("Respuesta del servidor:", data);
    });
});
