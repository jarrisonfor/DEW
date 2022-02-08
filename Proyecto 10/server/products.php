<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
$category = !empty($_GET['category']) ? $_GET['category'] : $_POST['category'];
if ($category) {
    $stmt = $myPDO->prepare("SELECT * FROM products WHERE category = ?");
    $stmt->execute([$category]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} else {
    $stmt = $myPDO->prepare("SELECT * FROM products");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}