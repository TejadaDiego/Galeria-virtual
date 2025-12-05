<?php
// Php/publicar_handler.php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// Validar sesión
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Debes iniciar sesión"]);
    exit;
}

$usuario_id = intval($_SESSION['user_id']);

// Obtener datos
$titulo = trim($_POST['titulo'] ?? '');
$descripcion = trim($_POST['descripcion'] ?? '');
$precio = floatval($_POST['precio'] ?? 0);

// Validaciones
if ($titulo === '' || $precio <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Campos incompletos o inválidos"]);
    exit;
}

// ---------- MANEJO DE LA IMAGEN ----------
$nombreArchivoBD = null;

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {

    // Carpeta donde guardar
    $carpeta = __DIR__ . "/uploads/";
    if (!is_dir($carpeta)) {
        mkdir($carpeta, 0777, true);
    }

    // Sanitizar nombre
    $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($_FILES["imagen"]["name"]));
    $nombreFinal = time() . "_" . $safeName;
    $rutaDestino = $carpeta . $nombreFinal;

    // Mover archivo
    if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaDestino)) {
        http_response_code(500);
        echo json_encode(["error" => "Error al guardar la imagen"]);
        exit;
    }

    // Ruta accesible desde el navegador
    $nombreArchivoBD = "uploads/" . $nombreFinal;
}

// ---------- INSERTAR EN BD ----------
$sql = "INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Error en prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $nombreArchivoBD, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al insertar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
