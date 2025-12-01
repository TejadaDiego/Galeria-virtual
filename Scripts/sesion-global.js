// === Sesión global: Mostrar usuario en el navbar ===
window.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("navbarUserBox");

  function actualizarNavbar(usuario) {
    if (!userBox) return;

    // Si NO está logueado
    if (!usuario) {
      userBox.innerHTML = `
        <a href="login.html" class="btn-login">Iniciar sesión</a>
      `;
      return;
    }

    // Si está logueado
    const foto = usuario.foto && usuario.foto.trim() !== ""
      ? usuario.foto
      : "img/default.png";

    userBox.innerHTML = `
      <div class="usuario-mini" id="miniPerfilBtn">
        <img src="${foto}" alt="User"/>
        <span>${usuario.nombre}</span>
      </div>
    `;

    // Enviar a cuenta
    document.getElementById("miniPerfilBtn").onclick = () => {
      window.location.href = "cuenta.html";
    };
  }

  // Inicializar
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  actualizarNavbar(usuario);

  // Si se actualiza desde otra pestaña
  window.addEventListener("storage", () => {
    const nuevo = JSON.parse(localStorage.getItem("usuarioActivo"));
    actualizarNavbar(nuevo);
  });
});
