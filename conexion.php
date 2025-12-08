<?php

$servername = "127.0.0.1";
$username   = "root";
$password   = "dieguito.2006"; 
$dbname     = "galeria_virtual";
$port       = 9516; // EL PUERTO REAL DE TU MYSQL AHORA

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
