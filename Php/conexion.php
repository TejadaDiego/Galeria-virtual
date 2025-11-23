<?php
$host = "localhost";
$usuario = "root";
$password = "dieguito.2006";
$bd = "galeria_virtual"; // Cambia a tu BD real
$port = 3007;

$conn = new mysqli($host, $usuario, $password, $bd);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>
