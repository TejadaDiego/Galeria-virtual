<?php
require_once "../conexion.php";

header("Content-Type: application/json; charset=UTF-8");

$titulo = trim($_POST["titulo"] ?? "");
$descripcion = trim($_POST["descripcion"] ?? "");
$precio = floatval($_POST["precio"] ?? 0);
$usuario = $_POST["usuario"] ?? null;

// Validación
if ($titulo === "" || $descripcion === "" || $precio <= 0 || !$usuario) {
    echo json_encode([
        "success" => false,
        "error" => "Faltan datos obligatorios"
    ]);
    exit;
}

$publicado_por = $usuario["id"]; // viene desde JS

// ========= SUBIR IMAGEN ==========
$nombreArchivo = "";

if (!empty($_FILES["imagen"]["name"])) {
    $ext = pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION);
    $nombreArchivo = uniqid("img_") . "." . $ext;

    $ruta = "../uploads/" . $nombreArchivo;

    move_uploaded_file($_FILES["imagen"]["tmp_name"], $ruta);
}

// GUARDAR BD
$sql = "INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $nombreArchivo, $publicado_por);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Trabajo publicado con éxito"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Error al guardar en BD: " . $conn->error
    ]);
}

$stmt->close();
$conn->close();
