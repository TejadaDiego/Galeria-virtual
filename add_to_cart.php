<?php
// Php/add_to_cart.php
session_start();

// Aceptar SOLO método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Método no permitido";
    exit;
}

// Capturar datos
$id       = intval($_POST['id'] ?? 0);
$titulo   = trim($_POST['titulo'] ?? '');
$precio   = floatval($_POST['precio'] ?? 0);
$cantidad = intval($_POST['cantidad'] ?? 1);

// Validación básica
if ($id <= 0 || $titulo === '' || $precio <= 0) {
    http_response_code(400);
    echo "Datos inválidos";
    exit;
}

// Inicializar carrito si no existe
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Buscar si el producto ya está en el carrito
$found = false;
foreach ($_SESSION['cart'] as &$item) {

    if ($item['id'] === $id) {

        // Incrementar cantidad
        $item['cantidad'] += $cantidad;
        $item['subtotal'] = $item['cantidad'] * $item['precio'];

        $found = true;
        break;
    }
}

// Si NO estaba en el carrito → añadirlo
if (!$found) {
    $_SESSION['cart'][] = [
        'id'       => $id,
        'titulo'   => $titulo,
        'precio'   => $precio,
        'cantidad' => $cantidad,
        'subtotal' => $precio * $cantidad
    ];
}

// Respuesta OK
echo "ok";
exit;
?>
