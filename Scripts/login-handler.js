document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const f = new FormData(this);
  const res = await fetch("login.php", { method: "POST", body: f });
  const text = await res.text();

  if (res.ok) {
    try {
      const usuario = JSON.parse(text);
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      window.location.href = "inicio.html";
    } catch {
      alert("Respuesta inesperada del servidor.");
    }
  } else {
    alert(text);
  }
});
