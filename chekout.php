<?php
session_start();
require_once __DIR__ . "/conexion.php"; 

// =====================================
// 0. Validar carrito
// =====================================
if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    die("Carrito vacío");
}

$cart = $_SESSION['cart'];

// Usuario logueado (si lo usas)
$usuario_id = $_SESSION['user_id'] ?? null;

// =====================================
// 1. Calcular total
// =====================================
$total = 0;
foreach ($cart as $c) {
    $total += floatval($c["subtotal"]);
}

$direccion = $_POST['direccion'] ?? null;
if ($direccion === "") $direccion = null;

// =====================================
// 2. Registrar Pedido
// =====================================
$sql = "INSERT INTO pedidos (usuario_id, total, direccion) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error en prepare(): " . $conn->error);
}

// i = int (usuario) | d = double (total) | s = string (direccion)
$stmt->bind_param("ids", $usuario_id, $total, $direccion);

if (!$stmt->execute()) {
    die("Error al insertar pedido: " . $stmt->error);
}

$pedido_id = $stmt->insert_id;
$stmt->close();

// =====================================
// 3. Registrar Detalles del Pedido
// =====================================
$sql_det = "INSERT INTO pedido_detalle 
(pedido_id, titulo, precio, cantidad, subtotal)
VALUES (?, ?, ?, ?, ?)";

$stmt_det = $conn->prepare($sql_det);

if (!$stmt_det) {
    die("Error en prepare detalle(): " . $conn->error);
}

foreach ($cart as $item) {

    $titulo   = $item['titulo'];
    $precio   = floatval($item['precio']);
    $cantidad = intval($item['cantidad']);
    $subtotal = floatval($item['subtotal']);

    // i = int | s = string | d = double | i = int | d = double
    $stmt_det->bind_param("isdid",
        $pedido_id,
        $titulo,
        $precio,
        $cantidad,
        $subtotal
    );

    if (!$stmt_det->execute()) {
        die("Error al insertar detalle: " . $stmt_det->error);
    }
}

$stmt_det->close();
$conn->close();

// =====================================
// 4. LIMPIAR CARRITO
// =====================================
unset($_SESSION['cart']);

// =====================================
// 5. Redirigir al mensaje de compra exitosa
// =====================================
header("Location: ../compra_exitosa.html");
exit;
