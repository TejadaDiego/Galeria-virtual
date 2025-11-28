<?php
require_once __DIR__ . "/conexion.php";

$nombre = $_POST["nombre"] ?? "";
$email = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";
$tipo = $_POST["tipo"] ?? "comprador";

if (!$nombre || !$email || !$password) {
    echo "Faltan datos";
    exit;
}

// verificar si existe el usuario
$sql = $conn->prepare("SELECT id FROM usuarios WHERE email=?");
$sql->bind_param("s", $email);
$sql->execute();
$sql->store_result();

if ($sql->num_rows > 0) {
    echo "El correo ya está registrado";
    exit;
}

// insertar
$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password, tipo) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $email, $hash, $tipo);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "Error: " . $conn->error;
}
?>
