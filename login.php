<?php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=UTF-8");

// 1. Recibir datos del formulario
$email = trim($_POST['email'] ?? "");
$password = $_POST['password'] ?? "";

// Validación de campos vacíos
if ($email === "" || $password === "") {
    echo json_encode(["error" => "Completa todos los campos."]);
    exit;
}

// 2. Preparar consulta para buscar usuario
$sql = $conn->prepare("
    SELECT id, nombre, email, password_hash, foto, tipo 
    FROM usuarios 
    WHERE email = ?
");
$sql->bind_param("s", $email);
$sql->execute();
$sql->store_result();

// Validar si el correo existe
if ($sql->num_rows === 0) {
    echo json_encode(["error" => "Correo no registrado."]);
    exit;
}

// 3. Obtener datos encontrados
$sql->bind_result($id, $nombre, $correoDB, $hash, $foto, $tipo);
$sql->fetch();

// 4. Verificar contraseña
if (!password_verify($password, $hash)) {
    echo json_encode(["error" => "Contraseña incorrecta."]);
    exit;
}

// 5. Guardar datos en sesión PHP
$_SESSION['user_id'] = $id;
$_SESSION['nombre']  = $nombre;
$_SESSION['foto']    = $foto ?: "img/default.png";
$_SESSION['email']   = $correoDB;
$_SESSION['tipo']    = $tipo;

// 6. Respuesta exitosa para JS
echo json_encode([
    "success" => true,
    "usuario" => [
        "id"     => $id,
        "nombre" => $nombre,
        "email"  => $correoDB,
        "foto"   => $foto ?: "img/default.png",
        "tipo"   => $tipo
    ]
]);

?>
