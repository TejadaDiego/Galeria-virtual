<?php
// Php/register.php
require_once __DIR__ . "/conexion.php";

$name = trim($_POST['nombre'] ?? '');
$email = trim($_POST['email'] ?? '');
$pass  = $_POST['password'] ?? '';
$tipo  = $_POST['tipo'] ?? 'Comprador/Vendedor';

if ($name === '' || $email === '' || $pass === '') {
    http_response_code(400);
    echo "Rellena todos los campos";
    exit;
}

// verificar email único
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

$hash = password_hash($pass, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password, tipo) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo "Error en prepare: " . $conn->error;
    exit;
}
$stmt->bind_param("ssss", $name, $email, $hash, $tipo);
if ($stmt->execute()) {
    echo "ok";
} else {
    http_response_code(500);
    echo "Error al registrar: " . $stmt->error;
}
$stmt->close();
$conn->close();
?>
