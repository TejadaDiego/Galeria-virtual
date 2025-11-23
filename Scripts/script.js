// ========= FUNCIONES BÁSICAS ========= //
function redirigir(pagina) {
  window.location.href = pagina;
}

function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.textContent = "🙈";
  } else {
    input.type = "password";
    el.textContent = "👁️";
  }
}

// ========= GUARDAR SESIÓN ========= //
function guardarSesion(tipo, email) {
  const usuario = {
    tipo: tipo,
    email: email,
    nombre:
      tipo === "Admin"
        ? "Administrador"
        : tipo === "Estudiante"
        ? "Estudiante"
        : "Comprador/Vendedor",
    foto:
      tipo === "Admin"
        ? "img/admin.png"
        : tipo === "Estudiante"
        ? "img/student.png"
        : "img/user.png",
  };

  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  alert(`Inicio de sesión exitoso como ${usuario.nombre} ✅`);
  window.location.href = "inicio.html";
}

// ========= LOGIN COMPRADOR ========= //
const formComprador = document.getElementById("formComprador");
if (formComprador) {
  formComprador.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailComprador").value.trim();
    const pass = document.getElementById("passComprador").value.trim();
    const error = document.getElementById("errorComprador");

    if (!email || !pass) {
      error.style.display = "block";
      error.textContent = "Completa todos los campos.";
      return;
    }

    guardarSesion("Comprador", email);
  });
}

// ========= LOGIN ESTUDIANTE ========= //
const formEstudiante = document.getElementById("formEstudiante");
if (formEstudiante) {
  formEstudiante.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailEstudiante").value.trim();
    const pass = document.getElementById("passEstudiante").value.trim();
    const error = document.getElementById("errorEstudiante");

    if (!email || !pass) {
      error.style.display = "block";
      error.textContent = "Completa todos los campos.";
      return;
    }

    guardarSesion("Estudiante", email);
  });
}

// ========= LOGIN ADMIN ========= //
const formAdmin = document.getElementById("formAdmin");
if (formAdmin) {
  formAdmin.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("userAdmin").value.trim();
    const pass = document.getElementById("passAdmin").value.trim();
    const error = document.getElementById("errorAdmin");

    if (!user || !pass) {
      error.style.display = "block";
      error.textContent = "Completa todos los campos.";
      return;
    }

    if (pass !== "certus10") {
      error.style.display = "block";
      error.textContent = "Contraseña incorrecta. Intenta nuevamente.";
      return;
    }

    guardarSesion("Admin", user);
  });
}

// ========= MOSTRAR USUARIO LOGEADO EN NAVBAR ========= //
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuario) {
    // eliminar botón "Iniciar sesión" si existe
    const ul = nav.querySelector("ul");
    if (ul) {
      const loginBtn = ul.querySelector('a[href="login.html"]');
      if (loginBtn) loginBtn.style.display = "none";
    }

    // crear caja de usuario
    const userBox = document.createElement("div");
    userBox.classList.add("usuario-box");
    userBox.innerHTML = `
      <img src="${usuario.foto}" alt="Usuario" class="usuario-foto">
      <span class="usuario-nombre">${usuario.nombre}</span>
      <button id="logoutBtn" class="logout-btn">Cerrar sesión</button>
    `;
    nav.appendChild(userBox);

    // cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      alert("Sesión cerrada correctamente.");
      window.location.href = "login.html";
    });
  }
  // === Alternar visibilidad de contraseña ===
function togglePassword(idInput, el) {
  const input = document.getElementById(idInput);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  el.textContent = isPassword ? "🙈" : "👁️";
}

});
