<?php
  $link = mysqli_connect('localhost','root','','flight');
  if(mysqli_connect_errno())
    die('Ошибка соединения: '.mysqli_connect_error()); //или if(!$link) {..
  else {
    $link->set_charset("utf8");
    $fullname = $link->real_escape_string($_POST['fullname']);
    $ordertime = date("Y-m-d H:i:s");
    $returndate = $_POST['returndate'];
    $email = $link->real_escape_string($_POST['email']);
    $phone = $link->real_escape_string($_POST['phone']);
    $adultsnumber = (int)$_POST['adultsnumber'];
    $childsnumber = (int)$_POST['childsnumber'];
    $type = (int)$_POST['type'];
    $class = (int)$_POST['class'];
    if (type==1) {
      $query="INSERT INTO orders(ordertime, fullname, returndate, email, phone, type, class, adultsnumber, childsnumber) VALUES('".$ordertime."', '".$fullname."' ,'".$returndate."', '".$email."', '".$phone."', ".$type.", ".$class.",".$adultsnumber.",".$childsnumber." )";
    }
    else {
      $query="INSERT INTO orders(ordertime, fullname, returndate, email, phone, type, class, adultsnumber, childsnumber) VALUES('".$ordertime."', '".$fullname."' ,NULL, '".$email."', '".$phone."', ".$type.", ".$class.",".$adultsnumber.",".$childsnumber." )";
    }
    
    
    $elements=mysqli_query($link,$query); 
    //echo "\n".$query."\n";
    //if (!$elements) {
    //echo "Не удалось создать таблицу: (" . $mysqli->errno . ") " . $mysqli->error;
    //}
    //echo "\n".$elements."\n";
    $query = "SELECT id FROM orders WHERE ordertime='".$ordertime."' AND fullname='".$fullname."' AND email='".$email."'";
    $orderid=mysqli_fetch_assoc(mysqli_query($link,$query))['id'];
    $fromairport=[];
    $fromairport_full=[];
    $toairport=[];
    $toairport_full=[];
    $departuredate=[];
    $j=0;
    for ($i=0; $i<((count($_POST)-7)/3+1); $i++) {
      if (isset($_POST['fromairport'.$i])) {
          if ($_POST['fromairport'.$i]<>''){
            //echo $i.": '".$_POST['fromairport'.$i]."' - '".$_POST['toairport'.$i]."'<br>";
            $fromairport[$j] = $link->real_escape_string($_POST['fromairport'.$i]);
            $toairport[$j] = $link->real_escape_string($_POST['toairport'.$i]);
            $departuredate[$j]=$link->real_escape_string($_POST['departuredate'.$i]);
            $query="INSERT INTO flights(fromairport, toairport, departure, orderid) VALUES ('".$fromairport[$j]."', '".$toairport[$j]."', '".$departuredate[$j]."', '".$orderid."')";
            $elements=mysqli_query($link,$query);
            $query="SELECT airport_full FROM ffs_airports WHERE iata='".$fromairport[$j]."'";
            $elements=mysqli_query($link,$query); 
            $fromairport_full[$j] = mysqli_fetch_assoc($elements)['airport_full'];
            $query="SELECT airport_full FROM ffs_airports WHERE iata='".$toairport[$j]."'";
            $elements=mysqli_query($link,$query); 
            $toairport_full[$j] = mysqli_fetch_assoc($elements)['airport_full'];
            $j++;
          }
      }
    }
    $flightsnumber=$j;
    mysqli_close($link);
    $subject="Заказ № RU-".$orderid." from ".$fullname." ".$email;
    $message="\nЗаказ RU-".$orderid."\n\n".$fullname."\n".$email."\n".$phone."\n";
    if ($class==1) {$message.="Бизнес-класс \n";};
    if ($class==2) {$message.="Первый класс \n";};
    $message.="Взрослых: ".$adultsnumber."\n";
    //if ($childsnumber>0) {$message.="Children: ".$childsnumber."\n";};
    $message.="Детей: ".$childsnumber."\n";
    if ($type==1) {
      $message.="\ТУДА И ОБРАТНО\nИз: ".$fromairport_full[0]."\nДо: ".$toairport_full[0]."\nВылет туда: ".$departuredate[0]."\nВылет обратно: ".$returndate;
    };
    
    if ($type==2) {
      $message.="\nВ ОДИН КОНЕЦ\nИз: ".$fromairport_full[0]."\nДо: ".$toairport_full[0]."\nВылет: ".$departuredate[0];
    };
    if ($type==3) {
      $message.="\nНЕСКОЛЬКО ПУНКТОВ ПЕРЕЛЕТА\n";
      for ($i=0; $i<$flightsnumber; $i++) {
        if ($fromairport[$i]<>''){
            $message.=($i+1).". ".$departuredate[$i]."\n    Из: ".$fromairport_full[$i]."\n    До: ".$toairport_full[$i]."\n";
        }
      }
    };
    echo "\n".$message."\n";
    if (mail("fs34dfg34@flightforsale.com", $subject, $message)) { 
      echo "message acepted for delivery"; 
    } else { 
      echo "some error in sending email happen"; 
    } 
    if (mail("order@flightforsale.com", $subject, $message)) { 
      echo "message acepted for delivery"; 
    } else { 
      echo "some error in sending email happen"; 
    } 
    
    
  }
?>
