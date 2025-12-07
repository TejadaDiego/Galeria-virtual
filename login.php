<?php
error_reporting(0);
session_start();
require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json; charset=utf-8");

// ======================================================================
// A) ACTUALIZAR PERFIL
// ======================================================================
if (isset($_POST['accion']) && $_POST['accion'] === 'actualizarPerfil') {

    $id     = intval($_POST['id']);
    $nombre = trim($_POST['nombre'] ?? '');
    $email  = trim($_POST['email'] ?? '');

    if ($nombre === '' || $email === '') {
        echo json_encode(["error" => "Nombre y correo son obligatorios"]);
        exit;
    }

    $foto = "";

    // SUBIR FOTO OPCIONAL
    if (!empty($_FILES['foto']['name'])) {

        $folder = __DIR__ . "/uploads/";
        if (!is_dir($folder)) mkdir($folder, 0777, true);

        $nombreArchivo = "user_" . $id . "_" . time() . ".jpg";
        $rutaFinal = $folder . $nombreArchivo;

        if (move_uploaded_file($_FILES['foto']['tmp_name'], $rutaFinal)) {
            $foto = "uploads/" . $nombreArchivo;
        }
    }

    // ACTUALIZACIÓN SQL
    if ($foto === "") {
        $stmt = $conn->prepare("UPDATE usuarios SET nombre=?, email=? WHERE id=?");
        $stmt->bind_param("ssi", $nombre, $email, $id);
    } else {
        $stmt = $conn->prepare("UPDATE usuarios SET nombre=?, email=?, foto=? WHERE id=?");
        $stmt->bind_param("sssi", $nombre, $email, $foto, $id);
    }

    $stmt->execute();

    echo json_encode([
        "success" => true,
        "usuario" => [
            "id"     => $id,
            "nombre" => $nombre,
            "email"  => $email,
            "foto"   => $foto !== "" ? $foto : ($_POST['fotoActual'] ?? "img/default.png")
        ]
    ]);
    exit;
}

// ======================================================================
// B) LOGIN
// ======================================================================
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    echo json_encode(["error" => "Completa email y contraseña"]);
    exit;
}

$stmt = $conn->prepare("
    SELECT id, password_hash, nombre, foto, tipo, email
    FROM usuarios
    WHERE email = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["error" => "Correo no registrado"]);
    exit;
}

$stmt->bind_result($id, $hash, $nombre, $foto, $tipo, $email_db);
$stmt->fetch();

if (!password_verify($password, $hash)) {
    echo json_encode(["error" => "Contraseña incorrecta"]);
    exit;
}

if (!$foto) $foto = "img/default.png";

$_SESSION['user_id'] = $id;
$_SESSION['nombre']  = $nombre;
$_SESSION['foto']    = $foto;
$_SESSION['tipo']    = $tipo;

echo json_encode([
    "success" => true,
    "usuario" => [
        "id"     => $id,
        "nombre" => $nombre,
        "email"  => $email_db,
        "foto"   => $foto,
        "tipo"   => $tipo
    ]
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$stmt->close();
$conn->close();
