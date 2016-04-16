<?php
	$name = $_POST['username'];
	$phone = $_POST['phone'];
	$items = {
		status : success,
		name : $name,
		phone: $phone
	};
	echo $items;
?>