<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexion.php";

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$tipo = trim($_POST["tipo"] ?? "");

if ($email === "" || $password === "" || $tipo === "") {
    echo json_encode([
        "success" => false,
        "error" => "Faltan datos requeridos (email, contraseña o tipo)."
    ]);
    exit;
}

$sql = "SELECT id, nombre, email, password_hash, tipo, foto 
        FROM usuarios 
        WHERE email = ? AND tipo = ?
        LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $tipo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "error" => "Usuario no encontrado o el tipo de acceso no coincide."
    ]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password_hash"])) {
    echo json_encode([
        "success" => false,
        "error" => "Contraseña incorrecta."
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "usuario" => [
        "id"     => $user["id"],
        "nombre" => $user["nombre"],
        "email"  => $user["email"],
        "tipo"   => $user["tipo"],
        "foto"   => $user["foto"] ?? ""
    ]
]);
