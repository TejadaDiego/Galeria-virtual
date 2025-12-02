<?php
// Php/logout.php

session_start();

// Eliminar variables de sesión
$_SESSION = [];

// Eliminar cookie de sesión (si existe)
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Destruir sesión
session_unset();
session_destroy();

// Respuesta para el fetch de logout
header("Content-Type: application/json");
echo json_encode(["success" => true]);
?>
