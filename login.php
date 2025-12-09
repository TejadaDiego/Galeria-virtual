<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexion.php";

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$tipo = $_POST["tipo"] ?? ""; // viene desde JS

if ($email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "error" => "Campos vacíos"
    ]);
    exit;
}

$sql = "SELECT id, nombre, email, password_hash, tipo, foto 
        FROM usuarios 
        WHERE email = ? AND tipo = ? LIMIT 1";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => "Error interno al preparar consulta"
    ]);
    exit;
}

$stmt->bind_param("ss", $email, $tipo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "error" => "Usuario no encontrado o tipo incorrecto"
    ]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password_hash"])) {
    echo json_encode([
        "success" => false,
        "error" => "Contraseña incorrecta"
    ]);
    exit;
}

// respuesta correcta
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

$stmt->close();
$conn->close();
?>
