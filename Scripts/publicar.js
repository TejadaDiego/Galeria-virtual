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

  const form = document.getElementById("formPublicar");
  const formData = new FormData(form);

  // ==== Validaciones ====
  if (!formData.get("nombre") ||
      !formData.get("descripcion") ||
      !formData.get("precio")) {

    alert("⚠️ Todos los campos son obligatorios.");
    return;
  }

  // Si se requiere imagen obligatoria:
  if (!formData.get("imagen")?.name) {
    alert("⚠️ Debes seleccionar una imagen.");
    return;
  }

  try {
    // ==== Enviar al backend ====
    const res = await fetch("publicar_handler.php", {
      method: "POST",
      body: formData
    });

    const respuestaTexto = await res.text();

    // ==== Respuesta del servidor ====
    if (res.ok && respuestaTexto.trim() === "ok") {
      alert("✅ Trabajo publicado correctamente.");

      form.reset();
      previewImg.style.display = "none";
      previewImg.src = "";
    } else {
      alert("❌ Error del servidor: " + respuestaTexto);
    }

  } catch (error) {
    console.error(error);
    alert("❌ Error de conexión con el servidor.");
  }
});
