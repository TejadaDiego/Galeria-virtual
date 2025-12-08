<?php
header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    echo json_encode([
        "status" => "error",
        "message" => "Campos vacíos"
    ]);
    exit;
}

$sql = "SELECT id, nombre, email, password_hash, tipo, foto 
        FROM usuarios 
        WHERE email = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Error interno al preparar consulta"
    ]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuario no encontrado"
    ]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user["password_hash"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Contraseña incorrecta"
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "user" => [
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
