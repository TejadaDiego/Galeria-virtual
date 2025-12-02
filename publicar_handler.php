<?php
// Php/publicar_handler.php
session_start();
require_once __DIR__ . "/conexion.php";

// IMPORTANTE → enviamos JSON SIEMPRE
header("Content-Type: application/json");


// =====================================================
// 1. VERIFICAR SESIÓN
// =====================================================
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Debes iniciar sesión para publicar."]);
    exit;
}

$usuario_id = intval($_SESSION['user_id']);


// =====================================================
// 2. VALIDAR DATOS RECIBIDOS
// =====================================================
$titulo      = trim($_POST['titulo'] ?? '');
$descripcion = trim($_POST['descripcion'] ?? '');
$precio      = floatval($_POST['precio'] ?? 0);

if ($titulo === "" || $descripcion === "" || $precio <= 0) {
    echo json_encode(["error" => "Todos los campos son obligatorios."]);
    exit;
}


// =====================================================
// 3. SUBIR IMAGEN (OPCIONAL PERO SOPORTADO)
// =====================================================
$nombreArchivo = null;

if (!empty($_FILES['imagen']['name']) && $_FILES['imagen']['error'] === 0) {

    // Carpeta donde irán las imágenes
    $carpetaUploads = __DIR__ . "/../uploads/";
    $rutaDB = "uploads/";

    if (!is_dir($carpetaUploads)) {
        mkdir($carpetaUploads, 0777, true);
    }

    // Asegurar nombre seguro
    $nombreLimpio = preg_replace('/[^a-zA-Z0-9._-]/', '_', $_FILES['imagen']['name']);
    $nombreFinal = time() . "_" . $nombreLimpio;

    $rutaFinal = $carpetaUploads . $nombreFinal;

    // Validar tipo de imagen
    $permitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!in_array($_FILES['imagen']['type'], $permitidos)) {
        echo json_encode(["error" => "Formato de imagen no permitido (solo JPG, PNG o WEBP)."]);
        exit;
    }

    // Subir archivo
    if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaFinal)) {
        echo json_encode(["error" => "No se pudo guardar la imagen en el servidor."]);
        exit;
    }

    // Ruta para la base de datos
    $nombreArchivo = $rutaDB . $nombreFinal;
}



// =====================================================
// 4. INSERTAR PUBLICACIÓN
// =====================================================
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

    // ⚠ Tu JS espera exactamente "ok"
    echo json_encode("ok");

} else {
    echo json_encode([
        "error" => "No se pudo guardar la publicación.",
        "detalle" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
