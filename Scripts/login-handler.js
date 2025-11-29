document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const f = new FormData(this);
    const res = await fetch("login.php", { method: "POST", body: f });
    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    if (data.success) {
        localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));
        window.location.href = "inicio.html";
    }
});
