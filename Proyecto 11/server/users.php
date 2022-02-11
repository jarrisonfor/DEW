<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$myPDO = new PDO('sqlite:database.sqlite');
$email = !empty($_GET['email']) ? $_GET['email'] : $_POST['email'];
$userSql = $myPDO->query("SELECT * FROM users where email = '" . $email . "'");
$user = $userSql->fetch(PDO::FETCH_ASSOC);
if(!empty($_POST)){
    if (!empty($_POST['name'])) {
        if (empty($user['email'])) {
            $fields = '';
            $values = '';
            foreach ($_POST as $field => $value) {
                $fields .= $field . ',';
                $values .= '"' . $value . '",';
            }
            $fields = rtrim($fields, ',');
            $values = rtrim($values, ',');
            $myPDO->query("INSERT INTO users ($fields) VALUES ($values);");
            $userSql = $myPDO->query("SELECT * FROM users where email = '" . $email . "'");
            $user = $userSql->fetch(PDO::FETCH_ASSOC);
        } else{
            echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
            exit;
        }
    } else {
        if (empty($user['email']) || $user['password'] != $_POST['password']) {
            echo json_encode(['status' => 'error', 'message' => 'Wrong email or password']);
            exit;
        }
    }
}
echo json_encode($user);