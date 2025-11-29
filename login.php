<?php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json");

$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";

// Validaciones básicas
if ($email === "" || $password === "") {
    echo json_encode(["error" => "Completa todos los campos"]);
    exit;
}

// Buscar usuario
$sql = $conn->prepare("SELECT id, password_hash, nombre, email, tipo, foto FROM usuarios WHERE email=?");
$sql->bind_param("s", $email);
$sql->execute();
$sql->store_result();

if ($sql->num_rows === 0) {
    echo json_encode(["error" => "Correo no registrado"]);
    exit;
}

$sql->bind_result($id, $hash, $nombre, $correoBD, $tipo, $foto);
$sql->fetch();

// Verificar contraseña
if (!password_verify($password, $hash)) {
    echo json_encode(["error" => "Contraseña incorrecta"]);
    exit;
}

// Guardar en sesión
$_SESSION['user_id'] = $id;
$_SESSION['nombre']  = $nombre;

// Respuesta JSON CORRECTA
echo json_encode([
    "success" => true,
    "id"      => $id,
    "nombre"  => $nombre,
    "email"   => $correoBD,
    "tipo"    => $tipo,
    "foto"    => $foto
]);
?>
