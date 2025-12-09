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
    // RUTA DE LA IMAGEN CORRECTA
    // ================================
    if (!empty($fila["imagen"])) {

        // Construimos la ruta pública
        $rutaPublica = "uploads/" . $fila["imagen"];

        // Ruta física real para validar
        $rutaFisica = __DIR__ . "/../uploads/" . $fila["imagen"];

        if (file_exists($rutaFisica)) {
            $fila["imagen"] = $rutaPublica;
        } else {
            $fila["imagen"] = "img/default.png"; // fallback
        }

    } else {
        $fila["imagen"] = "img/default.png";
    }

    $trabajos[] = $fila;
}

$conn->close();

echo json_encode($trabajos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
