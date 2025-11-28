<?php
session_start();
require_once __DIR__ . "/conexion.php";  // Ruta absoluta segura

// Verificar carrito
if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    die("Carrito vacío");
}

$cart = $_SESSION['cart'];

// Calcular total
$total = 0;
foreach ($cart as $c) {
    $total += floatval($c["subtotal"]);
}

// Dirección opcional
$direccion = $_POST['direccion'] ?? null;

// =====================================
// 1. Registrar el pedido
// =====================================
$sql = "INSERT INTO pedidos (total, direccion) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error en prepare(): " . $conn->error);
}

$stmt->bind_param("ds", $total, $direccion);
$stmt->execute();

$pedido_id = $stmt->insert_id;
$stmt->close();

// =====================================
// 2. Registrar detalle de productos
// =====================================
$sql_det = "INSERT INTO pedido_detalle
(pedido_id, titulo, precio, cantidad, subtotal)
VALUES (?, ?, ?, ?, ?)";

$stmt_det = $conn->prepare($sql_det);

if (!$stmt_det) {
    die("Error en prepare detalle(): " . $conn->error);
}

foreach ($cart as $item) {

    $precio = floatval($item['precio']);
    $cantidad = intval($item['cantidad']);
    $subtotal = floatval($item['subtotal']);
    $titulo = $item['titulo'];

    $stmt_det->bind_param(
        "isdis",
        $pedido_id,
        $titulo,
        $precio,
        $cantidad,
        $subtotal
    );

    $stmt_det->execute();
}

$stmt_det->close();
$conn->close();

// =====================================
// 3. Limpiar carrito
// =====================================
unset($_SESSION['cart']);

// =====================================
// 4. Redirigir a página de éxito
// =====================================
header("Location: ../compra_exitosa.html");
exit;
