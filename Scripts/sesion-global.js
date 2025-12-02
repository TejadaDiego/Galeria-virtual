// Scripts/sesion-global.js
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem('usuarioActivo'));
  const btnLoginElems = document.querySelectorAll('#btnLogin, #btnLoginNav');
  const navbarBoxes = document.querySelectorAll('#navbarUserBox, #usuarioNav, .navbar-user, .usuario-box');

  function showUser(u) {
    btnLoginElems.forEach(el => { if (el) el.style.display = 'none'; });
    navbarBoxes.forEach(box => {
      if (!box) return;
      box.innerHTML = `<div class="usuario-mini" onclick="location.href='cuenta.html'">
        <img src="${u.foto || 'Img/default.png'}" class="user-photo" />
        <span>${u.nombre}</span>
      </div>`;
    });
  }

  function hideUser() {
    btnLoginElems.forEach(el => { if (el) el.style.display = 'inline-block'; });
    navbarBoxes.forEach(box => { if (box) box.innerHTML = ''; });
  }

  if (user) showUser(user);
  else hideUser();

  // Escuchar cambios desde otras pestañas
  window.addEventListener('storage', (e) => {
    if (e.key === 'usuarioActivo') {
      const newU = JSON.parse(localStorage.getItem('usuarioActivo'));
      if (newU) showUser(newU); else hideUser();
    }
  });
});
