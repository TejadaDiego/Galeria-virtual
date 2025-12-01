<?php
// Php/logout.php

session_start();

// Eliminar todas las variables de sesión
$_SESSION = [];

// Cerrar sesión por completo
session_unset();
session_destroy();

// Respuesta correcta
http_response_code(200);
echo "ok";
?>
