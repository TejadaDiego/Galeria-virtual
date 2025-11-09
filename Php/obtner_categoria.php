<?php
include 'conexion.php';

$busqueda = isset($_GET['busqueda']) ? $_GET['busqueda'] : '';

$sql = "SELECT * FROM categoria WHERE nombre LIKE ? OR descripcion LIKE ?";
$stmt = $conn->prepare($sql);
$param = "%" . $busqueda . "%";
$stmt->bind_param("ss", $param, $param);
$stmt->execute();
$result = $stmt->get_result();

$categorias = [];
while ($row = $result->fetch_assoc()) {
    $categorias[] = $row;
}

echo json_encode($categorias);
$stmt->close();
$conn->close();
?>
