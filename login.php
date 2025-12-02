<?php
// Php/login.php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json");

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["error" => "Completa email y contraseña"]);
    exit;
}

$stmt = $conn->prepare("SELECT id, password_hash, nombre, foto, tipo, email FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    http_response_code(401);
    echo json_encode(["error" => "Correo no registrado"]);
    exit;
}

$stmt->bind_result($id, $hash, $nombre, $foto, $tipo, $email_db);
$stmt->fetch();

if (!password_verify($password, $hash)) {
    http_response_code(401);
    echo json_encode(["error" => "Contraseña incorrecta"]);
    exit;
}

// Crear sesión
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;
$_SESSION['foto'] = $foto;
$_SESSION['tipo'] = $tipo;

// Responder con datos (para que JS lo guarde en localStorage)
echo json_encode([
    "success" => true,
    "usuario" => [
        "id" => $id,
        "nombre" => $nombre,
        "email" => $email_db,
        "foto" => $foto,
        "tipo" => $tipo
    ]
]);

$stmt->close();
$conn->close();
