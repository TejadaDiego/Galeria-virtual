// === Sesión global: Mostrar usuario en navbar ===

window.addEventListener("DOMContentLoaded", () => {

  const btnLogin = document.getElementById("btnLogin");
  const usuarioNav = document.getElementById("usuarioNav");
  const fotoNav = document.getElementById("fotoUsuarioNav");
  const nombreNav = document.getElementById("nombreUsuarioNav");

  function actualizarNavbar(usuario) {
    if (!usuario) {
      btnLogin.style.display = "block";
      usuarioNav.style.display = "none";
      return;
    }

    btnLogin.style.display = "none";
    usuarioNav.style.display = "flex";

    fotoNav.src = usuario.foto || "img/default.png";
    nombreNav.textContent = usuario.nombre;

    usuarioNav.onclick = () => {
      window.location.href = "perfil.html";
    };
  }

  let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  actualizarNavbar(usuario);

  // Escucha cambios desde perfil
  window.addEventListener("storage", () => {
    usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    actualizarNavbar(usuario);
  });
});
