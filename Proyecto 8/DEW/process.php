<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if(!empty($_POST)) {
    echo (json_encode($_POST));
} else {
    $myObj = new stdClass;
    $myObj->name = "Pepe";
    $myObj->surname = "Lopez Perez";
    $myObj->dni = "12345678Z";
    $myObj->date = "22/09/2000";
    $myObj->cp = 35500;
    $myObj->mail = "pepe@gmail.com";
    $myObj->phone = "928666666";
    $myObj->mobile = "666999666";
    $myObj->card = "4539955085883327";
    $myObj->iban = "ES7921000813610123456789";
    $myObj->password = "Pepe123456789*";
    $myJSON = json_encode($myObj);
    echo $myJSON;

}
