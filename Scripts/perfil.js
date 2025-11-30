// === Cargar datos del usuario logueado ===
let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
  alert("Debes iniciar sesión para acceder a tu perfil.");
  window.location.href = "login.html";
} else {
  actualizarDatos();
}

function actualizarDatos() {

  const foto = usuario.foto && usuario.foto.trim() !== "" 
               ? usuario.foto 
               : "img/default.png";

  // Fotos
  document.getElementById("fotoUsuario").src = foto;
  document.getElementById("fotoPequeña").src = foto;

  // Datos
  document.getElementById("nombreUsuario").value = usuario.nombre;
  document.getElementById("correoUsuario").value = usuario.correo;
  document.getElementById("tipoUsuario").textContent = usuario.tipo;

  // Cabecera
  document.getElementById("nombrePequeño").textContent = usuario.nombre;
  document.getElementById("tipoPequeño").textContent = usuario.tipo;
}

// === Cambiar foto de perfil ===
document.getElementById("nuevaFoto").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      usuario.foto = ev.target.result;
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      actualizarDatos();

      window.dispatchEvent(new StorageEvent("storage", { key: "usuarioActivo" }));
      window.dispatchEvent(new Event("actualizarUsuarioUI"));
    };
    reader.readAsDataURL(file);
  }
});

// === Guardar cambios ===
document.getElementById("guardarCambios").addEventListener("click", () => {

  usuario.nombre = document.getElementById("nombreUsuario").value.trim();
  usuario.correo = document.getElementById("correoUsuario").value.trim();

  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  actualizarDatos();

  window.dispatchEvent(new StorageEvent("storage", { key: "usuarioActivo" }));
  window.dispatchEvent(new Event("actualizarUsuarioUI"));

  alert("✅ Cambios guardados correctamente");
});

// === Cerrar sesión ===
document.getElementById("cerrarSesion").addEventListener("click", () => {
  if (confirm("¿Deseas cerrar sesión?")) {
    localStorage.removeItem("usuarioActivo");
    window.dispatchEvent(new StorageEvent("storage", { key: "usuarioActivo" }));

    alert("Sesión cerrada correctamente 👋");
    window.location.href = "login.html";
  }
});
