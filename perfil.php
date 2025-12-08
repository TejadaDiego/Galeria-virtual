<?php
header("Content-Type: application/json");
require_once "conexion.php";

$accion = $_POST["accion"] ?? "";

if ($accion !== "actualizarPerfil") {
    echo json_encode(["status" => "error", "message" => "Acción no permitida"]);
    exit;
}

$id         = $_POST["id"];
$nombre     = $_POST["nombre"];
$email      = $_POST["email"];
$fotoActual = $_POST["fotoActual"] ?? "";

$nuevaFoto = $fotoActual;

// SI SUBIÓ UNA NUEVA FOTO
if (!empty($_FILES["foto"]["name"])) {

    // Crear carpeta si no existe
    if (!is_dir("uploads")) {
        mkdir("uploads", 0777, true);
    }

    $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
    $nuevoNombre = "user_" . $id . "." . $extension;

    $ruta = "uploads/" . $nuevoNombre;

    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $ruta)) {
        $nuevaFoto = $nuevoNombre;
    } else {
        echo json_encode(["status" => "error", "message" => "No se pudo subir la foto"]);
        exit;
    }
}

// ACTUALIZAR EN BD
$sql = "UPDATE usuarios SET nombre=?, email=?, foto=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nombre, $email, $nuevaFoto, $id);

if ($stmt->execute()) {

    // Construir usuario actualizado
    $usuario = [
        "id"    => $id,
        "nombre"=> $nombre,
        "email" => $email,
        "tipo"  => obtenerTipoUsuario($conn, $id),
        "foto"  => $nuevaFoto
    ];

    echo json_encode(["status" => "success", "usuario" => $usuario]);

} else {
    echo json_encode(["status" => "error", "message" => "No se pudo actualizar el perfil"]);
}

$stmt->close();
$conn->close();


// FUNCION PARA OBTENER EL TIPO DEL USUARIO DESDE BD
function obtenerTipoUsuario($conn, $id) {
    $sql = "SELECT tipo FROM usuarios WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc()["tipo"];
}
?>
