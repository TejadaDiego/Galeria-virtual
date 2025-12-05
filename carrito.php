<?php
session_start();

// =============================================
// ACCIONES (ELIMINAR ITEM / VACIAR CARRITO)
// =============================================

// Eliminar un producto específico
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["remove_id"])) {

    $id = intval($_POST["remove_id"]);

    if (isset($_SESSION["cart"])) {
        foreach ($_SESSION["cart"] as $i => $item) {
            if ($item["id"] == $id) {
                unset($_SESSION["cart"][$i]);
                break;
            }
        }
        $_SESSION["cart"] = array_values($_SESSION["cart"]); // Reindexar
    }
}

// Vaciar carrito completamente
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["clear_cart"])) {
    unset($_SESSION["cart"]);
}

// =============================================
// CARGAR CARRITO ACTUALIZADO
// =============================================
$cart = $_SESSION['cart'] ?? [];
$total = 0;
$qty_total = 0;

foreach ($cart as $c) {
    $total += floatval($c['subtotal']);
    $qty_total += intval($c['cantidad']);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Carrito de Compras</title>

    <style>
        body {
            background: #0d0b14;
            color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .carrito-container {
            width: 92%;
            max-width: 1100px;
            margin: 40px auto;
            background: rgba(255,255,255,0.06);
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th {
            background: #5E17EB;
            padding: 12px;
            border-radius: 6px;
            text-align: left;
        }

        td {
            padding: 14px 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .item-img {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
            border: 2px solid white;
        }

        .btn {
            background: #5E17EB;
            padding: 7px 14px;
            color: white;
            border-radius: 6px;
            border: none;
            cursor: pointer;
        }

        .btn-danger {
            background: #dc2626;
        }

        .btn-large {
            padding: 10px 20px;
        }

        .total-box {
            text-align: right;
            margin-top: 20px;
            font-size: 1.3rem;
        }

        .final-buttons {
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
        }

        a.btn {
            text-decoration: none;
            color: white;
            display: inline-block;
        }
    </style>
</head>

<body>

<div class="carrito-container">

    <h2>🛒 Tu Carrito</h2>

<?php if(empty($cart)): ?>

    <p>Tu carrito está vacío.</p>

<?php else: ?>

    <table>
        <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cant.</th>
            <th>Subtotal</th>
            <th>Acciones</th>
        </tr>

        <?php foreach($cart as $item): ?>
        <tr>
            <td>
                <img src="<?= htmlspecialchars($item['imagen'] ?? 'Img/default.png') ?>" class="item-img">
            </td>

            <td><?= htmlspecialchars($item['titulo']) ?></td>

            <td>S/ <?= number_format($item['precio'], 2) ?></td>

            <td><?= intval($item['cantidad']) ?></td>

            <td>S/ <?= number_format($item['subtotal'], 2) ?></td>

            <td>
                <!-- Eliminar producto -->
                <form action="" method="POST" style="display:inline;">
                    <input type="hidden" name="remove_id" value="<?= $item['id'] ?>">
                    <button class="btn btn-danger" type="submit">Eliminar</button>
                </form>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>

    <div class="total-box">
        Total: <strong>S/ <?= number_format($total, 2) ?></strong>
    </div>

    <div class="final-buttons">

        <!-- Vaciar carrito -->
        <form action="" method="POST">
            <button class="btn btn-danger btn-large" name="clear_cart" type="submit"
                onclick="return confirm('¿Vaciar carrito por completo?')">
                🗑 Vaciar carrito
            </button>
        </form>

        <!-- Finalizar compra -->
        <form action="checkout.php" method="POST">
            <input type="text" name="direccion" placeholder="Dirección (opcional)"
                style="padding:8px; width:250px; border-radius:6px;">
            <button class="btn btn-large" type="submit"
                onclick="return confirm('¿Confirmar compra?')">
                💳 Comprar
            </button>
        </form>

    </div>

<?php endif; ?>

</div>

</body>
</html>
