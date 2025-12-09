<?php
// Php/logout.php
session_start();

// Limpiar variables de sesión
$_SESSION = [];

// Destruir la sesión completamente
session_unset();
session_destroy();

// Devolver respuesta JSON correcta
header("Content-Type: application/json; charset=utf-8");

echo json_encode([
    "success" => true,
    "message" => "Sesión cerrada correctamente"
]);

exit;
?>
