<?php
// Php/login.php
session_start();
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (!$email || !$password) {
        http_response_code(400);
        echo "Completa todos los campos";
        exit;
    }

    $stmt = $conn->prepare("SELECT id, nombre, password_hash, tipo, foto FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 0) {
        http_response_code(401);
        echo "Usuario no encontrado";
        exit;
    }

    $row = $res->fetch_assoc();
    if (password_verify($password, $row['password_hash'])) {
        // iniciar sesión
        $_SESSION['usuarioActivo'] = [
            'id' => (int)$row['id'],
            'nombre' => $row['nombre'],
            'email' => $email,
            'tipo' => $row['tipo'],
            'foto' => $row['foto']
        ];
        // también devolvemos JSON para JS
        echo json_encode($_SESSION['usuarioActivo']);
    } else {
        http_response_code(401);
        echo "Contraseña incorrecta";
    }

    $stmt->close();
}
$conn->close();
?>
