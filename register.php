<?php
require_once __DIR__ . "/conexion.php";

header("Content-Type: text/plain; charset=UTF-8");

// -----------------------------
// 1. Recibir datos
// -----------------------------
$nombre   = trim($_POST['nombre'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$tipo     = $_POST['tipo'] ?? 'Comprador/Vendedor';

// -----------------------------
// 2. Validación básica
// -----------------------------
if ($nombre === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo "Rellena todos los campos";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Correo inválido";
    exit;
}

// -----------------------------
// 3. Verificar si el email existe
// -----------------------------
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

// -----------------------------
// 4. Encriptar contraseña
// -----------------------------
$hash = password_hash($password, PASSWORD_DEFAULT);

// -----------------------------
// 5. Registrar usuario nuevo
// -----------------------------
$sql = "
    INSERT INTO usuarios (nombre, email, password_hash, tipo, foto)
    VALUES (?, ?, ?, ?, ?)
";

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

if ($stmt->execute()) {
    echo "ok"; // <-- EL LOGIN LO ESPERA ASÍ
} else {
    http_response_code(500);
    echo "Error al registrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
