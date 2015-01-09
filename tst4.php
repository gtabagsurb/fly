<?php
  $link = mysqli_connect('localhost','root','','test');
  if(mysqli_connect_errno())
    die('Ошибка соединения: '.mysqli_connect_error()); //или if(!$link) {..
  else {
    $fullname = $link->real_escape_string($_POST['fullname']);
    $ordertime = date("Y-m-d H:i:s");
    $returndate = $_POST['returndate'];
    $email = $link->real_escape_string($_POST['email']);
    
    //$phone = preg_replace("/[^\x20-\xFF]/","",@strval(trim($_POST['phone']))); 
    $phone = $link->real_escape_string($_POST['phone']);
    $adultsnumber = (int)$_POST['adultsnumber'];
    $childsnumber = (int)$_POST['childsnumber'];
    $type = (int)$_POST['type'];
    $class = (int)$_POST['class'];
    
    $query="INSERT INTO orders(ordertime, fullname, returndate, email, phone, type, class, adultsnumber, childsnumber) VALUES('".$ordertime."', '".$fullname."' ,'".$returndate."', '".$email."', '".$phone."', ".$type.", ".$class.",".$adultsnumber.",".$childsnumber." )";
    //echo $query; 'John Smith','2015-01-05 23:30','2015-01-22', 'js@hotmail.com', '+1 332 345-3452', 1, 1,1,0 );
    $elements=mysqli_query($link,$query); 
    //echo $elements."<br>";
    mysqli_close($link);
    
    
    
  }
?>