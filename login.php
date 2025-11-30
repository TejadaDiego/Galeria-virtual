<?php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    echo json_encode(["success" => false, "error" => "Completa todos los campos"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, password_hash, nombre, email, foto, tipo FROM usuarios WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["success" => false, "error" => "Correo no registrado"]);
    exit;
}

$stmt->bind_result($id, $hash, $nombre, $emailBD, $foto, $tipo);
$stmt->fetch();

if (!password_verify($password, $hash)) {
    echo json_encode(["success" => false, "error" => "Contraseña incorrecta"]);
    exit;
}

// Guardar sesión PHP
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;

// Devolver datos al frontend
echo json_encode([
    "success" => true,
    "usuario" => [
        "id" => $id,
        "nombre" => $nombre,
        "email" => $emailBD,  // 🔥 CORREGIDO
        "foto" => $foto,
        "tipo" => $tipo
    ]
]);

?>
