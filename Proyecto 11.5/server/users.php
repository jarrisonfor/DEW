<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
$email = !empty($_GET['email']) ? $_GET['email'] : $_POST['email'];
$userSql = $myPDO->query("SELECT * FROM users where email = '" . $email . "'");
$user = $userSql->fetch(PDO::FETCH_ASSOC);
if(!empty($_POST)){
    $fields = '';
    $values = '';
    foreach ($_POST as $field => $value) {
        $fields .= $field . ',';
        $values .= '"' . $value . '",';
    }
    $fields = rtrim($fields, ',');
    $values = rtrim($values, ',');
    /* si el email no existe, crear usuario, si no, soltar error */
    if ($user['email'] !== $email) {
        $myPDO->query("INSERT INTO users ($fields) VALUES ($values);");
        $user = $userSql->fetch(PDO::FETCH_ASSOC);
    } else{
        echo json_encode(['status' => 'error', 'message' => 'El email ya existe']);
        exit;
    }
}
echo json_encode($user);

