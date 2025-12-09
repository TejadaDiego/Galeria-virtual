<?php
require_once __DIR__ . "/conexion.php";
header("Content-Type: application/json; charset=utf-8");

$id = intval($_POST["id"] ?? 0);

if ($id <= 0) {
    echo json_encode(["error" => "ID inválido"]);
    exit;
}

$sql = "DELETE FROM trabajos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Error al eliminar"]);
}

$stmt->close();
$conn->close();
?>
