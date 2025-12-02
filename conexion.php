<?php
// Php/conexion.php
// CONFIGURACIÓN DE BASE DE DATOS (XAMPP)
$host = "127.0.0.1";
$user = "root";
$pass = "dieguito.2006";   // si no tienes contraseña, deja ""
$db   = "galeria_virtual";
$port = 3307;              // tu puerto MySQL personalizado

// Crear conexión segura
$conn = new mysqli($host, $user, $pass, $db, $port);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Error de conexión a MySQL: " . $conn->connect_error);
}

// Asegurar codificación correcta
$conn->set_charset("utf8mb4");
?>
