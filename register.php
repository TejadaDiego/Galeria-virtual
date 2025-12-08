<?php
header("Content-Type: application/json");
require_once "conexion.php";

$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$tipo = $_POST['tipo'] ?? 'Comprador/Vendedor';

// Validación
if ($nombre === "" || $email === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios"]);
    exit;
}

// Encriptar contraseña
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Insertar usuario
$sql = "INSERT INTO usuarios (nombre, email, password_hash, tipo) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error interno"]);
    exit;
}

$stmt->bind_param("ssss", $nombre, $email, $passwordHash, $tipo);

if ($stmt->execute()) {

    // Usuario recién creado
    $usuario = [
        "id"     => $stmt->insert_id,
        "nombre" => $nombre,
        "email"  => $email,
        "tipo"   => $tipo,
        "foto"   => ""
    ];

    echo json_encode([
        "status" => "success",
        "usuario" => $usuario
    ]);

} else {
    echo json_encode([
        "status" => "error",
        "message" => "El correo ya existe o ocurrió un error."
    ]);
}

$stmt->close();
$conn->close();
?>
