// === Sesión global: Mostrar usuario, actualizar en vivo y gestionar navegación ===
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  const btnLogin = document.getElementById("btnLogin");

  // Función principal de renderizado
  function actualizarNavbar(usuario) {
    // Eliminar caja de usuario previa
    const oldUserBox = document.querySelector(".usuario-box");
    if (oldUserBox) oldUserBox.remove();

    if (!usuario) {
      if (btnLogin) {
        btnLogin.href = "login.html";
        btnLogin.textContent = "Iniciar sesión";
      }
      return;
    }

    // Crear nueva caja de usuario
    if (btnLogin) {
      btnLogin.href = "perfil.html";
      btnLogin.textContent = "Cuenta";
    }

    const userBox = document.createElement("div");
    userBox.classList.add("usuario-box");
    userBox.innerHTML = `
      <img src="${usuario.foto}" alt="Foto de usuario" class="usuario-foto" title="${usuario.nombre}">
      <span class="usuario-nombre">${usuario.nombre}</span>
    `;

    userBox.addEventListener("click", () => window.location.href = "perfil.html");
    nav.appendChild(userBox);
  }

  // Inicializar navbar
  let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  actualizarNavbar(usuario);

  // Escuchar cambios globales de sesión o edición de perfil
  window.addEventListener("storage", (event) => {
    if (event.key === "usuarioActivo") {
      usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
      actualizarNavbar(usuario);
    }
  });

  // También escuchamos eventos personalizados locales (desde perfil.js)
  window.addEventListener("actualizarUsuarioUI", () => {
    usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    actualizarNavbar(usuario);
  });
});
