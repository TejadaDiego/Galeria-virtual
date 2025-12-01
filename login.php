<?php
// Php/login.php
session_start();
require_once __DIR__ . "/conexion.php";

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo "Completa ambos campos.";
    exit;
}

$stmt = $conn->prepare("SELECT id, password_hash, nombre, email, foto FROM usuarios WHERE email = ?");
if (!$stmt) {
    http_response_code(500);
    echo "Error en prepare(): " . $conn->error;
    exit;
}
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    http_response_code(401);
    echo "Correo no registrado";
    exit;
}

$stmt->bind_result($id, $hash, $nombre, $email_db, $foto);
$stmt->fetch();

if (!password_verify($password, $hash)) {
    http_response_code(401);
    echo "Contraseña incorrecta";
    exit;
}

// Login OK: guardar sesión
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;
$_SESSION['email'] = $email_db;
$_SESSION['foto'] = $foto;

// Devolver JSON con datos públicos (para localStorage)
header('Content-Type: application/json');
echo json_encode([
    'id' => $id,
    'nombre' => $nombre,
    'email' => $email_db,
    'foto' => $foto
]);
exit;
?>
