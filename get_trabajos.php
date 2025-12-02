<?php
// Php/get_trabajos.php
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// Consulta de trabajos publicados + datos del autor
$sql = "SELECT 
            t.id,
            t.titulo,
            t.descripcion,
            t.precio,
            t.imagen,
            u.nombre AS autor
        FROM trabajos t
        LEFT JOIN usuarios u ON t.publicado_por = u.id
        ORDER BY t.creado_en DESC";

$result = $conn->query($sql);

// Manejo de error SQL
if (!$result) {
    echo json_encode([
        "error" => true,
        "mensaje" => "Error en la consulta SQL",
        "sql_error" => $conn->error
    ]);
    exit;
}

// Arreglo final
$trabajos = [];

while ($fila = $result->fetch_assoc()) {

    // Asegurar que precio sea número con 2 decimales
    $fila["precio"] = floatval($fila["precio"]);

    // Asegurar ruta correcta de imagen
    if (!empty($fila["imagen"]) && !str_starts_with($fila["imagen"], "http")) {
        $fila["imagen"] = "../" . $fila["imagen"]; // Evita rutas rotas
    }

    $trabajos[] = $fila;
}

echo json_encode($trabajos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$conn->close();
?>
