const productos = [
  { id: 1, titulo: "Creando el Futuro Digital", descripcion: "Representa el proceso de codificación.", imagen: "https://picsum.photos/400?random=1", precio: 15 },
  { id: 2, titulo: "Proceso Creativo", descripcion: "Simboliza la creación artística activa.", imagen: "https://picsum.photos/400?random=2", precio: 18 },
  { id: 3, titulo: "Ecosistema Web", descripcion: "Lenguajes esenciales del desarrollo web.", imagen: "https://picsum.photos/400?random=3", precio: 12 },
  { id: 4, titulo: "Inspiración en Color", descripcion: "Arte y paletas de colores.", imagen: "https://picsum.photos/400?random=4", precio: 20 },
  { id: 5, titulo: "Mente y Cuerpo", descripcion: "Disciplina deportiva visual.", imagen: "https://picsum.photos/400?random=5", precio: 10 },
  { id: 6, titulo: "El Universo", descripcion: "Física y energía.", imagen: "https://picsum.photos/400?random=6", precio: 14 },
  { id: 7, titulo: "Matemáticas", descripcion: "Retos y ecuaciones.", imagen: "https://picsum.photos/400?random=7", precio: 16 },
  { id: 8, titulo: "Historia y Sociedad", descripcion: "Evolución humana.", imagen: "https://picsum.photos/400?random=8", precio: 19 },
  { id: 9, titulo: "Inglés", descripcion: "Habilidades lingüísticas.", imagen: "https://picsum.photos/400?random=9", precio: 13 },
  { id: 10, titulo: "Bases de Datos", descripcion: "Diseño de sistemas.", imagen: "https://picsum.photos/400?random=10", precio: 17 }
];

const contenedor = document.getElementById("catalogo");

productos.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${p.imagen}" alt="">
    <h3>${p.titulo}</h3>
    <p>${p.descripcion}</p>
    <div class="precio-carrito">
      <span class="precio">S/ ${p.precio}</span>
      <button onclick="agregarAlCarrito(${p.id}, '${p.titulo}', ${p.precio})">🛒 Añadir</button>
    </div>
  `;

  contenedor.appendChild(card);
});
