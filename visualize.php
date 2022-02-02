<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1">
<link rel="shortcut icon" type="image/png" href="img/multistream.png" />
<link rel="stylesheet" type="text/css"
	href="fonts/font-awesome-4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css"
	href="css/bootstrap-clearmin.min.css">
<link rel="stylesheet" type="text/css"
	href="css/style-multiresolution.css"></link>
<link rel="stylesheet" type="text/css" href="css/style-tree.css"></link>
<link rel="stylesheet" type="text/css" href="css/style-tooltip.css"></link>
<link rel="stylesheet" type="text/css" href="css/loader.css"></link>
<title>MultiStream</title>


<script type='text/javascript'>
			<?php ini_set("memory_limit","256M");?>
			<?php
			$indexSelect = $_POST ["dataset"];

			$name_covid = "COVID-19";
			$fileName_covid = "data";
			$filePath_covid = "source/covid_evolution/";
			$timePolarity_covid =3; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
			$nTimeGranularity_covid = 1; // interval by nGranularity minimum 1 max 5
			$isLargeTree_covid = TRUE;
			$description_covid = "<strong>About: </strong>This visualization shows the COVID-19's evolution<br><strong>Period: </strong>From January 2020 to present (weekly updated)<br><strong>Periodicity: </strong>weekly (7 days)<br><strong>Dataset: </strong>This datasets comes from the <a href='https://ourworldindata.org/coronavirus-source-data' target='_blank'>Our World in Data</a> webpage. Visit the Github repository <a href='https://github.com/owid/covid-19-data/tree/master/public/data/' target='_blank'>here</a> ";
			
			switch ($indexSelect) {
				case 0 :
					$name = "Music genre evolution";
					$fileName = "data";
					$filePath = "source/music_genre_evolution/" . $fileName . ".json";
					$timePolarity = 5; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = 1; // interval by nGranularity minimum 1 max 5
					$isLargeTree = FALSE;
					$description = "<strong>About: </strong>This visualization shows the evolution of music genres<br><strong>Period: </strong>From 1960 to 2016<br><strong>Dataset: </strong>10,642 bands. Metadata comes from MusicBrainz web site";
					break;
				case 1 :
					$name = "AIDS";
					$fileName = "data";
					$filePath = "source/aids/" . $fileName . ".json";
					$timePolarity = 4; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = 1; // interval by nGranularity minimum 1 max 5
					$isLargeTree = FALSE;
					$description = "<strong>About: </strong>";
					break;					
				case 2:
					$name = $name_covid. ' - Total confirmed cases';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "total_cases/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;
				case 3:
					$name = $name_covid . ' - New confirmed cases';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_cases/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;
				case 4:
					$name = $name_covid. ' - New confirmed cases smoothed';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_cases_smoothed/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;
				case 5:
					$name = $name_covid. ' - Total confirmed cases per million';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "total_cases_per_million/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;
				case 6:
					$name = $name_covid. ' - New confirmed cases per million';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_cases_per_million/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;
				case 7:
					$name = $name_covid. ' - New confirmed cases smoothed per million';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_cases_smoothed_per_million/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;	
				case 8:
					$name = $name_covid. ' - Total deaths';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "total_deaths/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;		
				case 9:
					$name = $name_covid. ' - New deaths';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_deaths/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;
				case 10:
					$name = $name_covid. ' - New deaths smoothed';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_deaths_smoothed/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;		
				case 11:
					$name = $name_covid. ' - Total deaths per million';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "total_deaths_per_million/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;
				case 12:
					$name = $name_covid. ' - New deaths per million';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_deaths_per_million/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;	
				case 13:
					$name = $name_covid. ' - New deaths smoothed per million';
					$fileName = $fileName_covid;
					$filePath = $filePath_covid . "new_deaths_smoothed_per_million/" . $fileName . ".json";
					$timePolarity = $timePolarity_covid; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = $nTimeGranularity_covid; // interval by nGranularity minimum 1 max 5
					$isLargeTree = $isLargeTree_covid;
					$description = $description_covid;
					break;																														
				case 14 :
					$name = "Sentiment analysis of the 2016 US presidential election day";
					$fileName = "data";
					$filePath = "source/2016_us_presidential_election_day/" . $fileName . ".json";
					$timePolarity = 0; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = 1; // interval by nGranularity minimum 1 max 5
					$isLargeTree = FALSE;
					$description = "<strong>About: </strong>This visualization shows the sentiments expressed in tweets on the 2016 US presidential election day<br><strong>Period: </strong>8-9 November, 2016 (UTC)<br><strong>Dataset: </strong>371,584 tweets with the hashtag #Hillary or #Trump";
					break;
				case 15 :
					$name = "Sentiment analysis of the 2016 US second presidential debate";
					$fileName = "data";
					$filePath = "source/2016_us_second_presidential_debate/" . $fileName . ".json";
					$timePolarity = 0; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = 1; // interval by nGranularity minimum 1 max 5
					$isLargeTree = FALSE;
					$description = "<strong>About: </strong>Tweets collected<br><strong>Period: </strong><br><strong>Tweets: </strong>  <br><strong>Hashtag: </strong>";
					break;
				case 16 :
					$name = "Sentiment analysis of the 2013 Australian presidential period";
					$fileName = "data";
					$filePath = "source/2013_australian_presidential_period/" . $fileName . ".json";
					$timePolarity = 0; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = 5; // interval by nGranularity minimum 1 max 5
					$isLargeTree = FALSE;
					$description = "<strong>About: </strong>This visualization shows the sentiments expressed in tweets on the 2013 Australian presidential period<br><strong>Period: </strong>5-7 September, 2013 (UTC+10)<br><strong>Dataset: </strong> 122,393 tweets";
					break;
				case 17 :
					$name = "Sentiment analysis of the 2016 UEFA Champions league final";
					$fileName = "data";
					$filePath = "source/2016_uefa_champions_league_final/" . $fileName . ".json";
					$timePolarity = 0; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = 1; // interval by nGranularity minimum 1 max 5
					$isLargeTree = FALSE;
					$description = "<strong>About: </strong>This visualization shows the sentiments expressed in tweets on the 2016 UEFA Champions league final<br><strong>Period: </strong>Mai 28th, 2016 20:00-24:00 (UTC+2)<br><strong>Tweets: </strong>2,009 tweets";
					break;
				case 18 :
					$name = "Sentiment analysis of a rugby union match 2014";
					$fileName = "data";
					$filePath = "source/2014_rugby_union_match/" . $fileName . ".json";
					$timePolarity = 0; // 0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
					$nTimeGranularity = 1; // interval by nGranularity minimum 1 max 5
					$isLargeTree = FALSE;
					$description = "<strong>About: </strong>This visualization shows the sentiments expressed in tweets on a rugby union match 2014<br><strong>Period: </strong>November 22th, 2014 17:40-19:10 (UTC+2)<br><strong>Tweets: </strong>2,531 tweets with the hashtag #WAvNZ";
					break;

					
			}
			
			$str = file_get_contents ( $filePath );
			
			// $json = json_decode ( json_encode ( utf8_encode ( $str ) ) ); // WORKS
			$json = json_decode ( json_encode ( $str ) ); // PRUEBA WORKS AUSSI
			$error = json_last_error ();
			
			?>
			var jsonArray =  <?php echo ($json); ?>;
			var timePolarity = <?php echo $timePolarity; ?>;
			var nTimeGranularity = <?php echo $nTimeGranularity; ?>;
			var fileName = <?php echo json_encode($fileName); ?>; //json_encode for the String
			var isLargeTree = <?php echo json_encode($isLargeTree); ?>;
			

			

		</script>

</head>
<body class="cm-no-transition cm-1-navbar">

	<div id="fb-root"></div>
	<script>(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.8";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
	</script>

	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

	<div id="loader"></div>
	<div id="cm-menu">
		<nav class="cm-navbar cm-navbar-primary">
			<div class="cm-flex">
				<div class="cm-logos"></div>
			</div>
			<div class="btn btn-primary md-menu-white" data-toggle="cm-menu"></div>
		</nav>
		<div id="cm-menu-content">
			<svg id="tree-vis"></svg>
		</div>
	</div>
	<header id="cm-header" style="display: inline;">
		<nav class="cm-navbar cm-navbar-primary">
			<div class="btn btn-primary md-menu-white hidden-md hidden-lg"
				data-toggle="cm-menu"></div>
			<div class="cm-flex">
				<h1 style="display: inline;"><?php echo($name)?></h1>
				<i id="panelInfo" class="fa fa-info-circle fa-lg"
					data-toggle="modal" data-target="#infoModal"></i>
			</div>
			<div class="pull-right" style="padding: 15px 15px 0px 15px; width: 75px;">
				<a  class="twitter-share-button" href="https://twitter.com/share"
					data-size="small" data-text="MultiStream (a time series visualization)"
					data-url="https://goo.gl/LjSjMK"
					data-hashtags="timeseries,visualization,d3js" data-via=""
					data-related="timeseries,visualization,hierarchical,d3js"> Tweet </a>
			</div>
			<div class="pull-right" style="padding: 15px 15px 0px 15px; width: 75px;">
				<a  class="fb-share-button"
					data-href="https://goo.gl/LjSjMK"
					data-layout="button" data-size="small"></a>
			</div>
			<div class="pull-right">
				<button id="svg-export"
					class="btn btn-primary md-download-svg-white"></button>
			</div>
		</nav>
	</header>
	<div id="global" style="display: none;">
		<!-- style="overflow-y:hidden; -->
		<div class="container-fluid cm-container-white"
			style="overflow: hidden; margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px;">
			<svg id="multiresolution-vis"></svg>
		</div>
		<footer class="cm-footer" style="display: none;"> </footer>

		<nav id="menu-bottom" class="navbar navbar-default">
			<div class="container-fluid">
				<div class="col-md-3">
					<div id="col-visualization">
						<label class="radio-inline"><input id="label-streamgraph"
							type="radio" name="optradio" value="stream" checked>Streamgraph</label>
						<label class="radio-inline"><input id="label-stackedgraph"
							type="radio" name="optradio" value="stacked">Stackedgraph</label>
					</div>
				</div>
				<div class="col-md-4">
					<div id="col-projections">
						<div class="col-md-4">
							<h6>
								&#x3B1; <input type="number" id="alpha" name="alpha"
									data-toggle="tooltip" title="detailed-area">
							</h6>
						</div>
						<div class="col-md-4">
							<h6>
								&#x3B2; <input type="number" id="beta" name="beta"
									data-toggle="tooltip" title="transition-areas">
							</h6>
						</div>
						<div class="col-md-4">
							<h6>
								&#x3B3; <input type="number" id="gamma" name="gamma"
									data-toggle="tooltip" title="context-areas">
							</h6>
						</div>
					</div>
				</div>
				<div class="col-md-5">
					<div id="col-checked">
						<label class="checkbox-inline" style="display: none;"><input
							id="animation" type="checkbox" value="" checked>Animation</label>
						<label class="checkbox-inline"><input id="outline-layers"
							type="checkbox" value="">Outline layers</label> <label
							class="checkbox-inline"><input id="limit-ranges" type="checkbox"
							value="">Border areas</label> <label class="checkbox-inline"><input
							id="fading-colors" type="checkbox" value="">Highlight
							detailed-area</label>
					</div>
				</div>
				<!-- 				<div class="col-md-2"> -->
				<!-- 					<div id="col-checked"> -->
				<!-- 						<label class="checkbox"><input id="fading-colors" -->
				<!-- 							type="checkbox" value="">Fading colors</label> -->
				<!-- 					</div> -->
				<!-- 				</div> -->
			</div>
		</nav>

	</div>

	<div id="alert-msg"
		class="alert alert-danger alert-dismissable hidden fade in">
		<span id="close-alert" class="close">&times;</span> <strong>Warning!</strong>
		not allowed due to constraints.
	</div>

	<!-- Modal information -->
	<div class="modal fade" id="infoModal" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" style="text-transform: capitalize;">
						<?php echo($name)?>
					</h4>
				</div>
				<div class="modal-body">
					<p>
						<?php echo($description)?>
					</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal data -->
	<div class="modal fade" id="data-modal" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div id="data-modal-title" class="modal-header"></div>
				<div id="data-modal-msg" class="modal-body"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="js/jquery-2.2.3.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>
	<script type="text/javascript" src="js/jquery.cookie.min.js"></script>
	<script type="text/javascript" src="js/fastclick.min.js"></script>
	<script type="text/javascript" src="js/clearmin.min.js"></script>
	<script type="text/javascript" src="js/d3.min.js"></script>
	<script type="text/javascript" src="js/compVecOut.js"></script>
	<script type="text/javascript" src="js/rpoly.js"></script>
	<script type="text/javascript" src="js/PolyReCoeffInT.js"></script>
	<script type="text/javascript" src="js/svg-crowbar-2.js"></script>
	<script type="text/javascript" src="js/chroma.js"></script>
	<script type="text/javascript" src="js/generalizes.js"></script>
	<script type="text/javascript" src="js/multistream-hierarchy-util.js"></script>
	<script type="text/javascript" src="js/multistream-var-global.js"></script>
	<script type="text/javascript" src="js/multiresolution-vis.js"></script>
	<script type="text/javascript" src="js/tree-vis.js"></script>

</body>
</html>