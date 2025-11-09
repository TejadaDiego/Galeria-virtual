// ======== Mostrar vista previa de la imagen ========
const imagenInput = document.getElementById('imagen');
const previewImg = document.getElementById('previewImg');

imagenInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      previewImg.src = evt.target.result;
      previewImg.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// ======== Simular envío del formulario ========
document.getElementById('formPublicar').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('✅ Trabajo publicado correctamente (esta función se conectará a la base de datos más adelante).');
  this.reset();
  previewImg.style.display = 'none';
});
