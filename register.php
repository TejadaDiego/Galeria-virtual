<?php
header("Content-Type: application/json");

require_once "conexion.php";

$nombre   = $_POST['nombre'] ?? '';
$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$tipo     = $_POST['tipo'] ?? 'Comprador/Vendedor'; // valor por defecto

// Validación
if ($nombre === "" || $email === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios"]);
    exit;
}

// Hashear contraseña
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Insertar usuario
$sql = "INSERT INTO usuarios (nombre, email, password_hash, tipo) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nombre, $email, $passwordHash, $tipo);

if ($stmt->execute()) {

    // Obtener ID recién insertado
    $id = $stmt->insert_id;

    // Construir objeto usuario para enviar al frontend
    $usuario = [
        "id"     => $id,
        "nombre" => $nombre,
        "email"  => $email,
        "tipo"   => $tipo,
        "foto"   => ""
    ];

    echo json_encode([
        "status"  => "success",
        "message" => "Usuario registrado correctamente",
        "usuario" => $usuario
    ]);

} else {
    echo json_encode([
        "status" => "error",
        "message" => "Error al registrar usuario"
    ]);
}

$stmt->close();
$conn->close();
?>
