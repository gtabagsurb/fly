<script type="text/javascript">
function SendForm() {
	//отправка файла на сервер
	$$f({
		formid:'order-form',//id формы
		url:'tst_contact.php',//адрес на серверный скрипт, такой же как и в форме
		onstart:function () {//действие при начале отправки
			$$('result','начинаю отправку');//в элемент с id="result" выводим результат
		},
		onsend:function () {//действие по окончании отправки
			$$('result',$$('result').innerHTML+'<br />комментарий успешно отправлен');//в элемент с id="result" выводим результат
		}
	});
}
</script>