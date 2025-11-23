<?php
// Php/conexion.php
$servername = "localhost";
$dbusername = "root";    // ajusta según tu entorno
$dbpassword = "dieguito.2006";        // ajusta según tu entorno
$dbname = "catalogo_virtual";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?>
