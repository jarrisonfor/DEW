<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
$user_id = $_POST['user_id'];
$products = $_POST['products'];
$userSql = $myPDO->query("SELECT * FROM users where id = '" . $user_id . "'");
$user = $userSql->fetch(PDO::FETCH_ASSOC);
if (empty($user)) {
    echo json_encode(['status' => 'error', 'message' => 'The user does not exist']);
    exit;
}
if (!empty($_POST)) {
    $myPDO->query("INSERT INTO orders (user_id) VALUES (" . $user_id . ");");
    $order_id = $myPDO->lastInsertId();
    foreach ($_POST['products'] as $product) {
        $fields = 'order_id,';
        $values = '"'. $order_id . '",';
        foreach ($product as $field => $value) {
            $fields .= $field . ',';
            $values .= '"' . $value . '",';
        }
        $fields = rtrim($fields, ',');
        $values = rtrim($values, ',');
        $myPDO->query("INSERT INTO orders_products ($fields) VALUES ($values);");
    }
}
echo json_encode($user);
