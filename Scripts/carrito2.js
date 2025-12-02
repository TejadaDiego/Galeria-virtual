// ===============================
//   CARGAR CARRITO EN TABLA
// ===============================
function cargarCarrito() {
    const tabla = document.getElementById("tablaCarrito");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!tabla) return;

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

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        tabla.innerHTML += `
            <tr>
                <td><img src="${item.imagen}" class="item-img"></td>
                <td>${item.nombre}</td>
                <td>S/ ${item.precio}</td>
                <td>${item.cantidad}</td>
                <td>S/ ${subtotal.toFixed(2)}</td>
                <td class="acciones">
                    <button class="btn" onclick="cambiarCantidad(${index}, 1)">+</button>
                    <button class="btn" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <button class="btn btn-danger" onclick="eliminarItem(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalCarrito").textContent = total.toFixed(2);

    actualizarCarritoUI(); // actualiza el contador global del carrito
}

// ===============================
//   SUMAR / RESTAR CANTIDAD
// ===============================
function cambiarCantidad(i, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito[i].cantidad += cantidad;

    if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

// ===============================
//   ELIMINAR UN ITEM
// ===============================
function eliminarItem(i) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(i, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

// ===============================
//   VACIAR CARRITO
// ===============================
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    cargarCarrito();
}

// ===============================
//   COMPLETAR COMPRA
// ===============================
function comprar() {
    if (confirm("¿Deseas completar la compra?")) {
        alert("✔ Compra realizada con éxito");
        vaciarCarrito();
    }
}

// ===============================
//   INICIALIZACIÓN AL CARGAR PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
    actualizarCarritoUI(); // vuelve a sincronizar el contador global
});
