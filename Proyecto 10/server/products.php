<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
if (!empty($_GET['category'])) {
    $stmt = $myPDO->prepare("SELECT * FROM products WHERE category = ?");
    $stmt->execute([$_GET['category']]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} else {
    $stmt = $myPDO->prepare("SELECT * FROM products");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}