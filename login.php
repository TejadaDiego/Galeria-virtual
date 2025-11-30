<?php
session_start();
require_once __DIR__ . "/conexion.php";

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    echo "Completa todos los campos";
    exit;
}

$stmt = $conn->prepare("SELECT id, password_hash, nombre, foto, tipo FROM usuarios WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo "Correo no registrado";
    exit;
}

$stmt->bind_result($id, $hash, $nombre, $foto, $tipo);
$stmt->fetch();

if (!password_verify($password, $hash)) {
    echo "Contraseña incorrecta";
    exit;
}

// Guardar sesión
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;

echo json_encode([
    "id" => $id,
    "nombre" => $nombre,
    "foto" => $foto,
    "tipo" => $tipo
]);
?>
