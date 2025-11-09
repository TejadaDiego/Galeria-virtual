let imagenes = [
  {
    "url": "img/1.png",
    "nombre": "Galería Virtual",
    "descripcion": "Plataforma donde los estudiantes pueden mostrar y vender sus trabajos creativos.",
    "link": "proyectos/galeria_virtual.html"
  },
  {
    "url": "img/2.jpg",
    "nombre": "Aplicación de Hackatones",
    "descripcion": "Sistema para organizar hackatones, inscribir equipos y subir proyectos.",
    "link": "proyectos/hackatones.html"
  },
  {
    "url": "img/3.jpg",
    "nombre": "Mentoría entre Estudiantes",
    "descripcion": "Conecta a estudiantes de ciclos iniciales con mentores para guías académicas.",
    "link": "proyectos/mentoria.html"
  },
  {
    "url": "img/4.png",
    "nombre": "Aplicación de Rúbricas",
    "descripcion": "Facilita evaluaciones automáticas mediante rúbricas y resultados instantáneos.",
    "link": "proyectos/rubricas.html"
  },
];

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let actual = 0;

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
    imagen.innerHTML = `
      <a href="${imagenes[actual].link}" target="_blank">
        <img class="img" src="${imagenes[actual].url}" alt="${imagenes[actual].nombre}" loading="lazy">
      </a>`;
    texto.innerHTML = `
      <h3>${imagenes[actual].nombre}</h3>
      <p>${imagenes[actual].descripcion}</p>`;
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
