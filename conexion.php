<?php
$servername = "localhost";
$username   = "root";
$password   = "dieguito.2006"; // SE MANTIENE
$dbname     = "galeria_virtual";
$port       = 3307;

header("Content-Type: application/json; charset=utf-8");

$conn = @new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit;
}

$conn->set_charset("utf8mb4");
