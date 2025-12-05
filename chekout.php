<?php
// Php/checkout.php
session_start();
require_once __DIR__ . "/conexion.php";

// =============================================
// VALIDAR CARRITO
// =============================================
if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    die("Carrito vacío");
}

$cart = $_SESSION['cart'];

// Calcular total
$total = 0;
foreach ($cart as $c) {
    $total += floatval($c['subtotal']);
}

// Dirección enviada en el formulario
$direccion = trim($_POST['direccion'] ?? "");

// =============================================
// INSERTAR PEDIDO
// =============================================
$stmt = $conn->prepare("INSERT INTO pedidos (total, direccion) VALUES (?, ?)");
if (!$stmt) { 
    die("Error en prepare (pedidos): " . $conn->error); 
}

// PARAMETROS:
// d = double (total)
// s = string (direccion)
$stmt->bind_param("ds", $total, $direccion);

if (!$stmt->execute()) {
    die("Error al insertar pedido: " . $stmt->error);
}

$pedido_id = $stmt->insert_id;
$stmt->close();

// =============================================
// INSERTAR DETALLES
// =============================================
$stmt = $conn->prepare("
    INSERT INTO pedido_detalle (pedido_id, titulo, precio, cantidad, subtotal) 
    VALUES (?, ?, ?, ?, ?)
");

if (!$stmt) { 
    die("Error en prepare (detalle): " . $conn->error); 
}

foreach ($cart as $item) {

    $titulo = $item['titulo'];
    $precio = floatval($item['precio']);
    $cantidad = intval($item['cantidad']);
    $subtotal = floatval($item['subtotal']);

    // PARAMETROS:
    // i = integer (pedido_id)
    // s = string (titulo)
    // d = double (precio)
    // i = integer (cantidad)
    // d = double (subtotal)
    $stmt->bind_param("isdid", $pedido_id, $titulo, $precio, $cantidad, $subtotal);

    if (!$stmt->execute()) {
        die("Error al insertar detalle: " . $stmt->error);
    }
}

$stmt->close();
$conn->close();

// =============================================
// LIMPIAR CARRITO Y REDIRIGIR
// =============================================
unset($_SESSION['cart']);

header("Location: ../compra_exitosa.html");
exit;
?>
