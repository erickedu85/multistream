<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" name="viewport"
	content="width=device-width, initial-scale=1">
<title>SentiRiver</title>
<link rel="stylesheet" type="text/css" href="css/style.css"></link>

<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
	
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

<script type="text/javascript" src="js/d3.min.js"></script>
<script type="text/javascript" src="js/d3-queue.v2.min.js"></script>
<script type="text/javascript" src="js/sentiRiver.js"></script>

<body>

<?php
$str = file_get_contents('php/dataset/ranges.json');
$json = json_decode($str,true);
echo '<pre>' . print_r($json, true) . '</pre>';
?>
	<button class="btn btn-info" data-toggle="collapse" data-target="#demo">
		<i class="fa fa-cog" aria-hidden="true"></i> Settings
	</button>
	<form id="demo" class="collapse" style="width: 700px">
		<ul class="list-group">
			<li class="list-group-item"><label for="nTimeGranularity-value">
					time granularity = <span id="nTimeGranularity-text">…</span>
			</label> <input id="nTimeGranularity-value" type="range" value="1" min="1"
				max="10" step="1"></li>
			<li class="list-group-item"><label for="alpha-value">
					Alpha Proportion = <span id="alpha-text">3</span>
			</label> <input id="alpha-value" type="range" value="3" min="1" max="10"
				step="1"> <label><input id="p66" type="checkbox">
					Sort valuesk</label></li>
		</ul>
	</form>


</body>
</html>