<?php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json");

// Recibir datos
$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";

// Consulta CORRECTA (usa password_hash, no "password")
$sql = $conn->prepare("SELECT id, nombre, email, password_hash, foto FROM usuarios WHERE email=?");
$sql->bind_param("s", $email);
$sql->execute();
$result = $sql->get_result();

// Si no existe el correo
if ($result->num_rows === 0) {
    echo json_encode(["error" => "Correo no registrado"]);
    exit;
}

$user = $result->fetch_assoc();

// Validación de contraseña
if (!password_verify($password, $user["password_hash"])) {
    echo json_encode(["error" => "Contraseña incorrecta"]);
    exit;
}

// Guardar sesión
$_SESSION['user_id'] = $user["id"];
$_SESSION['nombre'] = $user["nombre"];

// Respuesta JSON para el login-handler
echo json_encode([
    "success" => true,
    "id" => $user["id"],
    "nombre" => $user["nombre"],
    "email" => $user["email"],
    "foto" => $user["foto"]
]);

$conn->close();
?>
