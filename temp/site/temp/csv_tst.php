<?php
$row = 1;
if (($handle = fopen("apinfo.ru3.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 0, "|")) !== FALSE) {
        $num = count($data);
        echo "<p> $num полей в строке $row: <br /></p>\n";
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c] . "<br />\n";
        }
      echo $data;
    }
    fclose($handle);
  
  echo $data;
}
?>