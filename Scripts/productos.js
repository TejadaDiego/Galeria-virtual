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
