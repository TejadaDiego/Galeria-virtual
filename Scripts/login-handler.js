// Scripts/login-handler.js
document.getElementById('loginForm')?.addEventListener('submit', async function(e){
  e.preventDefault();
  const f = new FormData(this);
  const res = await fetch('Php/login.php', { method: 'POST', body: f });
  const text = await res.text();

  if (!res.ok) {
    alert(text);
    return;
  }

  // si OK, el servidor devuelve JSON con datos del usuario
  try {
    const usuario = JSON.parse(text);
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    // forzar actualización en otras pestañas
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    window.location.href = 'inicio.html';
  } catch (err) {
    alert('Respuesta inesperada del servidor: ' + text);
  }
});
