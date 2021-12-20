<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
$dni = !empty($_GET['dni']) ? $_GET['dni'] : $_POST['dni'];
$userSql = $myPDO->query("SELECT * FROM users where dni = '" . $dni . "'");
$user = $userSql->fetch(PDO::FETCH_ASSOC);
if(!empty($_POST)){
    $fields = '';
    $values = '';
    $setFields = '';
    foreach ($_POST as $field => $value) {
        $setFields .= $field . ' = "' . $value . '",';
        $fields .= $field . ',';
        $values .= '"' . $value . '",';
    }
    $fields = rtrim($fields, ',');
    $values = rtrim($values, ',');
    $setFields = rtrim($setFields, ',');
    if ($user['dni'] !== $dni) {
        $myPDO->query("INSERT INTO users ($fields) VALUES ($values);");
        $user = $userSql->fetch(PDO::FETCH_ASSOC);
    } else {
        $myPDO->query("UPDATE users SET $setFields WHERE dni = '" . $dni . "';");
        $user = $userSql->fetch(PDO::FETCH_ASSOC);
    }
}
echo json_encode($user);

