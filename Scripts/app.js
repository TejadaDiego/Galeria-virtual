// ================================
//   CARRUSEL - Galería Virtual
// ================================

// Lista de imágenes del carrusel
const imagenes = [
  {
    url: "img/1.png",
    nombre: "Galería Virtual",
    descripcion: "Plataforma donde los estudiantes pueden mostrar y vender sus trabajos creativos."
  },
  {
    url: "img/2.jpg",
    nombre: "Aplicación de Hackatones",
    descripcion: "Sistema para organizar hackatones, inscribir equipos y subir proyectos."
  },
  {
    url: "img/3.jpg",
    nombre: "Mentoría entre Estudiantes",
    descripcion: "Conecta a estudiantes de ciclos iniciales con mentores para guías académicas."
  },
  {
    url: "img/4.png",
    nombre: "Aplicación de Rúbricas",
    descripcion: "Facilita evaluaciones automáticas mediante rúbricas y resultados instantáneos."
  }
];

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {

  // Captura de elementos del DOM
  const atras = document.getElementById("atras");
  const adelante = document.getElementById("adelante");
  const imagen = document.getElementById("img");
  const puntos = document.getElementById("puntos");
  const texto = document.getElementById("texto");

  // Prevenir errores si el carrusel no está en esta página
  if (!atras || !adelante || !imagen || !puntos || !texto) {
    console.warn("⚠ app.js: Elementos del carrusel no encontrados. (Es normal si no estás en inicio.html)");
    return;
  }

  let actual = 0;
  let autoPlay;

  // Mostrar carrusel
  function mostrarCarrusel() {
    imagen.classList.add("fade");

    setTimeout(() => {
      imagen.innerHTML = `
        <img class="img" src="${imagenes[actual].url}" alt="${imagenes[actual].nombre}" loading="lazy">
      `;

      texto.innerHTML = `
        <h3>${imagenes[actual].nombre}</h3>
        <p>${imagenes[actual].descripcion}</p>
      `;

      posicionCarrusel();
      imagen.classList.remove("fade");
    }, 300);
  }

  // Crear puntos del carrusel
  function posicionCarrusel() {
    puntos.innerHTML = "";
    imagenes.forEach((_, i) => {
      puntos.innerHTML += `<p class="${i === actual ? 'bold' : ''}">•</p>`;
    });
  }

  // Auto-play
  function iniciarAutoPlay() {
    autoPlay = setInterval(() => {
      actual = (actual + 1) % imagenes.length;
      mostrarCarrusel();
    }, 5000);
  }

  function detenerAutoPlay() {
    clearInterval(autoPlay);
  }

  // Eventos
  atras.addEventListener("click", () => {
    actual = (actual - 1 + imagenes.length) % imagenes.length;
    mostrarCarrusel();
  });

  adelante.addEventListener("click", () => {
    actual = (actual + 1) % imagenes.length;
    mostrarCarrusel();
  });

  imagen.addEventListener("mouseenter", detenerAutoPlay);
  imagen.addEventListener("mouseleave", iniciarAutoPlay);

  puntos.addEventListener("click", (e) => {
    if (e.target.tagName === "P") {
      actual = Array.from(puntos.children).indexOf(e.target);
      mostrarCarrusel();
    }
  });

  // Al hacer clic en la imagen → ir a Contenido
  imagen.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "img") {
      window.location.href = "contenido.html";
    }
  });

  // Inicializar carrusel
  mostrarCarrusel();
  iniciarAutoPlay();
});
