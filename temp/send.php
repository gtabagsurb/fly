<?
$name=$_POST['name'];
$subject=$_POST['theme'];
$e_mail=$_POST['e_mail'];
$headers=$_POST['headers'];
$message=$_POST['message'];
/* Адрес получателя*/
$toMail = 'receiver@mail.ru<script cf-hash="f9e31" type="text/javascript">
/* <![CDATA[ */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/* ]]> */</script>';
$headers  = "From: $name <$e_mail> \n";
    mail ("$toMail", "$subject", 
"\nИмя : $name
E-mail : $e_mail
Тема сообщения : $subject
Подробнее : $message\n\n", "$headers");
?>
