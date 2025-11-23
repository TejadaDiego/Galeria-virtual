<?php
require_once "conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // 1. Validar campos
    if (!isset($_POST['nombre'], $_POST['descripcion'], $_POST['precio'], $_FILES['imagen'])) {
        echo "Faltan campos obligatorios";
        exit;
    }

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];

    // 2. Procesar imagen
    $folder = "../Uploads/";
    if (!file_exists($folder)) {
        mkdir($folder, 0777, true);
    }

    $nombreImagen = time() . "_" . basename($_FILES["imagen"]["name"]);
    $rutaImagen = $folder . $nombreImagen;

    if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaImagen)) {
        echo "Error al subir la imagen";
        exit;
    }

    // 3. Guardar registro en la BD
    $sql = "INSERT INTO trabajos (nombre, descripcion, precio, imagen) 
            VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssis", $nombre, $descripcion, $precio, $nombreImagen);

    if ($stmt->execute()) {
        echo "ok";
    } else {
        echo "Error al guardar en BD: " . $conn->error;
    }

    $stmt->close();
    $conn->close();

} else {
    echo "Método no permitido";
}
?>
