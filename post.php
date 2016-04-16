<?php
	$name = $_POST['username'];
	$phone = $_POST['phone'];
	$staus = 'success';
	 $items = array('name'=>$name,'phone'=>$phone,'staus'=>$staus);
		
	echo json_encode($items);
?>