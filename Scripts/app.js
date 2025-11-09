// === Datos del carrusel ===
let imagenes = [
  {
    "url": "img/1.png",
    "nombre": "Galería Virtual",
    "descripcion": "Plataforma donde los estudiantes pueden mostrar y vender sus trabajos creativos."
  },
  {
    "url": "img/2.jpg",
    "nombre": "Aplicación de Hackatones",
    "descripcion": "Sistema para organizar hackatones, inscribir equipos y subir proyectos."
  },
  {
    "url": "img/3.jpg",
    "nombre": "Mentoría entre Estudiantes",
    "descripcion": "Conecta a estudiantes de ciclos iniciales con mentores para guías académicas."
  },
  {
    "url": "img/4.png",
    "nombre": "Aplicación de Rúbricas",
    "descripcion": "Facilita evaluaciones automáticas mediante rúbricas y resultados instantáneos."
  },
];

// === Elementos del DOM ===
let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let actual = 0;

// === Inicialización del carrusel ===
posicionCarrusel();
mostrarCarrusel();

// --- BOTONES DE NAVEGACIÓN ---
atras.addEventListener('click', function() {
  actual--;
  if (actual < 0) actual = imagenes.length - 1;
  mostrarCarrusel();
});

adelante.addEventListener('click', function() {
  actual++;
  if (actual >= imagenes.length) actual = 0;
  mostrarCarrusel();
});

// --- FUNCIÓN PRINCIPAL ---
function mostrarCarrusel() {
  imagen.classList.add("fade");
  setTimeout(() => {
    // Cada imagen será clickeable y llevará a Contenido.html
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

// --- FUNCIÓN PARA PUNTOS INFERIORES ---
function posicionCarrusel() {
  puntos.innerHTML = "";
  for (let i = 0; i < imagenes.length; i++) {
    puntos.innerHTML += `<p class="${i === actual ? 'bold' : ''}">•</p>`;
  }
}

// --- AUTO ROTACIÓN (cada 5 segundos) ---
let autoPlay = setInterval(() => {
  actual++;
  if (actual >= imagenes.length) actual = 0;
  mostrarCarrusel();
}, 5000);

// --- PAUSA AUTOMÁTICA AL PASAR EL MOUSE ---
imagen.addEventListener("mouseenter", () => clearInterval(autoPlay));
imagen.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => {
    actual++;
    if (actual >= imagenes.length) actual = 0;
    mostrarCarrusel();
  }, 5000);
});

// --- CAMBIO MANUAL AL HACER CLICK EN LOS PUNTOS ---
puntos.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    actual = Array.from(puntos.children).indexOf(e.target);
    mostrarCarrusel();
  }
});

// --- REDIRECCIÓN AL HACER CLIC EN UNA IMAGEN ---
imagen.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "img") {
    window.location.href = "Contenido.html";
  }
});
