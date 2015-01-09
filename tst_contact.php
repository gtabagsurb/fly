<?php
if(isset($_POST['name'])) {
	echo'
		<script type="text/javascript">
		var elm=parent.window.document.getElementById("result");
		elm.innerHTML=elm.innerHTML+"<br />Получено имя '.str_replace("\r","",str_replace("\n","<br />",htmlspecialchars(stripslashes($_POST['name'])))).' с текстом '.str_replace("\r","",str_replace("\n","<br />",htmlspecialchars(stripslashes($_POST['comment'])))).' ";
		</script>
	';
}
?>