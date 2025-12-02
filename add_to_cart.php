<?php
// Php/add_to_cart.php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$id = intval($_POST['id'] ?? 0);
$titulo = trim($_POST['titulo'] ?? '');
$precio = floatval($_POST['precio'] ?? 0);
$cantidad = intval($_POST['cantidad'] ?? 1);

if ($id <= 0 || $titulo === '' || $precio <= 0) { http_response_code(400); echo "Datos inválidos"; exit; }

if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

$found = false;
foreach ($_SESSION['cart'] as &$item) {
    if ($item['id'] == $id) {
        $item['cantidad'] += $cantidad;
        $item['subtotal'] = $item['cantidad'] * $item['precio'];
        $found = true;
        break;
    }
}
if (!$found) {
    $_SESSION['cart'][] = [
        'id' => $id,
        'titulo' => $titulo,
        'precio' => $precio,
        'cantidad' => $cantidad,
        'subtotal' => $precio * $cantidad
    ];
}
echo "ok";
