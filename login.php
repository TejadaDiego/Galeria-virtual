<?php
// Php/login.php
session_start();
require_once __DIR__ . "/conexion.php";

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["ok" => false, "msg" => "Rellena todos los campos"]);
    exit;
}

// Buscar usuario
$stmt = $conn->prepare("SELECT id, nombre, email, password_hash, foto FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["ok" => false, "msg" => "Credenciales incorrectas"]);
    exit;
}

// Guardamos en sesión
$_SESSION["user_id"] = $user["id"];
$_SESSION["nombre"] = $user["nombre"];
$_SESSION["email"]  = $user["email"];
$_SESSION["foto"]   = $user["foto"];

// RESPUESTA CORRECTA
echo json_encode([
    "ok" => true,
    "nombre" => $user["nombre"],
    "email" => $user["email"],
    "foto" => $user["foto"]
]);
