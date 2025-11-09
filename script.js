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

// LOGIN COMPRADOR
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

    alert("Inicio de sesión exitoso como Comprador/Vendedor ✅");
    window.location.href = "index.html";
  });
}

// LOGIN ESTUDIANTE
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

    alert("Inicio de sesión exitoso como Estudiante 🎓");
    window.location.href = "index.html";
  });
}

// LOGIN ADMIN
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

    alert("Bienvenido Administrador 🔐");
    window.location.href = "index.html";
  });
}
