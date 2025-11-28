// ======== Mostrar vista previa de la imagen ========
const imagenInput = document.getElementById('imagen');
const previewImg = document.getElementById('previewImg');

imagenInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      previewImg.src = evt.target.result;
      previewImg.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// ======== Enviar formulario al servidor ========
document.getElementById('formPublicar').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = document.getElementById('formPublicar');
  const formData = new FormData(form);

  // Validaciones básicas
  if (!formData.get("nombre") || !formData.get("descripcion") || !formData.get("precio")) {
    alert("⚠️ Todos los campos son obligatorios");
    return;
  }

  try {
    const res = await fetch("publicar_handler.php", {
      method: "POST",
      body: formData
    });

    const texto = await res.text();

    if (res.ok && texto.trim() === "ok") {
      alert("✅ Trabajo publicado correctamente.");
      form.reset();
      previewImg.style.display = "none";
    } else {
      alert("❌ Error: " + texto);
    }

  } catch (error) {
    alert("❌ Error de conexión con el servidor.");
    console.error(error);
  }
});
