<?php
// Php/get_trabajos.php
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
        u.nombre AS autor
    FROM trabajos t
    LEFT JOIN usuarios u ON t.publicado_por = u.id
    ORDER BY t.id DESC
";

$res = $conn->query($sql);

if (!$res) {
    echo json_encode([
        "error" => "Error en la consulta SQL: " . $conn->error
    ]);
    exit;
}

$trabajos = [];

while ($fila = $res->fetch_assoc()) {

    // ================================
    // VALIDAR IMAGEN
    // ================================
    
    // Si no hay imagen guardada
    if (empty($fila["imagen"])) {
        $fila["imagen"] = "img/default.png";
    } else {

        // Ruta absoluta en disco
        $rutaFisica = __DIR__ . '/../' . $fila["imagen"];

        // Si el archivo NO existe → usar una default
        if (!file_exists($rutaFisica)) {
            $fila["imagen"] = "img/default.png";
        }
    }

    $trabajos[] = $fila;
}

$conn->close();

// ================================
// RESPUESTA JSON
// ================================
echo json_encode($trabajos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
