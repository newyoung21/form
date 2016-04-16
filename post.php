<?php
	$name = $_GET['username'];
	$phone = $_GET['phone'];
	$staus = 'success';
	$items = array('name'=>$name,'phone'=>$phone,'staus'=>$staus);
		
	return json_encode($items);
?>