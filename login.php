<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexion.php";

// =======================
// VALIDAR CAMPOS RECIBIDOS
// =======================
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

// ==========================
// CONSULTA SEGÚN EMAIL + TIPO
// ==========================
$sql = "SELECT id, nombre, email, password_hash, tipo, foto 
        FROM usuarios 
        WHERE email = ? AND tipo = ?
        LIMIT 1";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => "Error interno al preparar la consulta."
    ]);
    exit;
}

$stmt->bind_param("ss", $email, $tipo);
$stmt->execute();
$result = $stmt->get_result();

// ==========================
// NO EXISTE USUARIO
// ==========================
if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "error" => "Usuario no encontrado o tipo de acceso incorrecto."
    ]);
    exit;
}

$user = $result->fetch_assoc();

// ==========================
// VALIDAR PASSWORD
// ==========================
if (!password_verify($password, $user["password_hash"])) {
    echo json_encode([
        "success" => false,
        "error" => "Contraseña incorrecta."
    ]);
    exit;
}

// ==========================
// LOGIN EXITOSO
// ==========================
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
