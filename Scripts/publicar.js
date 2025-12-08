// ================================
//   PREVISUALIZAR IMAGEN
// ================================
const imagenInput = document.getElementById("imagen");
const previewImg = document.getElementById("previewImg");

imagenInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
        previewImg.src = evt.target.result;
        previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
});


// ================================
//   ENVÍO DEL FORMULARIO
// ================================
document.getElementById("formPublicar").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener usuario logueado
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        alert("⚠️ Debes iniciar sesión para publicar.");
        window.location.href = "login.html";
        return;
    }

    const form = document.getElementById("formPublicar");
    const formData = new FormData(form);

    // ==== Enviar id del usuario ====
    formData.append("usuario_id", usuario.id);

    // ==== Validaciones ====
    if (!formData.get("titulo") ||
        !formData.get("descripcion") ||
        !formData.get("precio")) {

        alert("⚠️ Todos los campos son obligatorios.");
        return;
    }

    const archivo = formData.get("imagen");
    if (!archivo || archivo.size === 0) {
        alert("⚠️ Debes seleccionar una imagen.");
        return;
    }

    try {
        // ==== Enviar al backend ====
        const res = await fetch("publicar_handler.php", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        // ==== Respuesta del servidor ====
        if (data.status === "success" || data.success === true) {

            alert("✅ Trabajo publicado correctamente.");

            // Limpiar formulario
            form.reset();
            previewImg.style.display = "none";
            previewImg.src = "";

            // Redirigir a Contenido.html
            window.location.href = "Contenido.html";

        } else {
            alert("❌ Error del servidor: " + data.message);
        }

    } catch (error) {
        console.error(error);
        alert("❌ Error de conexión con el servidor.");
    }
});
