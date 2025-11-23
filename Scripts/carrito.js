// ===============================
//   CARRITO GLOBAL DEL SISTEMA
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 👉 Actualiza el contador del carrito visual
function actualizarCarritoUI() {
    const contador = document.getElementById("cartCount");
    if (contador) {
        contador.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }
}

// 👉 Guarda y notifica cambio global
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();
}

// ===============================
//      AGREGAR AL CARRITO
// ===============================
function agregarAlCarrito(id, nombre, precio, imagen) {

    if (!imagen) imagen = "img/default.png";

    const item = carrito.find(p => p.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            cantidad: 1,
            imagen
        });
    }

    guardarCarrito();
    alert("Producto agregado al carrito 🛒");
}

// ===============================
//      CAMBIAR CANTIDAD
// ===============================
function cambiarCantidad(i, operacion) {
    carrito[i].cantidad += operacion;

    if (carrito[i].cantidad <= 0) carrito.splice(i, 1);

    guardarCarrito();
    cargarCarrito();
}

// ===============================
//      ELIMINAR ITEM
// ===============================
function eliminarItem(i) {
    carrito.splice(i, 1);
    guardarCarrito();
    cargarCarrito();
}

// ===============================
//      VACIAR CARRITO
// ===============================
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarritoUI();
    cargarCarrito();
}

// ===============================
//       COMPRA
// ===============================
function comprar() {
    alert("✔ Compra realizada con éxito");
    vaciarCarrito();
}

// ===============================
//     MOSTRAR CARRITO (TABLA)
// ===============================
function cargarCarrito() {
    const tabla = document.getElementById("tablaCarrito");
    if (!tabla) return;

    let total = 0;

    tabla.innerHTML = `
        <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cant.</th>
            <th>Subtotal</th>
            <th>Acciones</th>
        </tr>
    `;

    carrito.forEach((item, i) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        tabla.innerHTML += `
            <tr>
                <td><img src="${item.imagen}" class="item-img"></td>
                <td>${item.nombre}</td>
                <td>S/ ${item.precio}</td>
                <td>${item.cantidad}</td>
                <td>S/ ${subtotal}</td>
                <td class="acciones">
                    <button class="btn" onclick="cambiarCantidad(${i}, 1)">+</button>
                    <button class="btn" onclick="cambiarCantidad(${i}, -1)">-</button>
                    <button class="btn btn-danger" onclick="eliminarItem(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalCarrito").textContent = total.toFixed(2);
}

// ===============================
//   INICIALIZACIÓN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarritoUI();
    cargarCarrito();
});
