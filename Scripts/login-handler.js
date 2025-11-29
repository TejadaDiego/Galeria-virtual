document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const f = new FormData(this);
  const res = await fetch("login.php", { method: "POST", body: f });
  const data = await res.json();

  if (data.success) {
    // Guardar usuario en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify(data));

    // Redirigir
    window.location.href = "inicio.html";
  } else {
    alert(data.error);
  }
});
