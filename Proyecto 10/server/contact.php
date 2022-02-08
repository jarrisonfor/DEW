<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
if(!empty($_POST)){
    $fields = '';
    $values = '';
    foreach ($_POST as $field => $value) {
        $fields .= $field . ',';
        $values .= '"' . $value . '",';
    }
    $fields = rtrim($fields, ',');
    $values = rtrim($values, ',');
    $myPDO->query("INSERT INTO messages ($fields) VALUES ($values);");
}
echo json_encode(['response' => true]);
