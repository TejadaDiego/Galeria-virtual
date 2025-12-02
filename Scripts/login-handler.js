// Scripts/login-handler.js
document.querySelectorAll('form#loginForm').forEach(form => {
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const f = new FormData(this);
    const res = await fetch('login.php', { method:'POST', body: f });
    const data = await res.json().catch(()=>null);

    if (res.ok && data && data.usuario) {
      // Guardar usuario en localStorage
      localStorage.setItem('usuarioActivo', JSON.stringify({
        id: data.usuario.id,
        nombre: data.usuario.nombre,
        correo: data.usuario.email,
        foto: data.usuario.foto || 'Img/default.png',
        tipo: data.usuario.tipo
      }));
      // Actualizar UI (otras páginas escuchan storage)
      window.location.href = 'inicio.html';
    } else {
      const msg = data && data.error ? data.error : 'Error al iniciar sesión';
      alert(msg);
    }
  });
});
