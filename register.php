<?php
require_once __DIR__ . "/conexion.php";

// Leer datos enviados
$nombre   = trim($_POST['nombre'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$tipo     = $_POST['tipo'] ?? 'Comprador/Vendedor';

// Validación de campos vacíos
if ($nombre === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo "Rellena todos los campos";
    exit;
}

// Validar email correcto
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Correo inválido";
    exit;
}

// Verificar si el email ya existe
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

// Encriptar contraseña correctamente
$hash = password_hash($password, PASSWORD_DEFAULT);

// ============================
// Registrar usuario
// ============================
$sql = "INSERT INTO usuarios (nombre, email, password, tipo, foto) 
        VALUES (?, ?, ?, ?, ?)";

// Foto por defecto
$fotoDefault = "img/default.png";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo "Error en prepare: " . $conn->error;
    exit;
}

$stmt->bind_param("sssss", 
    $nombre, 
    $email, 
    $hash, 
    $tipo, 
    $fotoDefault
);

// Intentar registrar
if ($stmt->execute()) {
    echo "ok";
} else {
    http_response_code(500);
    echo "Error al registrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
