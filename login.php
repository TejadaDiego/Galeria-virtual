<?php
header("Content-Type: application/json");

// Seguridad para evitar errores de CORS con fetch
header("Access-Control-Allow-Origin: *");

require_once "conexion.php";

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if ($email == "" || $password == "") {
    echo json_encode(["status" => "error", "message" => "Campos vacíos"]);
    exit;
}

$sql = "SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password"])) {
    echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
    exit;
}

echo json_encode([
    "status" => "success",
    "user" => [
        "id" => $user["id"],
        "nombre" => $user["nombre"],
        "email" => $user["email"],
        "rol" => $user["rol"]
    ]
]);

$stmt->close();
$conexion->close();
?>
