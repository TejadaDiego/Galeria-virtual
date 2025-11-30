<?php
require_once __DIR__ . "/conexion.php";

$nombre = trim($_POST['nombre'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$tipo = $_POST['tipo'] ?? 'Comprador/Vendedor';

if ($nombre === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo "Rellena todos los campos";
    exit;
}

// Verificar email único
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

// HASH CORRECTO → password_hash se guarda en password_hash
$hash = password_hash($password, PASSWORD_DEFAULT);

// ESTA ES LA CONSULTA CORRECTA:
$sql = "INSERT INTO usuarios (nombre, email, password_hash, tipo) VALUES (?, ?, ?, ?)";  
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo "Error en prepare: " . $conn->error;
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
?>
