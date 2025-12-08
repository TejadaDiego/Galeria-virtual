<?php
header("Content-Type: application/json");

require_once "conexion.php";

$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$rol = $_POST['rol'] ?? 'estudiante';

if ($nombre == "" || $email == "" || $password == "") {
    echo json_encode(["status" => "error", "message" => "Campos vacíos"]);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

$sql = "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssss", $nombre, $email, $passwordHash, $rol);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Usuario registrado correctamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al registrar"]);
}

$stmt->close();
$conexion->close();
?>
