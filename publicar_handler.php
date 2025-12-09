<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexion.php";

// Solo aceptar POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "error" => "Método no permitido"]);
    exit;
}

// ==========================
// LEER CAMPOS
// ==========================
$titulo      = $_POST["titulo"] ?? "";
$descripcion = $_POST["descripcion"] ?? "";
$precio      = $_POST["precio"] ?? "";
$usuario_id  = $_POST["usuario_id"] ?? "";   // <-- VIENE DESDE JS
$imagen      = $_FILES["imagen"] ?? null;

// Validación básica
if (!$titulo || !$descripcion || !$precio || !$usuario_id || !$imagen) {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
    exit;
}

// ==========================
// SUBIR IMAGEN
// ==========================
$nombreImg = time() . "_" . basename($imagen["name"]);
$rutaDestino = "uploads/" . $nombreImg;

if (!move_uploaded_file($imagen["tmp_name"], $rutaDestino)) {
    echo json_encode(["success" => false, "error" => "No se pudo subir la imagen"]);
    exit;
}

// ==========================
// GUARDAR EN LA BD
// ==========================
$sql = "INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssdss", $titulo, $descripcion, $precio, $nombreImg, $usuario_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Trabajo publicado correctamente 🎉"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error"   => "Error al guardar en BD: " . $conn->error
    ]);
}

$stmt->close();
$conn->close();
?>
