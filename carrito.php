<?php
// carrito.php
session_start();
$cart = $_SESSION['cart'] ?? [];
$total = 0;
$qty_total = 0;
foreach($cart as $c){ $total += $c['subtotal']; $qty_total += $c['cantidad']; }
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Carrito</title></head>
<body>
  <h2>Tu carrito</h2>
  <?php if(empty($cart)): ?>
    <p>Tu carrito está vacío.</p>
  <?php else: ?>
    <table border="1" cellpadding="8">
      <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr>
      <?php foreach($cart as $item): ?>
        <tr>
          <td><?=htmlspecialchars($item['titulo'])?></td>
          <td>S/ <?=number_format($item['precio'],2)?></td>
          <td><?=intval($item['cantidad'])?></td>
          <td>S/ <?=number_format($item['subtotal'],2)?></td>
        </tr>
      <?php endforeach; ?>
    </table>
    <p>Cantidad total: <?=$qty_total?></p>
    <p>Total: S/ <?=number_format($total,2)?></p>

    <form action="Php/checkout.php" method="post">
      <!-- si quieres pedir direccion, agregar input -->
      <input type="text" name="direccion" placeholder="Dirección (opcional)">
      <button type="submit" onclick="return confirm('Confirmar compra?')">Comprar</button>
    </form>
  <?php endif; ?>
</body>
</html>
