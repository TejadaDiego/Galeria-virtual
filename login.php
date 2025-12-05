<?php
// Php/login.php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// ================================
// VALIDACIÓN INICIAL
// ================================
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["error" => "Completa email y contraseña"]);
    exit;
}

// ================================
// CONSULTA A BASE DE DATOS
// ================================
$stmt = $conn->prepare("
    SELECT id, password_hash, nombre, foto, tipo, email 
    FROM usuarios 
    WHERE email = ?
");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Error interno: " . $conn->error]);
    exit;
}

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

// ================================
// VERIFICAR PASSWORD
// ================================
if (!password_verify($password, $hash)) {
    http_response_code(401);
    echo json_encode(["error" => "Contraseña incorrecta"]);
    exit;
}

// Si el usuario no tiene foto asignada
if (!$foto || $foto === "") {
    $foto = "Img/default.png";
}

// ================================
// CREAR SESIÓN
// ================================
$_SESSION['user_id'] = $id;
$_SESSION['nombre'] = $nombre;
$_SESSION['foto'] = $foto;
$_SESSION['tipo'] = $tipo;

// ================================
// RESPUESTA PARA EL FRONTEND
// ================================
echo json_encode([
    "success" => true,
    "usuario" => [
        "id" => $id,
        "nombre" => $nombre,
        "email" => $email_db,
        "foto" => $foto,
        "tipo" => $tipo
    ]
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$stmt->close();
$conn->close();
