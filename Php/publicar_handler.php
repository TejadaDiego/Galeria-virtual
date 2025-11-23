<?php
// Php/publicar_handler.php
session_start();
require_once 'conexion.php';

// Requiere usuario logueado
if (!isset($_SESSION['usuarioActivo'])) {
    http_response_code(401);
    echo "Debes iniciar sesión para publicar.";
    exit;
}

$usuario = $_SESSION['usuarioActivo']; // contiene id, nombre, email

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = trim($_POST['nombre'] ?? '');
    $descripcion = trim($_POST['descripcion'] ?? '');
    $precio = floatval($_POST['precio'] ?? 0);

    // imagen
    $imagen_path = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $allowed = ['image/jpeg','image/png','image/webp','image/gif'];
        if (!in_array($_FILES['imagen']['type'], $allowed)) {
            http_response_code(400);
            echo "Tipo de imagen no permitido.";
            exit;
        }
        $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
        $filename = 'trabajo_'.time().'_'.bin2hex(random_bytes(5)).'.'.$ext;
        $dest = __DIR__ . '/../uploads/' . $filename;
        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $dest)) {
            http_response_code(500);
            echo "Error subiendo la imagen.";
            exit;
        }
        $imagen_path = 'uploads/' . $filename;
    }

    $stmt = $conn->prepare("INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por) VALUES (?,?,?,?,?)");
    $stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $imagen_path, $usuario['id']);
    if ($stmt->execute()) {
        echo "ok";
    } else {
        http_response_code(500);
        echo "Error guardando trabajo.";
    }
    $stmt->close();
}
$conn->close();
?>
