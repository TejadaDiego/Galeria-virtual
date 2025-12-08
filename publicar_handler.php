<?php
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// ================================
// VALIDAR usuario_id
// ================================
if (!isset($_POST['usuario_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Debes iniciar sesión"]);
    exit;
}

$usuario_id = intval($_POST['usuario_id']);

// ================================
// CAMPOS
// ================================
$titulo = trim($_POST["titulo"] ?? "");
$descripcion = trim($_POST["descripcion"] ?? "");
$precio = floatval($_POST["precio"] ?? 0);

if ($titulo === "" || $descripcion === "" || $precio <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Campos incompletos o inválidos"]);
    exit;
}

// ================================
// MANEJO DE IMAGEN
// ================================
$nombreArchivoBD = null;

// RUTA CORRECTA SEGÚN TU ESTRUCTURA
$carpeta = __DIR__ . "/uploads/trabajos/";

if (!is_dir($carpeta)) {
    mkdir($carpeta, 0777, true);
}

if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] === UPLOAD_ERR_OK) {

    $ext = strtolower(pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION));
    $nombreFinal = "trabajo_" . time() . "." . $ext;

    $rutaDestino = $carpeta . $nombreFinal;

    if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaDestino)) {
        http_response_code(500);
        echo json_encode(["error" => "Error al guardar la imagen"]);
        exit;
    }

    // ruta accesible para el front
    $nombreArchivoBD = "uploads/trabajos/" . $nombreFinal;
}

// ================================
// INSERTAR EN BASE DE DATOS
// ================================
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
?>
