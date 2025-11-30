document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // OBTENER LISTA DE USUARIOS REGISTRADOS
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // BUSCAR USUARIO
    const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
        alert("❌ Correo o contraseña incorrectos.");
        return;
    }

    // GUARDAR USUARIO ACTIVO
    const usuarioActivo = {
        nombre: usuarioEncontrado.nombre,
        correo: usuarioEncontrado.email,
        foto: usuarioEncontrado.foto || "Img/default.png"
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioActivo));

    alert("✅ Inicio de sesión exitoso");
    window.location.href = "inicio.html";
});
