<?php
header("Content-Type: application/json");
require_once "conexion.php";

$accion = $_POST["accion"] ?? "";

if ($accion === "cambiarPassword") {

    $id = $_POST["id"];
    $passActual = $_POST["passActual"];
    $passNueva  = $_POST["passNueva"];

    // 1. Obtener contraseña actual
    $sql = "SELECT password_hash FROM usuarios WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();

    if (!$res) {
        echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
        exit;
    }

    // 2. Verificar contraseña actual
    if (!password_verify($passActual, $res["password_hash"])) {
        echo json_encode(["status" => "error", "message" => "La contraseña actual es incorrecta"]);
        exit;
    }

    // 3. Generar nueva contraseña encriptada
    $nuevoHash = password_hash($passNueva, PASSWORD_BCRYPT);

    // 4. Guardar nueva contraseña
    $update = $conn->prepare("UPDATE usuarios SET password_hash = ? WHERE id = ?");
    $update->bind_param("si", $nuevoHash, $id);
    $update->execute();

    echo json_encode(["status" => "success"]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Acción no permitida"]);
