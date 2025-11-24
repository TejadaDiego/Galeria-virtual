<?php
$host = "localhost";
$user = "root";
$pass = "dieguito.2006";
$db = "catalogo_virtual";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
