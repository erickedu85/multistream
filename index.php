<!DOCTYPE html>
<html lang="en">
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-129272585-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-129272585-1');
</script>
<title>MultiStream</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" type="image/png" href="img/multistream.png" />

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"></link>

<!-- FONTS used for icons -->
<link href="fonts/font-awesome-4.2.0/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">

<link rel="stylesheet" type="text/css" href="css/style-multiresolution.cs?v=20250726"></link>
<link rel="stylesheet" type="text/css" href="css/style-tree.css"></link>
<link rel="stylesheet" type="text/css" href="css/style-tooltip.css"></link>
<link rel="stylesheet" type="text/css" href="css/loader.css"></link>

<!-- SCRIPTS -->
<script type="text/javascript" src="js/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>



</head>
<body>

	<div class="container">
		<div class="panel">
			<h2 class="title" align="center">MultiStream: A Multiresolution
				Streamgraph Approach to Explore Hierarchical Time Series</h2>
			<h3 class="title" align="center">An approach to convey the
				hierarchical structure of multiple time series</h3>

			<div class="text-center">
				<iframe width="75%" height="370"
					src="https://www.youtube.com/embed/T-Nrwif7dss"
					frameborder="0" webkitallowfullscreen mozallowfullscreen
					allowfullscreen></iframe>
			</div>
			<br>
		</div>
		<div class="row">
			<div class="col-sm-5">
				<h3>Abstract</h3>
				<p align="justify">
					Multiple time series are a set of multiple quantitative variables
					occurring at the same interval. They are present in many domains
					such as medicine, finance, and manufacturing for analytical
					purposes. In recent years, <i> <a
						href="http://leebyron.com/streamgraph/" target="_blank">
							Streamgraph</a></i> visualization (evolved from ThemeRiver) has
					been widely used for representing temporal evolution patterns in
					multiple time series. However, Streamgraph as well as ThemeRiver
					suffer from scalability problems when dealing with several time
					series. To solve this problem, multiple time series can be
					organized into a hierarchical structure where individual time
					series are grouped hierarchically according to their proximity. In
					this paper, we present a new Streamgraph-based approach to convey
					the hierarchical structure of multiple time series to facilitate
					the exploration and comparisons of temporal evolution. Based on a
					focus+context technique, our method allows time series exploration
					at different granularities (<i>e.g.</i> from overview to details).
				</p>
				<p>
					<a
						href="https://hal-lirmm.ccsd.cnrs.fr/lirmm-01693077v1"
						target="_blank">PDF</a> | <a href="https://youtu.be/T-Nrwif7dss"
						target="_blank">Video</a> | <a
						href="https://erickedu85.github.io/presentations/ecuenca_multistream_vis_2018.pdf"
						target="_blank">Slides (presented at IEEE VIS 2018)</a>
				</p>
				<p align="justify" style="font-size: 12px;">
					Erick Cuenca, Arnaud Sallaberry, Florence Y. Wang, and Pascal Poncelet. MultiStream:
					A Multiresolution Streamgraph Approach to Explore Hierarchical Time
					Series. <i>IEEE Transactions on Visualization and Computer Graphics</i>,
					24(12):3160-3173, 2018. <a href="https://doi.org/10.1109/TVCG.2018.2796591" target="_blanck">doi: 10.1109/TVCG.2018.2796591</a>
				</p>
				<br>
				<p>
					Contact: <a href="mailto:ecuenca@yachaytech.edu.ec">ecuenca@yachaytech.edu.ec</a>
					<a href="https://github.com/erickedu85/multistream" target="_blank"> <span
						class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i
							class="fa fa-github fa-stack-1x fa-inverse"></i>
					</span>
					</a>
				</p>

			</div>
			<div class="col-sm-4">
				<h3>Datasets available</h3>
				<ul>
					<li>COVID-19's evolution:
						<ul>
							<li>Confirmed cases:</li>
								<ul>
									<li>Total confirmed cases</li>
									<li>New confirmed cases</li>
									<li>New confirmed cases smoothed</li>
									<li>Total confirmed cases per million</li>
									<li>New confirmed cases per million</li>
									<li>New confirmed cases smoothed per million</li>
								</ul>
							<li>Confirmed deaths:</li>
								<ul>
									<li>Total deaths</li>
									<li>New deaths</li>
									<li>New deaths smoothed</li>
									<li>Total deaths per million</li>
									<li>New deaths per million</li>
									<li>New deaths smoothed per million</li>
								</ul>						
						</ul>
					</li>
					<li>Sentiment analysis of political events:
						<ul>
							<li>2016 US presidential election day</li>
							<li>2013 Australian presidential period</li>
						</ul>
					</li>
					<li>Sentiment analysis of sporting events:
						<ul>
							<li>2016 UEFA Champions league final</li>
							<li>2014 Rugby union match</li>
						</ul>
					</li>
					<li>Other datasets:
						<ul>
							<li>Music genre evolution</li>
							<li>AIDS user forums</li>
							<li>Surface temperature changes</li>
						</ul>
					</li>
				</ul>
			</div>

			<div class="col-sm-3">

				<div class="row" style="border-radius: 10px; border: 1px solid lightgray; width:100%; padding:0rem 1rem 1rem 1rem;">
					<form action="visualize.php" method="post"
						enctype="multipart/form-data">
						<h3>Visualize an example</h3>
						<div class="dropdown">
							<select id="dataset" name='dataset' style="max-width:90%;">
								<?php
								header ( 'content-type: text/html; charset=utf-8' );
								$myfile = fopen ( "php/select-option.txt", "r" ) or die ( "Unable to open file select-option.txt in php/!" );
								
								$index = 0;
								
								while ( ! feof ( $myfile ) ) {
									$curr = fgets ( $myfile ) ;
									$bgnoptgroup = strpos($curr, "beginoptgroup");
									$endoptgroup = strpos($curr, "endoptgroup");

									if ($bgnoptgroup !== false){
										$optgrouplabelx = substr($curr,$bgnoptgroup + strlen("beginoptgroup"));
										echo '<optgroup label="' . $optgrouplabelx . '">';	
									}elseif ($endoptgroup !== false){
										echo '</optgroup>';
									}else{
										echo '<option value="' . $index . '">' . $curr  . '</option>';	
										$index ++;
									}					
									
								}
								fclose ( $myfile );
								?>

							</select>
						</div>
						<br>
						<p>
							<input type="submit" value="Visualize" name="submit">
						</p>
					</form>
				</div>

				<div class="row" style="border-radius: 10px; border: 1px solid lightgray; width:100%; margin-top:1rem; padding:0rem 1rem 1rem 1rem;">

					<form action="visualize.php" method="post"
						enctype="multipart/form-data">
						<h3>Upload a file</h3>
						

						<input type="hidden" id="fileContent" name="fileContent">
						<input type="hidden" id="fileName" name="fileName">
						<input type="file" id="uploadFile" class="file-upload-button" accept=".json"/>
						
						<br>
						<p>
							<input id="btnVisualizeFile" type="submit" name="submit" value="Visualize" disabled>
						</p>
						<br>
						Follow these <strong><a href='instructions.html' target="_blank">instructions</a></strong> to generate a supported JSON file
					</form>
				</div>

				<p>
					<br>
					<strong>Optimized</strong> for chrome browser.
				</p>

			</div>
		</div>
	</div>


	<script>

		function handleFileSelect(evt) {

			let f = evt.target.files[0]
			let reader = new FileReader();
			
			reader.onload = (function(theFile){
				return function(e){
					// console.log(theFile)
					var obj = e.target.result

					document.getElementById('fileContent').value =  obj;
					document.getElementById('fileName').value =  theFile.name;
					document.getElementById('btnVisualizeFile').disabled = false
				}
			})(f);

			reader.readAsText(f);
			
		}

		document.getElementById('uploadFile').addEventListener('change', handleFileSelect, false);

	</script>


</body>
</html>
