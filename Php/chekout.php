<?php
// Php/checkout.php
session_start();
require_once 'conexion.php';

if (!isset($_SESSION['usuarioActivo'])) {
    header("Location: ../login.html"); exit;
}

$cart = $_SESSION['cart'] ?? [];
if (empty($cart)) {
    echo "No hay productos en el carrito.";
    exit;
}

$usuario = $_SESSION['usuarioActivo'];
$direccion = trim($_POST['direccion'] ?? '');
$total = 0; $cantidad_total = 0;
foreach ($cart as $c){ $total += $c['subtotal']; $cantidad_total += $c['cantidad']; }

// Insertar pedido
$stmt = $conn->prepare("INSERT INTO pedidos (usuario_id, total, cantidad_total, direccion) VALUES (?, ?, ?, ?)");
$stmt->bind_param("idiss", $usuario['id'], $total, $cantidad_total, $direccion);
if (!$stmt->execute()) {
    http_response_code(500); echo "Error creando pedido."; exit;
}
$pedido_id = $stmt->insert_id;
$stmt->close();

// Insertar items
$stmt_item = $conn->prepare("INSERT INTO items_pedido (pedido_id, trabajo_id, titulo, precio_unit, cantidad, subtotal) VALUES (?, ?, ?, ?, ?, ?)");
foreach ($cart as $c) {
    $stmt_item->bind_param("iisdid", $pedido_id, $c['id'], $c['titulo'], $c['precio'], $c['cantidad'], $c['subtotal']);
    $stmt_item->execute();
}
$stmt_item->close();

// Limpiar carrito
unset($_SESSION['cart']);

// Confirmación (puedes redirigir a una página)
echo "Compra confirmada. Pedido ID: $pedido_id. Cantidad total: $cantidad_total. Total: S/".number_format($total,2);
$conn->close();
?>
