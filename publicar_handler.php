<?php
// Php/publicar_handler.php
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json");

// --------------------------------------------------------------
// 1. VERIFICAR SESIÓN
// --------------------------------------------------------------
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Debes iniciar sesión para publicar."]);
    exit;
}

$usuario_id = intval($_SESSION["user_id"]);

// --------------------------------------------------------------
// 2. VALIDAR DATOS RECIBIDOS
// --------------------------------------------------------------
$titulo = trim($_POST['titulo'] ?? '');
$descripcion = trim($_POST['descripcion'] ?? '');
$precio = floatval($_POST['precio'] ?? 0);

if ($titulo === '' || $precio <= 0) {
    echo json_encode(["error" => "Campos incompletos o inválidos."]);
    exit;
}

// --------------------------------------------------------------
// 3. MANEJO DE IMAGEN
// --------------------------------------------------------------
$nombreArchivo = null;

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {

    // Carpeta PÚBLICA para las imágenes
    $carpetaPublica = __DIR__ . "/../uploads/"; 
    $rutaParaDB = "uploads/";

    if (!is_dir($carpetaPublica)) {
        mkdir($carpetaPublica, 0777, true);
    }

    $nombreArchivoLimpio = preg_replace('/[^a-zA-Z0-9._-]/', '_', $_FILES['imagen']['name']);
    $nombreArchivo = time() . "_" . $nombreArchivoLimpio;

    $rutaDestino = $carpetaPublica . $nombreArchivo;

    if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaDestino)) {
        echo json_encode(["error" => "Error al guardar la imagen en el servidor."]);
        exit;
    }

    // Valor que se guardará en la base de datos
    $nombreArchivo = $rutaParaDB . $nombreArchivo;
}

// --------------------------------------------------------------
// 4. INSERTAR EN LA BASE DE DATOS
// --------------------------------------------------------------
$sql = "INSERT INTO trabajos (titulo, descripcion, precio, imagen, publicado_por)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "error" => "Error en prepare()",
        "detalle" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $nombreArchivo, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "error" => "Error al insertar",
        "detalle" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
