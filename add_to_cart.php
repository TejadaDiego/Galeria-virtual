<?php
// Php/add_to_cart.php
session_start();

// Solo acepta POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { 
    http_response_code(405); 
    echo "Método no permitido";
    exit; 
}

// Sanitización y validación
$id       = isset($_POST['id']) ? intval($_POST['id']) : 0;
$titulo   = isset($_POST['titulo']) ? trim($_POST['titulo']) : '';
$precio   = isset($_POST['precio']) ? floatval($_POST['precio']) : 0;
$cantidad = isset($_POST['cantidad']) ? intval($_POST['cantidad']) : 1;

// Validación básica
if ($id <= 0 || $titulo === '' || $precio <= 0 || $cantidad <= 0) { 
    http_response_code(400); 
    echo "Datos inválidos";
    exit; 
}

// Inicializa carrito si no existe
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$productoExistente = false;

// Buscar si el producto ya está en el carrito
foreach ($_SESSION['cart'] as &$item) {
    if ($item['id'] == $id) {

        // Actualiza cantidad y subtotal
        $item['cantidad'] += $cantidad;
        $item['subtotal'] = $item['cantidad'] * $item['precio'];

        $productoExistente = true;
        break;
    }
}

// Si no existe, agregar nuevo
if (!$productoExistente) {
    $_SESSION['cart'][] = [
        'id'       => $id,
        'titulo'   => $titulo,
        'precio'   => $precio,
        'cantidad' => $cantidad,
        'subtotal' => $precio * $cantidad
    ];
}

// Respuesta correcta para el fetch de JS
echo "ok";
