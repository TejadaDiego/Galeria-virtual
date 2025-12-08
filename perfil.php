<?php
header('Content-Type: application/json');
require_once "conexion.php";

$accion = $_POST["accion"] ?? "";

if ($accion !== "actualizarPerfil") {
    echo json_encode(["status" => "error", "message" => "Acción no válida"]);
    exit;
}

$id = $_POST["id"];
$nombre = $_POST["nombre"];
$email = $_POST["email"];
$fotoActual = $_POST["fotoActual"];

$nuevaFotoNombre = $fotoActual;

// Si se subió nueva foto
if (!empty($_FILES["foto"]["name"])) {
    $ext = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
    $nuevaFotoNombre = "user_" . $id . "." . $ext;
    move_uploaded_file($_FILES["foto"]["tmp_name"], "uploads/" . $nuevaFotoNombre);
}

$sql = "UPDATE usuarios SET nombre=?, email=?, foto=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nombre, $email, $nuevaFotoNombre, $id);

if ($stmt->execute()) {

    $usuario = [
        "id" => $id,
        "nombre" => $nombre,
        "email" => $email,
        "foto" => $nuevaFotoNombre,
        "tipo" => "Estudiante" // o consulta si quieres hacerlo dinámico
    ];

    echo json_encode(["status" => "success", "usuario" => $usuario]);
} else {
    echo json_encode(["status" => "error", "message" => "No se pudo actualizar"]);
}

$stmt->close();
$conn->close();
?>
