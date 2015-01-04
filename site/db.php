<?php

$link = mysqli_connect('localhost','root','','test');
//проверка соединения:
if(mysqli_connect_errno())
    die('Ошибка соединения: '.mysqli_connect_error()); //или if(!$link) {..
else {
  $res = mysqli_query($link,"SELECT * FROM `test`");
  if($res) { //если запрос успешный
    while($row = mysqli_fetch_assoc($res)) {
        //выводим как нам надо
        print_r($row);
        print "<br>";
    }
    mysqli_free_result($res); //очищаем занятую память - она уже не нужна
}
mysqli_close($link);
}


phpinfo();
/*
$link = mysql_connect();
mysql_select_db('test');
//$result = mysql_db_query(string запрос [, переменная соединения]);
$res = mysql_query(" SELECT * FROM `test` ",$link);
while($row = mysql_fetch_assoc($res)) {
    print_r($row);  
}
*/



?>