<?php
$host = "127.0.0.1";
$user = "root";
$pass = "dieguito.2006";
$db   = "galeria_virtual"; // o la BD que estés usando
$port = 3307;

$conexion = new mysqli("localhost", "root", "dieguito.2006", "galeria_virtual", 3307);


if($conn->connect_error){
    die("Error de conexión: " . $conn->connect_error);
}
?>
