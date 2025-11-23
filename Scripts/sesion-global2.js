// === Sesión global: Mostrar usuario en el navbar ===
window.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("navbarUserBox");
  const btnLogin = document.getElementById("btnLogin");

  if (!userBox) return;

  function actualizarNavbar(usuario) {
    // Usuario NO logueado
    if (!usuario) {
      btnLogin.textContent = "Iniciar sesión";
      btnLogin.href = "login.html";
      userBox.innerHTML = ""; // limpia cápsula
      return;
    }

    // Usuario logueado
    btnLogin.textContent = "Cuenta";
    btnLogin.href = "perfil.html";

    userBox.innerHTML = `
      <img src="${usuario.foto}" alt="Foto" />
      <span>${usuario.nombre}</span>
    `;

    userBox.onclick = () => {
      window.location.href = "perfil.html";
    };
  }

  // Inicializar
  let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  actualizarNavbar(usuario);

  // Actualización por cambios globales
  window.addEventListener("storage", (event) => {
    if (event.key === "usuarioActivo") {
      usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
      actualizarNavbar(usuario);
    }
  });

  // Eventos locales (como editar perfil)
  window.addEventListener("actualizarUsuarioUI", () => {
    usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    actualizarNavbar(usuario);
  });
});
