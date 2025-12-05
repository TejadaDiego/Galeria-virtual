<?php
// Php/get_trabajos.php
require_once __DIR__ . "/conexion.php";

header('Content-Type: application/json; charset=utf-8');

// ================================
// CONSULTA SEGURA
// ================================
$sql = "
    SELECT 
        t.id, 
        t.titulo, 
        t.descripcion, 
        t.precio, 
        t.imagen, 
        u.nombre AS autor
    FROM trabajos t
    LEFT JOIN usuarios u ON t.publicado_por = u.id
    ORDER BY t.creado_en DESC
";

$res = $conn->query($sql);

if (!$res) {
    echo json_encode([
        "error" => "Error en la consulta: " . $conn->error
    ]);
    exit;
}

$trabajos = [];

while ($fila = $res->fetch_assoc()) {

    // Imagen por defecto si está vacía
    if (empty($fila["imagen"])) {
        $fila["imagen"] = "Img/default.png";
    } else {
        // Si tu carpeta está en /Uploads/
        if (!file_exists("../" . $fila["imagen"])) {
            $fila["imagen"] = "Img/default.png";
        }
    }

    $trabajos[] = $fila;
}

$conn->close();

// ================================
// RESPUESTA JSON
// ================================
echo json_encode($trabajos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
