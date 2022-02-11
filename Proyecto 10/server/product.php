<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
if (!empty($_GET['product_id'])) {
    $stmt = $myPDO->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$_GET['product_id']]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($result);
}