<?php
// conexion.php

$servername = "localhost";   
$username = "root";
$password = "dieguito.2006";
$dbname   = "galeria_virtual";
$port     = 3307; // usa 3306 si tu MySQL está ahí

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit;
}

$conn->set_charset("utf8mb4");
