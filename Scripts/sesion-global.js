// Scripts/sesion-global.js
window.addEventListener('DOMContentLoaded', () => {
  const navbarUserBox = document.getElementById('navbarUserBox') || document.getElementById('usuarioNav');
  const btnLogin = document.getElementById('btnLogin');

  function actualizar(usuario) {
    // Si no existe el contenedor, nada que hacer
    if (!navbarUserBox) return;

    if (!usuario) {
      // Usuario no logueado
      navbarUserBox.innerHTML = '';
      if (btnLogin) {
        btnLogin.textContent = 'Iniciar sesión';
        btnLogin.href = 'login.html';
      }
      return;
    }

    // Usuario logueado: mostrar avatar + nombre y menú
    const foto = usuario.foto && usuario.foto.trim() !== '' ? usuario.foto : 'img/default.png';
    const nombre = usuario.nombre || 'Usuario';

    navbarUserBox.classList.add('usuario-box');
    navbarUserBox.innerHTML = `
      <img src="${foto}" alt="${nombre}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;cursor:pointer"/>
      <span style="margin-left:8px;cursor:pointer">${nombre}</span>
      <div id="user-menu" style="display:none;position:absolute;right:20px;top:70px;background:#111;padding:10px;border-radius:8px;">
        <a href="perfil.html" style="display:block;color:#fff;margin-bottom:6px;text-decoration:none;">Ver perfil</a>
        <a id="cerrarSesionBtn" href="#" style="display:block;color:#fff;text-decoration:none;">Cerrar sesión</a>
      </div>
    `;

    // Ajusta el login button
    if (btnLogin) {
      btnLogin.textContent = 'Cuenta';
      btnLogin.href = 'perfil.html';
    }

    // mostrar/ocultar menú al click
    const img = navbarUserBox.querySelector('img');
    const span = navbarUserBox.querySelector('span');
    const menu = document.getElementById('user-menu');

    const toggle = (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };
    img.addEventListener('click', toggle);
    span.addEventListener('click', toggle);

    // cerrar cuando clic fuera
    document.addEventListener('click', () => { if (menu) menu.style.display = 'none'; });

    // cerrar sesión (llama logout.php)
    const logoutBtn = document.getElementById('cerrarSesionBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('Php/logout.php', { method: 'POST' });
        localStorage.removeItem('usuarioActivo');
        // notificar a otras pestañas
        localStorage.setItem('usuarioActivo', '');
        window.location.href = 'inicio.html';
      });
    }
  }

  // cargar usuario de localStorage (si existe)
  let usuario = null;
  try { usuario = JSON.parse(localStorage.getItem('usuarioActivo')); } catch {}
  actualizar(usuario);

  // reaccionar a cambios en otras pestañas
  window.addEventListener('storage', (ev) => {
    if (ev.key === 'usuarioActivo') {
      let u = null;
      try { u = JSON.parse(localStorage.getItem('usuarioActivo')); } catch {}
      actualizar(u);
    }
  });
});
