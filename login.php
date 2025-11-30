<?php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// Obtener datos
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    echo json_encode([
        "success" => false,
        "error" => "Completa todos los campos."
    ]);
    exit;
}

// Buscar usuario
$stmt = $conn->prepare("SELECT id, nombre, email, password_hash, foto, tipo FROM usuarios WHERE email=? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "error" => "Correo no registrado."
    ]);
    exit;
}

$stmt->bind_result($id, $nombre, $emailBD, $hash, $foto, $tipo);
$stmt->fetch();

// Verificar contraseña
if (!password_verify($password, $hash)) {
    echo json_encode([
        "success" => false,
        "error" => "Contraseña incorrecta."
    ]);
    exit;
}

// Guardar sesión PHP
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;
$_SESSION['email']  = $emailBD;
$_SESSION['tipo']   = $tipo;

// RESPUESTA EXITOSA
echo json_encode([
    "success" => true,
    "usuario" => [
        "id"     => $id,
        "nombre" => $nombre,
        "email"  => $emailBD,
        "foto"   => $foto,
        "tipo"   => $tipo
    ]
]);
?>
