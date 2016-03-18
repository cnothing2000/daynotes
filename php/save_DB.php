<?php

header('content-type:text/json;charset=utf8'); 
date_default_timezone_set("PRC");

//basic info
$json_object = array();
$json_object['application_info']='ZZ daynotes 0.2 (PHP)';
$json_object['server_time']=date('Y-m-d H:i:s');
$json_object['operation']='save DB';
//$json_object['post_data'] = file_get_contents("php://input");

if (file_put_contents('../data/daynotesDB.json', file_get_contents("php://input"))!=false){
    $json_object['success']='1';
}else{
    $json_object['success']='0';
}

echo(json_encode($json_object));

?>

