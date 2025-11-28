<?php
// Php/get_trabajos.php
require_once 'conexion.php';

$sql = "SELECT t.id, t.titulo, t.descripcion, t.precio, t.imagen, u.nombre AS autor
        FROM trabajos t
        LEFT JOIN usuarios u ON t.publicado_por = u.id
        ORDER BY t.creado_en DESC";
$res = $conn->query($sql);

$rows = [];
while($r = $res->fetch_assoc()) {
    $rows[] = $r;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$conn->close();
?>
