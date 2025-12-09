<?php
require_once __DIR__ . "/conexion.php";

header('Content-Type: application/json; charset=utf-8');

// ================================
// CONSULTA DE TRABAJOS
// ================================
$sql = "
    SELECT 
        t.id, 
        t.titulo, 
        t.descripcion, 
        t.precio, 
        t.imagen, 
        t.publicado_por,
        u.nombre AS autor
    FROM trabajos t
    LEFT JOIN usuarios u ON t.publicado_por = u.id
    ORDER BY t.id DESC
";

$res = $conn->query($sql);

if (!$res) {
    echo json_encode([
        "success" => false,
        "error" => "Error SQL: " . $conn->error
    ]);
    exit;
}

$trabajos = [];

while ($fila = $res->fetch_assoc()) {

    // ================================
    // CORREGIR RUTA DE IMAGEN
    // ================================

    if (!empty($fila["imagen"])) {

        // Ruta pública correcta
        $rutaPublica = "uploads/" . $fila["imagen"];

        // Ruta física real correcta (sin ../)
        $rutaFisica = __DIR__ . "/uploads/" . $fila["imagen"];

        if (file_exists($rutaFisica)) {
            $fila["imagen"] = $rutaPublica;
        } else {
            $fila["imagen"] = "img/default.png";
        }

    } else {
        $fila["imagen"] = "img/default.png";
    }

    $trabajos[] = $fila;
}

$conn->close();

echo json_encode($trabajos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
