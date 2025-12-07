<?php
// Php/login.php
session_start();
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/conexion.php";

// Recibir datos del fetch()
$email    = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

// Validación básica
if ($email === "" || $password === "") {
    echo json_encode([
        "ok" => false,
        "msg" => "Rellena todos los campos"
    ]);
    exit;
}

// Buscar usuario en la base de datos
$stmt = $conn->prepare("SELECT id, nombre, email, password_hash, foto FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Si no existe o la contraseña no coincide
if (!$user || !password_verify($password, $user["password_hash"])) {
    echo json_encode([
        "ok" => false,
        "msg" => "Correo o contraseña incorrectos"
    ]);
    exit;
}

// Guardar usuario en sesión (opcional, pero recomendado)
$_SESSION["user_id"] = $user["id"];
$_SESSION["nombre"]  = $user["nombre"];
$_SESSION["email"]   = $user["email"];
$_SESSION["foto"]    = $user["foto"];

// Respuesta correcta para login-handler.js
echo json_encode([
    "ok"     => true,
    "nombre" => $user["nombre"],
    "email"  => $user["email"],
    "foto"   => $user["foto"] ?? ""
]);
