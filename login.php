<?php
header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";

// Obtener datos del formulario
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

// Validación básica
if ($email === "" || $password === "") {
    echo json_encode([
        "status" => "error",
        "message" => "Campos vacíos"
    ]);
    exit;
}

// Buscar usuario
$sql = "SELECT id, nombre, email, password_hash, rol, foto FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error interno (prepare)"]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si existe usuario
if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuario no encontrado"
    ]);
    exit;
}

$user = $result->fetch_assoc();

// Verificar contraseña
if (!password_verify($password, $user["password_hash"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Contraseña incorrecta"
    ]);
    exit;
}

// Login correcto
echo json_encode([
    "status" => "success",
    "user" => [
        "id"     => $user["id"],
        "nombre" => $user["nombre"],
        "email"  => $user["email"],
        "rol"    => $user["rol"],
        "foto"   => $user["foto"] ?? ""
    ]
]);

$stmt->close();
$conn->close();
?>
