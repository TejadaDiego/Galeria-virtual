<?php
require_once __DIR__ . "/conexion.php";
header("Content-Type: application/json; charset=utf-8");

// ===============================
// VALIDAR USUARIO
// ===============================
$usuario_id = intval($_POST["usuario_id"] ?? 0);

if ($usuario_id <= 0) {
    echo json_encode(["error" => "Debes iniciar sesión para realizar la compra"]);
    exit;
}

// ===============================
// VALIDAR CARRITO
// ===============================
$carrito = json_decode($_POST["carrito"] ?? "[]", true);

if (!is_array($carrito) || count($carrito) === 0) {
    echo json_encode(["error" => "El carrito está vacío"]);
    exit;
}

// ===============================
// CALCULAR TOTAL
// ===============================
$total = 0;
foreach ($carrito as $item) {
    $total += floatval($item["precio"]) * intval($item["cantidad"]);
}

// ===============================
// INSERTAR COMPRA
// ===============================
$sqlCompra = "INSERT INTO compras (usuario_id, total, fecha) VALUES (?, ?, NOW())";
$stmt = $conn->prepare($sqlCompra);
$stmt->bind_param("id", $usuario_id, $total);

if (!$stmt->execute()) {
    echo json_encode(["error" => "Error al registrar la compra"]);
    exit;
}

$compra_id = $stmt->insert_id;
$stmt->close();

// ===============================
// INSERTAR DETALLES DE COMPRA
// ===============================
$sqlDetalle = "
    INSERT INTO compras_detalle 
    (compra_id, trabajo_id, cantidad, precio, subtotal)
    VALUES (?, ?, ?, ?, ?)
";

$stmtD = $conn->prepare($sqlDetalle);

foreach ($carrito as $item) {
    $trabajo_id = intval($item["id"]);
    $cantidad = intval($item["cantidad"]);
    $precio = floatval($item["precio"]);
    $subtotal = $precio * $cantidad;

    $stmtD->bind_param("iiidd", $compra_id, $trabajo_id, $cantidad, $precio, $subtotal);
    $stmtD->execute();
}

$stmtD->close();
$conn->close();

// ===============================
// RESPUESTA
// ===============================
echo json_encode([
    "success" => true,
    "compra_id" => $compra_id
]);
?>
