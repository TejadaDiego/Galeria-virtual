// =========================================
// ========= FUNCIONES BÁSICAS =============
// =========================================

function redirigir(pagina) {
  window.location.href = pagina;
}

function togglePassword(id, el) {
  const input = document.getElementById(id);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  el.textContent = isPassword ? "🙈" : "👁️";
}



// =========================================
// ========= GUARDAR SESIÓN =================
// =========================================

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



// =========================================
// ===== PROCESOS DE LOGIN ==================
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------
  // LOGIN COMPRADOR
  // -------------------
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

      guardarSesion("Comprador/Vendedor", email);
    });
  }


  // -------------------
  // LOGIN ESTUDIANTE
  // -------------------
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


  // -------------------
  // LOGIN ADMIN
  // -------------------
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
        error.textContent = "Contraseña incorrecta.";
        return;
      }

      guardarSesion("Admin", user);
    });
  }



  // =========================================
  // ===== MOSTRAR USUARIO + LOGOUT ========== 
  // =========================================

  const nav = document.querySelector(".navbar");

  if (nav) {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario) {
      // Ocultar botón "Iniciar sesión"
      const loginBtn = nav.querySelector('a[href="login.html"]');
      if (loginBtn) loginBtn.style.display = "none";

      // Insertar bloque de usuario
      const userBoxHTML = `
        <div class="navbar-user-box" id="navbarUserBox">
          <img src="${usuario.foto}" alt="Foto usuario">
          <div class="user-info">
            <span>${usuario.nombre}</span>
          </div>
          <button id="logoutBtn" class="logout-btn">Salir</button>
        </div>
      `;

      nav.insertAdjacentHTML("beforeend", userBoxHTML);

      // ==============================
      // CERRAR SESIÓN (CORREGIDO)
      // ==============================
      document.getElementById("logoutBtn").addEventListener("click", async () => {
        try {

          // Llamar a logout.php
          await fetch("Php/logout.php", { method: "POST" });

          // Quitar usuario local
          localStorage.removeItem("usuarioActivo");
          localStorage.removeItem("tipoLogin");

          alert("Sesión cerrada correctamente.");

          // Redirigir a selección de rol
          window.location.href = "seleccionar_rol.html";

        } catch (err) {
          console.error(err);
          alert("Error al cerrar sesión.");
        }
      });
    }
  }
});
