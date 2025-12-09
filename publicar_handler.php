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
$titulo      = trim($_POST["titulo"] ?? "");
$descripcion = trim($_POST["descripcion"] ?? "");
$precio      = $_POST["precio"] ?? "";
$usuario_id  = $_POST["usuario_id"] ?? "";
$imagen      = $_FILES["imagen"] ?? null;

// Validar campos obligatorios
if ($titulo === "" || $descripcion === "" || $precio === "" || $usuario_id === "" || !$imagen) {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
    exit;
}

// Validar precio numérico
if (!is_numeric($precio)) {
    echo json_encode(["success" => false, "error" => "El precio no es válido"]);
    exit;
}

// ==========================
// SUBIR IMAGEN
// ==========================
$nombreImg = time() . "_" . basename($imagen["name"]);
$rutaDestino = "uploads/" . $nombreImg;

// Crear carpeta si no existe
if (!file_exists("uploads")) {
    mkdir("uploads", 0777, true);
}

if (!move_uploaded_file($imagen["tmp_name"], $rutaDestino)) {
    echo json_encode(["success" => false, "error" => "No se pudo subir la imagen"]);
    exit;
}

// ==========================
// GUARDAR EN BD
// ==========================
$sql = "INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Error en prepare: " . $conn->error]);
    exit;
}

// tipos: s = string, s = string, d = double, s = string, i = integer
$stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $nombreImg, $usuario_id);

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
