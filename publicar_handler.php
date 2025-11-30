<?php
// Php/publicar_handler.php
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/conexion.php";

// ⚠ Recibir ID del usuario desde el FORM
$usuario_id = intval($_POST['usuario_id'] ?? 0);

if ($usuario_id <= 0) {
    http_response_code(401);
    echo json_encode(["error" => "Debes iniciar sesión para publicar."]);
    exit;
}

$titulo = trim($_POST['titulo'] ?? '');
$descripcion = trim($_POST['descripcion'] ?? '');
$precio = floatval($_POST['precio'] ?? 0);

if ($titulo === '' || $precio <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Campos incompletos o precio inválido"]);
    exit;
}

// === SUBIR IMAGEN ===
$nombreArchivo = null;

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
    $carpeta = __DIR__ . "/../uploads/";

    if (!is_dir($carpeta)) {
        mkdir($carpeta, 0777, true);
    }

    $nombreArchivo = time() . "_" . basename($_FILES['imagen']['name']);
    $rutaDestino = $carpeta . $nombreArchivo;

    if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaDestino)) {
        http_response_code(500);
        echo json_encode(["error" => "Error al mover la imagen"]);
        exit;
    }

    // Ruta que se guardará en la BD (accesible desde el navegador)
    $nombreArchivo = "uploads/" . $nombreArchivo;
}

// === INSERTAR EN BD ===
$sql = "INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "error" => "prepare() falló",
        "detalle" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $nombreArchivo, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode([
        "error" => "Error al insertar",
        "detalle" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
