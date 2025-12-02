<?php
// Php/register.php
require_once __DIR__ . "/conexion.php";

$nombre = trim($_POST['nombre'] ?? '');
$email  = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$tipo = $_POST['tipo'] ?? 'Comprador/Vendedor';

if ($nombre === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo "Rellena todos los campos";
    exit;
}

// Chequear si email existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    http_response_code(400);
    echo "Email ya registrado";
    exit;
}
$stmt->close();

// Hash de la contraseña
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertar
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password_hash, tipo) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo "Error en prepare(): " . $conn->error;
    exit;
}
$stmt->bind_param("ssss", $nombre, $email, $hash, $tipo);

if ($stmt->execute()) {
    echo "ok";
} else {
    http_response_code(500);
    echo "Error al registrar: " . $stmt->error;
}
$stmt->close();
$conn->close();
