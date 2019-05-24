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

<link rel="stylesheet" type="text/css"
	href="css/style-multiresolution.css"></link>
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
					src="http://www.youtube.com/embed/T-Nrwif7dss?rel=0"
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
						href="https://www.lirmm.fr/~cuenca/publications/tvcg/cuenca_et_al_2018.pdf"
						target="_blank">PDF</a> | <a href="https://youtu.be/T-Nrwif7dss"
						target="_blank">Video</a> | <a
						href="http://www.lirmm.fr/~cuenca/publications/tvcg/MultiStream_VIS_2018.pdf"
						target="_blank">Slides (presented at IEEE VIS 2018)</a>
				</p>
				<p align="justify" style="font-size: 12px;">
					E. Cuenca, A. Sallaberry, F. Y. Wang, and P. Poncelet. MultiStream:
					A Multiresolution Streamgraph Approach to Explore Hierarchical Time
					Series. <i>IEEE Transactions on Visualization and Computer Graphics</i>,
					24(12):3160-3173, 2018.
				</p>
				<br>
				<p>
					Contact: <a href="mailto:erick.cuenca@lirmm.fr">erick.cuenca@lirmm.fr</a>
					<a href="https://github.com/erickedu85/" target="_blank"> <span
						class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i
							class="fa fa-github fa-stack-1x fa-inverse"></i>
					</span>
					</a>
				</p>

			</div>
			<div class="col-sm-4">
				<h3>Datasets available</h3>
				<ul>
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
						</ul>
					</li>
				</ul>
			</div>

			<div class="col-sm-3">

				<form action="visualize.php" method="post"
					enctype="multipart/form-data">
					<h3>Visualize an example</h3>
					<div class="dropdown">
						<select id="dataset" name='dataset'>
							<?php
							header ( 'content-type: text/html; charset=utf-8' );
							$myfile = fopen ( "php/select-option.txt", "r" ) or die ( "Unable to open file select-option.txt in php/!" );
							// Output one line until end-of-file
							// echo '<option value="">Select...</option>';
							$index = 0;
							while ( ! feof ( $myfile ) ) {
								echo '<option value="' . $index . '">' . fgets ( $myfile ) . '</option>';
								$index ++;
							}
							fclose ( $myfile );
							?>

						</select>
					</div>
					<br>

					<!-- 				
					<h3>Upload your data (json file)</h3>
					<p>
						<input type="file" name="fileToUpload" id="fileToUpload">
					</p>
					 -->

					<p>
						<input type="submit" value="Visualize" name="submit">
					</p>
					<p>
						<strong>Optimized</strong> for chrome browser.
					</p>
				</form>
			</div>
		</div>
		<br> <br>
	</div>

</body>
</html>
