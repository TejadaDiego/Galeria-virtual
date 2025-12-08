<?php
// Php/conexion.php

$servername = "127.0.0.1";
$username   = "root";
$password   = "dieguito.2006"; 
$dbname     = "galeria_virtual";
$port       = 3307;

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        "ok"  => false,
        "msg" => "Error al conectar con la base de datos: " . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");
