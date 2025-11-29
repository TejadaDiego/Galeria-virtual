// === Sesión global: Mostrar usuario en el navbar ===
window.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("navbarUserBox");
  const btnLogin = document.getElementById("btnLogin");

  function actualizarNavbar(usuario) {

    if (!btnLogin) return;

    // Usuario NO logueado
    if (!usuario) {
      btnLogin.textContent = "Iniciar sesión";
      btnLogin.href = "login.html";

      if (userBox) userBox.innerHTML = "";
      return;
    }

    // Usuario logueado
    btnLogin.textContent = "Cuenta";
    btnLogin.href = "perfil.html";

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

  // Se activa cuando en cualquier pestaña se edite el perfil
  window.addEventListener("storage", (event) => {
    if (event.key === "usuarioActivo") {
      usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
      actualizarNavbar(usuario);
    }
  });

  // Evento manual
  window.addEventListener("actualizarUsuarioUI", () => {
    usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    actualizarNavbar(usuario);
  });
});
