<?php
// conexion.php

$servername = "localhost";   // <-- más seguro en Windows/XAMPP
$username = "root";
$password = "dieguito.2006";
$dbname   = "galeria_virtual";
$port     = 3307; // si tu XAMPP usa 3307; si no, pon 3306

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    http_response_code(500);
    echo "Conexión fallida: " . $conn->connect_error;
    exit;
}

$conn->set_charset("utf8mb4");
