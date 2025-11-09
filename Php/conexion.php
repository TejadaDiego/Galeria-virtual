<?php
$servername = "localhost";
$username = "root";   // cambia si tu usuario es distinto
$password = "";       // agrega tu contraseña si tiene
$dbname = "catalogo_virtual";

$conn = new mysqli($localhost, $root, $password, $catalogo_virtual);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
