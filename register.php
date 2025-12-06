<?php
// Php/register.php
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// Obtener datos
$nombre   = trim($_POST['nombre'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$tipo     = trim($_POST['tipo'] ?? 'Comprador/Vendedor');

// Validar campos
if ($nombre === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["error" => "Rellena todos los campos"]);
    exit;
}

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Email inválido"]);
    exit;
}

// Comprobar si el email ya existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(400);
    echo json_encode(["error" => "Email ya registrado"]);
    $stmt->close();
    exit;
}

$stmt->close();

// Encriptar contraseña
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertar nuevo usuario
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password_hash, tipo) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Error en prepare(): " . $conn->error]);
    exit;
}

$stmt->bind_param("ssss", $nombre, $email, $hash, $tipo);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
