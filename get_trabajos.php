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
        t.publicado_por,     -- 👈 NECESARIO para eliminar o validar dueño
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
    // VALIDAR RUTA DE IMAGEN
    // ================================
    
    if (empty($fila["imagen"])) {
        // No hay imagen en BD
        $fila["imagen"] = "img/default.png";

    } else {

        // Ruta física real       (publicar_handler.php guarda: uploads/trabajos/...)
        $rutaFisica = __DIR__ . '/../' . $fila["imagen"];

        // Si no existe el archivo físico → usar una imagen fallback
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
