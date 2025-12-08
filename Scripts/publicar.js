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

    // Enviar ID del usuario
    formData.append("usuario_id", usuario.id);

    // Validaciones
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
        // Enviar al servidor
        const res = await fetch("publicar_handler.php", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        console.log("Respuesta del servidor:", data);

        // === RESPUESTAS CORRECTAS ===
        if (data.success === true) {
            alert("✅ Trabajo publicado correctamente.");

            form.reset();
            previewImg.style.display = "none";
            previewImg.src = "";

            window.location.href = "Contenido.html";
            return;
        }

        // === RESPUESTAS DE ERROR ===
        if (data.error) {
            alert("❌ Error del servidor: " + data.error);
            return;
        }

        alert("⚠️ Respuesta desconocida del servidor.");

    } catch (error) {
        console.error(error);
        alert("❌ Error de conexión con el servidor.");
    }
});
