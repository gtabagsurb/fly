<?php
  $link = mysqli_connect('localhost','root','','flight');
  if(mysqli_connect_errno())
    die('Ошибка соединения: '.mysqli_connect_error()); //или if(!$link) {..
  else {
    //$tmp="AA";
    $query="SELECT iato AS value, airport AS label FROM prd_airports WHERE airport like concat('%','".$_GET['term']."','%')";
    //$query="SELECT iato AS value, airport AS label FROM prd_airports WHERE airport like concat('%','".$tmp."','%')";
    //echo $query;
    $elements=mysqli_query($link,$query); 
    //echo $elements."<br>";
    mysqli_close($link);
    $res='[';
    while($row = mysqli_fetch_assoc($elements)) {
        //echo $row["airport"];
        //echo "<br>";
        $res .= '"'.$row['label'].'",';
        $row_set[] = $row;
    }
    $res=substr($res, 0, -1)."]";
    $res='"'.$res.'"';
    //$elements = findAutocomplete($_GET['term']);
    //$s = "[".implode(",", $elements["airport"])."]";
    //echo $res;
    $json = json_encode($row_set);
    print $json;
    
    
  }
?>