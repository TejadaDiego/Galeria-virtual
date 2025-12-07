<?php
// conexion.php
// Ajusta tu configuración
$servername = "127.0.0.1";
$username   = "root";
$password   = "dieguito.2006";
$dbname     = "galeria_virtual";
$port       = 3307;

// Ocultar warnings que rompan JSON
error_reporting(E_ERROR | E_PARSE);

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {

    // --- MUY IMPORTANTE ---
    // Enviar error en formato JSON
    header("Content-Type: application/json; charset=utf-8");
    http_response_code(500);

    echo json_encode([
        "error" => "Error de conexión a la base de datos",
        "detalle" => $conn->connect_error
    ]);

    exit;
}

$conn->set_charset("utf8mb4");
