<?php
// Php/logout.php
session_start();

// Vaciar variables de sesión
$_SESSION = [];

// Destruir sesión
session_unset();
session_destroy();

// Respuesta JSON correcta
header("Content-Type: application/json; charset=utf-8");
http_response_code(200);

echo json_encode([
    "success" => true,
    "message" => "Sesión cerrada correctamente"
]);
