<?php
// Php/login.php
session_start();
require_once __DIR__ . "/conexion.php";

$email = trim($_POST['email'] ?? '');
$pass  = $_POST['password'] ?? '';

if ($email === '' || $pass === '') {
    http_response_code(400);
    echo "Completa todos los campos";
    exit;
}

$stmt = $conn->prepare("SELECT id, password_hash, nombre, email, tipo, foto FROM usuarios WHERE email = ?");
if (!$stmt) {
    http_response_code(500);
    echo "Error en prepare: " . $conn->error;
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

$stmt->bind_result($id, $password_hash, $nombre, $email_db, $tipo, $foto);
$stmt->fetch();

// adapta si tu campo contraseña se llama 'password' o 'password_hash' en la tabla
if (!password_verify($pass, $password_hash)) {
    http_response_code(401);
    echo "Contraseña incorrecta";
    exit;
}

// login OK -> guardar sesión
$_SESSION['user_id'] = $id;
$_SESSION['user_nombre'] = $nombre;

// devolver JSON con datos mínimos para la UI
$user = [
    "id" => $id,
    "nombre" => $nombre,
    "email" => $email_db,
    "tipo" => $tipo,
    "foto" => $foto ?? ""
];

header('Content-Type: application/json; charset=utf-8');
echo json_encode($user);

$stmt->close();
$conn->close();
?>
