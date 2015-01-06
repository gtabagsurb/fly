<?php

$link = mysqli_connect('localhost','root','','test');
//проверка соединения:
if(mysqli_connect_errno())
    die('Ошибка соединения: '.mysqli_connect_error()); //или if(!$link) {..
else {
  /*
  $res = mysqli_query($link,"SELECT * FROM `test`");
  if($res) { //если запрос успешный
    while($row = mysqli_fetch_assoc($res)) {
        //выводим как нам надо
        print_r($row["id"]."  ".$row["name"]."  ".$row["age"]);
        print "<br>";
    }
    mysqli_free_result($res); //очищаем занятую память - она уже не нужна

 }    
    */
  mysqli_query($link,"CREATE TABLE airports2(city_eng varchar(80), country_eng varchar(50),  iata_code varchar(3), name_eng varchar(80))");    
  //$row = 1;
  
  /*
  if (($handle = fopen("apinfo.ru2.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 500, "|")) !== FALSE) {
      //$num = count($data);
      //echo "<p>строка $row: <br></p>";
      //$row++;
        
        //for ($c=0; $c < $num; $c++) {
        //echo $data[$c] . "<br>";
        
      
      $query="INSERT INTO airports2 VALUES ('".$data[0]."', '".$data[1]."', '".$data[2]."', '".$data[3]."')";
        echo $query."<br>";
        mysqli_query($link,$query);
     }
  }
  fclose($handle);
  
  */
  mysqli_close($link);
}
  
  




//phpinfo();
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