<?php
// Php/register.php
session_start();
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $pass = $_POST['password'];
    $tipo = $_POST['tipo'] ?? 'Comprador/Vendedor';

    if (!$nombre || !$email || !$pass) {
        http_response_code(400);
        echo "Completa todos los campos";
        exit;
    }

    // validar email básico
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Email inválido";
        exit;
    }

    // Hash de contraseña
    $hash = password_hash($pass, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password_hash, tipo) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nombre, $email, $hash, $tipo);

    if ($stmt->execute()) {
        $usuario_id = $stmt->insert_id;
        // cargar datos en sesión
        $_SESSION['usuarioActivo'] = [
            'id' => $usuario_id,
            'nombre' => $nombre,
            'email' => $email,
            'tipo' => $tipo,
            'foto' => null
        ];
        echo "ok";
    } else {
        if ($conn->errno === 1062) {
            http_response_code(409);
            echo "El correo ya está registrado.";
        } else {
            http_response_code(500);
            echo "Error al registrar.";
        }
    }
    $stmt->close();
}
$conn->close();
?>
