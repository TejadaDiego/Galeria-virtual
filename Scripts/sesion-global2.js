// === Sesión global: Mostrar usuario en el navbar ===
window.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("navbarUserBox");
  const btnLogin = document.getElementById("btnLogin");

  function actualizarNavbar(usuario) {

    // Usuario NO logueado
    if (!usuario) {
      if (btnLogin) {
        btnLogin.textContent = "Iniciar sesión";
        btnLogin.href = "login.html";
      }

      if (userBox) userBox.innerHTML = "";
      return;
    }

    // Usuario logueado
    if (btnLogin) {
      btnLogin.textContent = "Cuenta";
      btnLogin.href = "perfil.html";
    }

    if (userBox) {
      const foto = usuario.foto && usuario.foto.trim() !== ""
        ? usuario.foto
        : "img/default.png";

      userBox.innerHTML = `
        <img src="${foto}" alt="Foto" />
        <span>${usuario.nombre}</span>
      `;

      userBox.onclick = () => window.location.href = "perfil.html";
    }
  }

  // Inicializar
  let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  actualizarNavbar(usuario);

  // Actualización desde otras pestañas
  window.addEventListener("storage", (event) => {
    if (event.key === "usuarioActivo") {
      usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
      actualizarNavbar(usuario);
    }
  });

  // Actualización manual
  window.addEventListener("actualizarUsuarioUI", () => {
    usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    actualizarNavbar(usuario);
  });
});

// --- LIMPIAR BLOQUES ANTIGUOS QUE SE MUESTRAN EN EL CENTRO ---
document.querySelectorAll(".perfil-info, .perfil-detalle, #bloqueUsuario, .user-panel")
  .forEach(el => el.remove());

