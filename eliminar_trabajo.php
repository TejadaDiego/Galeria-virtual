<?php
require_once __DIR__ . "/conexion.php";
header("Content-Type: application/json; charset=utf-8");

// ===============================
// VALIDAR ID
// ===============================
$id = intval($_POST["id"] ?? 0);

if ($id <= 0) {
    echo json_encode(["error" => "ID inválido: " . $id]);
    exit;
}

// ===============================
// DEBUG: VERIFICAR QUE LLEGUE
// ===============================
// file_put_contents("debug_log.txt", "ID recibido: $id\n", FILE_APPEND);

// ===============================
// PREPARAR DELETE
// ===============================
$sql = "DELETE FROM trabajos WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Error en prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);

// ===============================
// EJECUTAR
// ===============================
if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "No se encontró el trabajo o ya fue eliminado"]);
    }

} else {
    echo json_encode(["error" => "Error al eliminar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
