<?php
// Php/conexion.php
// Ajusta estos valores si tu XAMPP usa otro usuario/clave/puerto
$servername = "127.0.0.1";
$username = "root";
$password = "dieguito.2006"; // o "dieguito.2006" si lo usas; asegúrate de que coincide con MySQL
$dbname   = "galeria_virtual";
$port     = 3307; // si usas 3307 en XAMPP, si usas 3306 pon 3306

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    // Respuesta clara para debugging durante desarrollo
    http_response_code(500);
    echo "Conexión fallida: " . $conn->connect_error;
    exit;
}
$conn->set_charset("utf8mb4");
