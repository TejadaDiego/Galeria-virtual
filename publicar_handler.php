<?php
session_start();
require_once __DIR__ . "/conexion.php";

// Evitar errores si no llega algo
$email = trim($_POST['email'] ?? "");
$password = trim($_POST['password'] ?? "");

// Validación rápida
if ($email === "" || $password === "") {
    echo "Completa todos los campos";
    exit;
}

// 1. Buscar usuario por email (USANDO password_hash CORRECTO)
$sql = $conn->prepare("SELECT id, password_hash, nombre, tipo, foto FROM usuarios WHERE email=?");
$sql->bind_param("s", $email);
$sql->execute();
$sql->store_result();

if ($sql->num_rows === 0) {
    echo "Correo no registrado";
    exit;
}

$sql->bind_result($id, $hash, $nombre, $tipo, $foto);
$sql->fetch();

// 2. Verificar contraseña (USANDO password_hash)
if (!password_verify($password, $hash)) {
    echo "Contraseña incorrecta";
    exit;
}

// 3. Guardar sesión correctamente
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;
$_SESSION['tipo'] = $tipo;
$_SESSION['foto'] = $foto;

// También enviar al frontend el usuario completo si lo necesitas
echo json_encode([
    "success" => true,
    "usuario" => [
        "id" => $id,
        "nombre" => $nombre,
        "tipo" => $tipo,
        "foto" => $foto
    ]
]);
?>
