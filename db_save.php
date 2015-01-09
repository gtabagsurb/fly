<?php
  $link = mysqli_connect('localhost','root','','flight');
  if(mysqli_connect_errno())
    die('Ошибка соединения: '.mysqli_connect_error()); //или if(!$link) {..
  else {
    $fullname = $link->real_escape_string($_POST['fullname']);
    $ordertime = date("Y-m-d H:i:s");
    $returndate = $_POST['returndate'];
    $email = $link->real_escape_string($_POST['email']);
    $phone = $link->real_escape_string($_POST['phone']);
    $adultsnumber = (int)$_POST['adultsnumber'];
    $childsnumber = (int)$_POST['childsnumber'];
    $type = (int)$_POST['type'];
    $class = (int)$_POST['class'];
    $query="INSERT INTO orders(ordertime, fullname, returndate, email, phone, type, class, adultsnumber, childsnumber) VALUES('".$ordertime."', '".$fullname."' ,'".$returndate."', '".$email."', '".$phone."', ".$type.", ".$class.",".$adultsnumber.",".$childsnumber." )";
    $elements=mysqli_query($link,$query); 
    
    $query = "SELECT id FROM orders WHERE ordertime='".$ordertime."' AND fullname='".$fullname."' AND email='".$email."'";
    $orderid=mysqli_fetch_assoc(mysqli_query($link,$query))['id'];
    
    for ($i=0; $i<((count($_POST)-7)/3+1); $i++) {
      if (isset($_POST['fromairport'.$i])) {
          if ($_POST['fromairport'.$i]<>''){
            //echo $i.": '".$_POST['fromairport'.$i]."' - '".$_POST['toairport'.$i]."'<br>";
            $fromairport = $link->real_escape_string($_POST['fromairport'.$i]);
            $toairport = $link->real_escape_string($_POST['toairport'.$i]);
            $departuredate=$link->real_escape_string($_POST['departuredate'.$i]);
            $query="INSERT INTO flights(fromairport, toairport, departure, orderid) VALUES ('".$fromairport."', '".$toairport."', '".$departuredate."', '".$orderid."')";
            $elements=mysqli_query($link,$query);        
          }
      }
    }
    mysqli_close($link);
    //echo $fullname."\n".$email."\n".$phone;
    
    if (mail("fs34dfg34@flightforsale.com", "My Subject", $fullname."\n".$email."\n".$phone)) { 
      echo "messege acepted for delivery"; 
    } else { 
      echo "some error in sending email happen"; 
    } 
    
    
    
  }
?>