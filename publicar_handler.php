<?php
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// ================================
// 1. VALIDAR usuario_id
// ================================
if (!isset($_POST['usuario_id'])) {
    echo json_encode(["error" => "Debes iniciar sesión"]);
    exit;
}

$usuario_id = intval($_POST['usuario_id']);

// ================================
// 2. CAMPOS
// ================================
$titulo = trim($_POST["titulo"] ?? "");
$descripcion = trim($_POST["descripcion"] ?? "");
$precio = floatval($_POST["precio"] ?? 0);

if ($titulo === "" || $descripcion === "" || $precio <= 0) {
    echo json_encode(["error" => "Campos incompletos o inválidos"]);
    exit;
}

// ================================
// 3. MANEJO DE IMAGEN
// ================================
$nombreArchivoBD = null;

$carpeta = __DIR__ . "/uploads/trabajos/";
if (!is_dir($carpeta)) mkdir($carpeta, 0777, true);

if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] === UPLOAD_ERR_OK) {

    $ext = strtolower(pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION));
    $nombreFinal = "trabajo_" . time() . "." . $ext;

    $rutaDestino = $carpeta . $nombreFinal;

    if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaDestino)) {
        echo json_encode(["error" => "No se pudo guardar la imagen"]);
        exit;
    }

    $nombreArchivoBD = "uploads/trabajos/" . $nombreFinal;
}

// ================================
// 4. SQL CORRECTO
// ================================
$sql = "INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Error en prepare: " . $conn->error]);
    exit;
}

// ================================
// 5. BIND CORRECTO
// ================================
$stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $nombreArchivoBD, $usuario_id);

// ================================
// 6. EJECUTAR
// ================================
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Error al insertar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
