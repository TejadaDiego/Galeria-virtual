<?php
// Php/login.php
session_start();
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/conexion.php";

$email    = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

// Validación básica
if ($email === "" || $password === "") {
    echo json_encode([
        "ok" => false,
        "msg" => "Por favor, completa todos los campos."
    ]);
    exit;
}

// Buscar usuario
$stmt = $conn->prepare("SELECT id, nombre, email, password_hash, foto FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Validar credenciales
if (!$user || !password_verify($password, $user["password_hash"])) {
    echo json_encode([
        "ok" => false,
        "msg" => "Correo o contraseña incorrectos."
    ]);
    exit;
}

// Guardar sesión
$_SESSION["user_id"] = $user["id"];
$_SESSION["nombre"]  = $user["nombre"];
$_SESSION["email"]   = $user["email"];
$_SESSION["foto"]    = $user["foto"];

// Responder al login-handler.js
echo json_encode([
    "ok"     => true,
    "nombre" => $user["nombre"],
    "email"  => $user["email"],
    "foto"   => $user["foto"] ?? ""
]);

