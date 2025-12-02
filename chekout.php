<?php
// Php/checkout.php
session_start();
require_once __DIR__ . "/conexion.php";

if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    die("Carrito vacío");
}
$cart = $_SESSION['cart'];

$total = 0;
foreach ($cart as $c) $total += floatval($c['subtotal']);

$direccion = trim($_POST['direccion'] ?? null);

// Insert pedido
$stmt = $conn->prepare("INSERT INTO pedidos (total, direccion) VALUES (?, ?)");
if (!$stmt) { die("Error prepare pedidos: ".$conn->error); }
$stmt->bind_param("ds", $total, $direccion);
$stmt->execute();
$pedido_id = $stmt->insert_id;
$stmt->close();

// Insert detalles
$stmt = $conn->prepare("INSERT INTO pedido_detalle (pedido_id, titulo, precio, cantidad, subtotal) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) { die("Error prepare detalle: ".$conn->error); }

foreach ($cart as $item) {
    $precio = floatval($item['precio']);
    $cantidad = intval($item['cantidad']);
    $subtotal = floatval($item['subtotal']);
    $titulo = $item['titulo'];
    $stmt->bind_param("isdis", $pedido_id, $titulo, $precio, $cantidad, $subtotal);
    $stmt->execute();
}
$stmt->close();
$conn->close();

// Limpiar carrito y redirigir
unset($_SESSION['cart']);
header("Location: ../compra_exitosa.html");
exit;
