<?php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// Obtener datos
$nombre   = trim($_POST['nombre'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$tipo     = trim($_POST['tipo'] ?? 'Comprador/Vendedor');

// Validar campos
if ($nombre === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["error" => "Rellena todos los campos"]);
    exit;
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Email inválido"]);
    exit;
}

// ¿Email existe?
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(400);
    echo json_encode(["error" => "Email ya registrado"]);
    exit;
}

$stmt->close();

// Hash
$hash = password_hash($password, PASSWORD_DEFAULT);

// Insertar
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password_hash, tipo, foto)
                        VALUES (?, ?, ?, ?, 'Img/default.png')");
$stmt->bind_param("ssss", $nombre, $email, $hash, $tipo);

if ($stmt->execute()) {

    $id = $stmt->insert_id;

    // Crear sesión automática
    $_SESSION['user_id'] = $id;
    $_SESSION['nombre']  = $nombre;
    $_SESSION['foto']    = "Img/default.png";
    $_SESSION['tipo']    = $tipo;

    echo json_encode([
        "success" => true,
        "usuario" => [
            "id"     => $id,
            "nombre" => $nombre,
            "email"  => $email,
            "foto"   => "Img/default.png",
            "tipo"   => $tipo
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
