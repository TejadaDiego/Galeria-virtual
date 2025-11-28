<?php
$servername = "127.0.0.1";  // SIEMPRE usa 127.0.0.1 cuando trabajes con puertos personalizados
$dbusername = "root";
$dbpassword = "";  // SIN contraseña
$dbname = "galeria_virtual";
$dbport = 3307; // <-- IMPORTANTE

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname, $dbport);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
