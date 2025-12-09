<?php
require_once __DIR__ . "/conexion.php";
header("Content-Type: application/json; charset=utf-8");

// 1. Validar ID recibido
$id = intval($_POST["id"] ?? 0);

if ($id <= 0) {
    echo json_encode(["error" => "ID inválido"]);
    exit;
}

// 2. Obtener información del trabajo para eliminar también la imagen
$sql = "SELECT imagen FROM trabajos WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Error en prepare SELECT: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "El trabajo no existe"]);
    exit;
}

$trabajo = $result->fetch_assoc();

$stmt->close();

// 3. Eliminar registro de la tabla
$sqlDelete = "DELETE FROM trabajos WHERE id = ?";
$stmt2 = $conn->prepare($sqlDelete);

if (!$stmt2) {
    echo json_encode(["error" => "Error en prepare DELETE: " . $conn->error]);
    exit;
}

$stmt2->bind_param("i", $id);

if ($stmt2->execute()) {

    // 4. Eliminar imagen física si existe
    if (!empty($trabajo["imagen"])) {
        $rutaImagen = __DIR__ . "/../" . $trabajo["imagen"]; // uploads/trabajos/xxx

        if (file_exists($rutaImagen)) {
            @unlink($rutaImagen);
        }
    }

    echo json_encode(["success" => true]);

} else {
    echo json_encode(["error" => "Error al eliminar: " . $stmt2->error]);
}

$stmt2->close();
$conn->close();
?>
