// =============================================
//   CARRITO GLOBAL
// =============================================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// =============================================
//   ACTUALIZAR CONTADOR VISUAL
// =============================================
function actualizarCarritoUI() {
    const contador = document.getElementById("cartCount");
    if (!contador) return;

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;
}


// =============================================
//   GUARDAR CARRITO EN LOCALSTORAGE
// =============================================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();
}


// =============================================
//   AGREGAR AL CARRITO
// =============================================
function agregarAlCarrito(id, nombre, precio, imagen) {
    if (!imagen) imagen = "img/default.png";

    const item = carrito.find(p => p.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({
            id,
            nombre,
            precio: Number(precio),
            cantidad: 1,
            imagen
        });
    }

    guardarCarrito();
    alert("Producto agregado al carrito 🛒");
}


// =============================================
//   MOSTRAR TABLA DEL CARRITO
// =============================================
function cargarCarrito() {
    const tabla = document.getElementById("tablaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!tabla || !totalCarrito) return;

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

    if (carrito.length === 0) {
        tabla.innerHTML += `
            <tr>
                <td colspan="6" style="text-align:center; padding:15px;">
                    El carrito está vacío
                </td>
            </tr>
        `;
        totalCarrito.textContent = "0.00";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        tabla.innerHTML += `
            <tr>
                <td><img src="${item.imagen}" class="item-img"></td>
                <td>${item.nombre}</td>
                <td>S/ ${item.precio.toFixed(2)}</td>
                <td>${item.cantidad}</td>
                <td>S/ ${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn" onclick="cambiarCantidad(${index}, 1)">+</button>
                    <button class="btn" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <button class="btn btn-danger" onclick="eliminarItem(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    totalCarrito.textContent = total.toFixed(2);

    actualizarCarritoUI();
}


// =============================================
//   SUMAR / RESTAR CANTIDAD
// =============================================
function cambiarCantidad(i, op) {
    if (!carrito[i]) return;

    carrito[i].cantidad += op;

    if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
    }

    guardarCarrito();
    cargarCarrito();
}


// =============================================
//   ELIMINAR ITEM
// =============================================
function eliminarItem(i) {
    carrito.splice(i, 1);
    guardarCarrito();
    cargarCarrito();
}


// =============================================
//   VACIAR CARRITO
// =============================================
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarritoUI();
    cargarCarrito();
}


// =============================================
//   FINALIZAR COMPRA (GUARDAR EN BD)
// =============================================
async function finalizarCompra() {

    if (carrito.length === 0) {
        alert("❌ El carrito está vacío.");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        alert("⚠️ Debes iniciar sesión para comprar.");
        window.location.href = "login.html";
        return;
    }

    const fd = new FormData();
    fd.append("usuario_id", usuario.id);
    fd.append("carrito", JSON.stringify(carrito));

    try {
        const res = await fetch("finalizar_compra.php", {
            method: "POST",
            body: fd
        });

        const data = await res.json();
        console.log("RESPUESTA BD:", data);

        if (data.success) {
            alert("✅ Compra realizada con éxito. ID de pedido: #" + data.compra_id);

            carrito = [];
            guardarCarrito();
            cargarCarrito();

            window.location.href = "compra_exitosa.html";
        } else {
            alert("❌ Error: " + data.error);
        }

    } catch (e) {
        console.error(e);
        alert("❌ Error de conexión con el servidor.");
    }
}


// =============================================
//   INICIALIZACIÓN
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarritoUI();
    cargarCarrito();
});
