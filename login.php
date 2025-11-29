<?php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json");

$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";

$sql = $conn->prepare("SELECT id, password_hash, nombre, foto, tipo FROM usuarios WHERE email=?");
$sql->bind_param("s", $email);
$sql->execute();
$sql->store_result();

if ($sql->num_rows === 0) {
    echo json_encode(["error" => "Correo no registrado"]);
    exit;
}

$sql->bind_result($id, $hash, $nombre, $foto, $tipo);
$sql->fetch();

if (!password_verify($password, $hash)) {
    echo json_encode(["error" => "Contraseña incorrecta"]);
    exit;
}

// Guardar sesión PHP
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;

// Enviar usuario a JavaScript
echo json_encode([
    "success" => true,
    "usuario" => [
        "id" => $id,
        "nombre" => $nombre,
        "foto" => $foto,
        "tipo" => $tipo
    ]
]);
?>
