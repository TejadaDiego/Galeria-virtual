<?php
session_start();
require_once __DIR__ . "/conexion.php";

$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";

$sql = $conn->prepare("SELECT id, password, nombre FROM usuarios WHERE email=?");
$sql->bind_param("s", $email);
$sql->execute();
$sql->store_result();

if ($sql->num_rows === 0) {
    echo "Correo no registrado";
    exit;
}

$sql->bind_result($id, $hash, $nombre);
$sql->fetch();

if (password_verify($password, $hash)) {
    $_SESSION['user_id'] = $id;
    $_SESSION['nombre'] = $nombre;
    echo "ok";
} else {
    echo "Contraseña incorrecta";
}
?>
