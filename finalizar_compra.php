<?php
require_once __DIR__ . "/conexion.php";
header("Content-Type: application/json; charset=utf-8");

// ======================
// VALIDAR LOGIN
// ======================
$usuario_id = intval($_POST["usuario_id"] ?? 0);

if ($usuario_id <= 0) {
    echo json_encode(["error" => "Debes iniciar sesión para comprar"]);
    exit;
}

// ======================
// VALIDAR CARRITO
// ======================
$carrito = json_decode($_POST["carrito"] ?? "[]", true);

if (!$carrito || count($carrito) == 0) {
    echo json_encode(["error" => "El carrito está vacío"]);
    exit;
}

// ======================
// CALCULAR TOTAL
// ======================
$total = 0;

foreach ($carrito as $item) {
    $total += $item["precio"] * $item["cantidad"];
}

// ======================
// INSERTAR COMPRA
// ======================
$sqlCompra = "INSERT INTO compras (usuario_id, total) VALUES (?, ?)";
$stmt = $conn->prepare($sqlCompra);
$stmt->bind_param("id", $usuario_id, $total);

if (!$stmt->execute()) {
    echo json_encode(["error" => "Error al registrar compra"]);
    exit;
}

$compra_id = $stmt->insert_id;
$stmt->close();

// ======================
// INSERTAR DETALLES
// ======================
$sqlDetalle = "
    INSERT INTO compras_detalle 
    (compra_id, trabajo_id, cantidad, precio, subtotal)
    VALUES (?, ?, ?, ?, ?)
";

$stmtD = $conn->prepare($sqlDetalle);

foreach ($carrito as $item) {
    $subtotal = $item["precio"] * $item["cantidad"];
    $stmtD->bind_param(
        "iiidd",
        $compra_id,
        $item["id"],
        $item["cantidad"],
        $item["precio"],
        $subtotal
    );
    $stmtD->execute();
}

$stmtD->close();
$conn->close();

echo json_encode(["success" => true, "compra_id" => $compra_id]);
?>
