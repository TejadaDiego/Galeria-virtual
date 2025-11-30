// === PERFIL DEL USUARIO ===

document.addEventListener("DOMContentLoaded", () => {

  let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  // --- Cargar datos ---
  document.getElementById("fotoUsuario").src = usuario.foto || "img/default.png";
  document.getElementById("nombreUsuario").value = usuario.nombre;
  document.getElementById("correoUsuario").value = usuario.correo;
  document.getElementById("tipoUsuario").textContent = usuario.tipo || "Estudiante";

  // --- Cambiar foto ---
  document.getElementById("nuevaFoto").addEventListener("change", function () {
    let file = this.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("fotoUsuario").src = e.target.result;
      usuario.foto = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // --- Guardar cambios ---
  document.getElementById("guardarCambios").onclick = () => {

    usuario.nombre = document.getElementById("nombreUsuario").value;
    usuario.correo = document.getElementById("correoUsuario").value;

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Actualiza navbar
    window.dispatchEvent(new Event("storage"));

    alert("Cambios guardados correctamente ✔");
  };

  // --- Cerrar sesión ---
  document.getElementById("cerrarSesion").onclick = () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
  };

});
