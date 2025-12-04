// ===============================
//  PRODUCTOS FIJOS DEL CATÁLOGO
// ===============================

const productosFijos = [
  {
    id: 1,
    titulo: "Diseño de Logo Minimalista",
    descripcion: "Logo profesional estilo minimalista, editable.",
    precio: 25,
    imagen: "img/logo1.jpg"
  },
  {
    id: 2,
    titulo: "Banner Publicitario",
    descripcion: "Banner en alta calidad listo para imprimir.",
    precio: 18,
    imagen: "img/banner1.jpg"
  },
  {
    id: 3,
    titulo: "Flyer Digital",
    descripcion: "Flyer moderno ideal para redes sociales.",
    precio: 15,
    imagen: "img/flyer1.jpg"
  },
  {
    id: 4,
    titulo: "Cartel Comercial",
    descripcion: "Cartel limpio y profesional editable.",
    precio: 20,
    imagen: "img/cartel1.jpg"
  },
  {
    id: 5,
    titulo: "Mockup Profesional",
    descripcion: "Mockup premium para exhibición de productos.",
    precio: 30,
    imagen: "img/mockup1.jpg"
  }
];

// ===============================
//  FUNCIÓN PARA MOSTRAR CATÁLOGO
// ===============================

function cargarCatalogoFijo() {
  const catalogo = document.getElementById("catalogo");
  if (!catalogo) return;

  productosFijos.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.imagen}">
      <h3>${p.titulo}</h3>
      <p>${p.descripcion}</p>

      <div class="precio-carrito">
        <span class="precio">S/ ${p.precio.toFixed(2)}</span>

        <button onclick="agregarAlCarrito(${p.id}, '${p.titulo}', ${p.precio}, '${p.imagen}')">
          🛒 Añadir
        </button>
      </div>
    `;

    catalogo.appendChild(div);
  });
}

// ===============================
//  AUTO-EJECUTAR
// ===============================

document.addEventListener("DOMContentLoaded", cargarCatalogoFijo);
