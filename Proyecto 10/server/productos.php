<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
$productsSql = $myPDO->query("SELECT * FROM products");
$products = [];
while ($product = $productsSql->fetch(PDO::FETCH_ASSOC)) {
    $products[] = $product;
}
echo json_encode($products);