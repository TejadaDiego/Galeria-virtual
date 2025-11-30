document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const f = new FormData(this);
  const res = await fetch('login.php', { method: 'POST', body: f });
  const text = await res.text();

  if (!res.ok) {
    alert(text);
    return;
  }

  try {
    const usuario = JSON.parse(text);
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    // puedes disparar evento para actualizar navbar en otras pestañas
    window.dispatchEvent(new Event('actualizarUsuarioUI'));
    window.location.href = 'inicio.html';
  } catch (err) {
    alert('Respuesta inesperada del servidor: ' + text);
  }
});
