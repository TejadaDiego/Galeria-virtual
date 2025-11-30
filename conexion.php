<?php
// Php/conexion.php
// Ajusta según tu XAMPP (host, user, pass, db, port)
$host = "127.0.0.1";
$user = "root";
$pass = "";               // si tu root no tiene contraseña deja vacío, si tiene ponla
$db   = "galeria_virtual";
$port = 3307;             // TU PUERTO MYSQL (por lo que comentaste usas 3307)

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    // Mensaje útil (en desarrollo) — en producción loguear en archivo en vez de mostrar
    die("Conexión fallida: (" . $conn->connect_errno . ") " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
