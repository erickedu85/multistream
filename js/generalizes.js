function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);
 
  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}
 
function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);
 
  var avg = sum / data.length;
  return avg;
}

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

//function initializationFromFile() {
//	d3.json("source/json/ranges.json", function(json) {
//		var dataParse = json.data.map(function(d, i) {
//			return [ parseDate(d.Date + " " + d.Time), +d.value ];
//		});
//		// Adding ranges and names to nameRange array variable global
//		// put setNameRanges ()
//		display(dataParse, json.ranges) // display Visualization
//	});
//}

//function initializationQueue() {
//	var q = d3_queue.queue();
//	q.defer(d3.csv, "source/csv/rugbyMatch.csv", type).defer(d3.json,
//			"source/json/ranges.json").await(analyze);
//	// dataset : json file
//	// rangesJson : json file
//	function analyze(error, datasetCsv, rangesJson) {
//		if (error) {
//			console.log(error);
//			alert("Error on load data");
//		}
//		// ranges = rangesJson; //ranges variable global
//		// Adding ranges and names to nameRange array variable global
//		// Put setNameRanges()
//		console.log("displaying...");
//		display(datasetCsv, rangesJson.ranges) // display Visualization
//	}
//}

//function updateLayout(){
//	stack.offset(opts.offsetType); //Changing layout
//	
//	var dataProcessing1 = stack(nest.entries(dataPreRangeLevel1));
//	dataProcessing1.map(addFeatures);
//	var max = d3.max(dataProcessing1, function(aray){
//		return d3.max(aray.values,function(d){return d.y0+d.y;});
//	})
//	yScaleContext.domain([ 0, max]);
//	flowC = context.selectAll(".area") //just for 4 flow, 1 level
//			.data(dataProcessing1,function (d){return d.key;});
//		
//	flowC.transition(t).attr("d", function(d) {console.log("UPDATING NEW DATA Contexte"); return areaContext(d.values);})
//			.style({"fill" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);},
//			"stroke" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);}
//			});
//			
//	flowC.enter()
//			.append("path")
//			.attr("class", "area")
//			.transition(t)
//			.attr("d", function(d) {
//				console.log("ENTERING NEW DATA"); 
//				return areaContext(d.values);})
//			.style({"fill" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);},
//				"stroke" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);}
//				});
//			
//			
//	flowC.exit().transition(t)
//		.style("fill-opacity", 1e-6)
//		.remove();
//	
//	//FOCUS
//	var dataProcessing2 = stack(nest.entries(dataPreRangeLevel2));//Used in Focus Local
//	dataProcessing2.map(addFeatures);
//	var max = d3.max(dataProcessing2, function(aray){
//		return d3.max(aray.values,function(d){return d.y0+d.y;});
//	})
//	yScaleFocus.domain([ 0, max]);
//
//	flowFocusNormal = focus.selectAll(".focus.area0") //just for 4 flow, 1 level
//						.data(dataProcessing1,function (d){return d.key;});
//					
//	flowFocusNormal.transition(t).attr("d", function(d) {
//					console.log("UPDATING NEW DATA"); 
//					return areaFocus(d, 0);})
//					.style({"fill-opacity" : function(d) {return opts.opacityFillFocusNormal;},
//					"stroke-opacity" : function(d) {return 1;},
//					"fill" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);},
//					"stroke" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);}
//					});
//
//	flowFocusNormal.enter()
//				.append("path")
//				.attr("id", "focus_area_0")
//				.attr("class", "focus area0")
//				.attr("d", function(d) {
//				console.log("ENTERING NEW DATA"); 
//				return areaFocus(d, 0);})
//				.style({"fill-opacity" : function(d) {return opts.opacityFillFocusNormal;},
//				"stroke-opacity" : function(d) {return 1;},
//				"fill" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);},
//				"stroke" : function(d) {return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);}
//				});
//	
//	flowFocusNormal.exit().transition(t)
//				.style("fill-opacity", 1e-6)
//				.remove();
//
//	for(var index=1;index<4;index++){
//		
//		flowFocusIndex = focus.selectAll(".focus.area"+index) //just for 4 flow, 1 level
//							.data(dataProcessing2,function (d){return d.key;});
//		
//		flowFocusIndex.transition(t).attr("d", function(d) {
//						console.log("UPDATING NEW DATA details"); 
//							return areaFocus(d, index);})
//						.style({"fill-opacity" : function(d) {
//								switch (index) {
//									case 1: return opts.opacityFillFocusDis; // Distortion area
//									case 2: return opts.opacityFillFocusDis; // Distortion area
//									case 3: return opts.opacityFillFocusZoom; // Detailed area
//								}
//							},
//							"stroke-opacity" : function(d) {
//								switch (index) {
//									case 1:return 1; // Distortion area
//									case 2:return 1; // Distortion area
//									case 3:return 1; // Detailed area
//								}
//							},
//							"fill" : function(d) {
//								switch (index) {
//									case 1: return "url(#gradientLeft"+ d.values[0]["key"];// Distortion area
//									case 2: return "url(#gradientRight"+ d.values[0]["key"];// Distortion area
//									case 3: return "url(#diagonal"+d.values[0]["key"];
//								}
//							},
//							"stroke" : function(d) {
//								switch (index) {
//									case 1: return "url(#gradientLeftStroke"+ d.values[0]["key"];
//									case 2: return "url(#gradientRightStroke"+ d.values[0]["key"];
//									
//								}
//							}
//
//						});
//		
//		flowFocusIndex.enter()
//					.append("path")
//					.attr("id", "focus_area_"+index)
//					.attr("class", "focus area"+index)
//					.attr("d", function(d) {
//					console.log("ENTERING NEW DATA"); 
//						return areaFocus(d, index);})
//					.style({"fill-opacity" : function(d) {
//							switch (index) {
//								case 1: return opts.opacityFillFocusDis; // Distortion area
//								case 2: return opts.opacityFillFocusDis; // Distortion area
//								case 3: return opts.opacityFillFocusZoom; // Detailed area
//							}
//						},
//						"stroke-opacity" : function(d) {
//							switch (index) {
//								case 1:return 1; // Distortion area
//								case 2:return 1; // Distortion area
//								case 3:return 1; // Detailed area
//							}
//						},
//						"fill" : function(d) {
//							switch (index) {
//								case 1: return "url(#gradientLeft"+ d.values[0]["key"];// Distortion area
//								case 2: return "url(#gradientRight"+ d.values[0]["key"];// Distortion area
//								case 3: return "url(#diagonal"+d.values[0]["key"];
//							}
//						},
//						"stroke" : function(d) {
//							switch (index) {
//								case 1: return "url(#gradientLeftStroke"+ d.values[0]["key"];
//								case 2: return "url(#gradientRightStroke"+ d.values[0]["key"];
//								
//							}
//						}
//
//					});		
//		
//		flowFocusIndex.exit().transition(t)
//						.style("fill-opacity", 1e-6)
//						.remove();		
//	}	
//}


function streamgraph (){
	
	
	
	
}


function stackedAreas(){
	
}

/* Return number of minutes in brush object */
function calculeNumIntervals(brushObject, timePolarity, nTimeGranularity) {
	var result;
	switch (timePolarity) {
	case 0:result = d3.time.minutes(brushObject.extent()[0], brushObject.extent()[1], nTimeGranularity).length;
		break;
	case 1:result = d3.time.hours(brushObject.extent()[0],brushObject.extent()[1], nTimeGranularity).length;
		break;
	case 2:result = d3.time.days(brushObject.extent()[0], brushObject.extent()[1],nTimeGranularity).length;
		break;
	case 3:result = d3.time.weeks(brushObject.extent()[0],brushObject.extent()[1], nTimeGranularity).length;
		break;
	case 4:result = d3.time.months(brushObject.extent()[0],brushObject.extent()[1], nTimeGranularity).length;
		break;
	case 5:result = d3.time.years(brushObject.extent()[0],brushObject.extent()[1], nTimeGranularity).length;
		break;
	}
	return result;
}


function getNumberOfLabels(timePolarity, i, j){
	
	var lenghtRange =  rangesDomainFocus[i].values[j].range[1]-rangesDomainFocus[i].values[j].range[0];
	var numberOfIntervals = intervals(timePolarity, i);
	var lenghtLabel;
	var numberOfLabels;
	
	lenghtLabel = getTextWidth(" 00:00 ","20px Arial");
		
	numberOfLabels = Math.floor(lenghtRange/lenghtLabel);

	//If the number of labels to put is bigger than the number of intervales
	if(numberOfLabels > numberOfIntervals){
		numberOfLabels = numberOfIntervals;
	}
	
	return numberOfLabels;
}


function getNumIntervalsDistortion(timePolarity, i, j){
	var numInterval = intervals(timePolarity, i);
	var taille = rangesDomainFocus[i].values[j].range[1]-rangesDomainFocus[i].values[j].range[0];
	var sizeLabel; // = getTextSize("00:00","10px Arial");
	if(i==1){//distortion left
		taille = sDisLeft;
		if(j%2==1){
			sizeLabel = getTextWidth(" 00:00 ","20px Arial") *2
		}else{
			sizeLabel = 1000000000;
		}
	}else if(i==3){//distortion right
		taille = sDisRight;
		if(j%2==1){
			sizeLabel = getTextWidth(" 00:00 ","20px Arial") *2
		}else{
			sizeLabel = 1000000000;
		}
	}
	
	var x = numInterval/(taille / sizeLabel); //numInterval/
	//Cada cuantos intervalos de tiempo se ponen el axis label
	//Ex: return 3; =  cada 10 minutos
	return Math.floor(x);
	
}

function intervals(timePolarity, i){
	var interval;
	switch (timePolarity) { 
		case 0:
			switch (i) { 
				case 0:
					interval = (d3.time.minutes(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.minutes(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.minutes(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.minutes(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.minutes(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
			break;
		case 1:
			switch (i) { 
				case 0:
					interval = (d3.time.hours(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.hours(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.hours(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.hours(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.hours(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;			
		case 2:
			switch (i) { 
				case 0:
					interval = (d3.time.days(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.days(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.days(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.days(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.days(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;			
		case 3:
			switch (i) { 
				case 0:
					interval = (d3.time.weeks(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.weeks(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.weeks(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.weeks(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.weeks(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;			
		case 4:
			switch (i) { 
				case 0:
					interval = (d3.time.months(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.months(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.months(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.months(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.months(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;	
		case 5:
			switch (i) { 
				case 0:
					interval = (d3.time.years(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.years(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.years(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.years(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.years(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;				
	}
	return interval;
}

//0 minutes, 1 hours, 2 days, 3 week, 4 month, 5 years
function getXContextLabel(time){
	var result = "";
		switch (time) { 
		case 0:
			result = "minutes";
			break;
		case 1:
			result = "hours";
			break;
		case 2:
			result = "days";
			break;
		case 3:
			result = "weeks";
			break;
		case 4:
			result = "months";
			break;
		case 5:
			result = "years";
			break;			
	}
	return result
}

//Get text width
function getTextWidth(text, font){
	d3.select("body").append("canvas").attr("id",'myCanvas')
	var c=document.getElementById('myCanvas');
	var ctx=c.getContext('2d');
	ctx.font=font;
	var m=ctx.measureText(text);
	d3.selectAll("#myCanvas").remove();
	return m.width;
}

function intersectRect(r1, r2) {
	  return !(r2.left > r1.right || 
	           r2.right < r1.left || 
	           r2.bottom > r1.top ||
	           r2.top < r1.bottom);
	}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

//interval.offset(date, step)
function getTimeOffset(start, offset, polaridad){
	let timeOffset; 
	switch(polaridad){
		case 0:
			timeOffset = d3.time.minute.offset(start, offset);
			break;
		case 1:
			timeOffset = d3.time.hour.offset(start, offset);
			break;
		case 2:
			timeOffset = d3.time.day.offset(start, offset);
			break;
		case 3:
			timeOffset = d3.time.week.offset(start, offset);
			break;			
		case 4:
			timeOffset = d3.time.month.offset(start, offset);
			break;
		case 5:
			timeOffset = d3.time.year.offset(start, offset);
			break;
		default:
			console.log("getTimeOffset")
			break;
	}
	return timeOffset;
	}

//function updateTransitionFocus() {
//	/* FOCUS */
//	/**
//	 * Function for each rangeData (Key:..) We get the index to graphics : index
//	 * 0 : local area index 1 : distortion area index 2 : distortion area index
//	 * 3 : detailed area In fact : 1,2 and 3 are the same, thats why we calcul
//	 * just 1 time
//	 */
//	function callPreprocessing(element, index) {
//		console.log(index)
//		console.log(element)
//		console.log("==================================================")
//		// 0 local area, is the same that in context area
//		// 3 detail area
//		if (index == 1 || index == 2 || index == 3) { // 1 and 2 = distortion
//			// area
//			dataPreProcessing = preProcessing(dataset, dateRange, ranges, 2);// nivel-2
//			dataProcessing = createStack(dataPreProcessing, offsetType);
//		} else {
//			dataPreProcessing = preProcessing(dataset, dateRange, ranges, 1);// nivel-2
//			dataProcessing = createStack(dataPreProcessing, offsetType);
//		}
//
//		dataProcessing.map(function(element) {
//				element.rangeValues = [ element.values[0].rangeBegin,element.values[0].rangeEnd ];
//				element.name = selectRangeName(element.values[0].rangeBegin,element.values[0].rangeEnd);
//				element.linkedTo = selectLinkedRangeName(element.name);
//				element.level = selectLevel(element.name);
//		});
//
//		// console.log(dataProcessing)
//
//		// focus.selectAll(".area" + index)
//		// .data(dataProcessing)
//		// .transition()
//		// .duration(opts.durationTransition).ease(opts.ease)
//		// .attr("d",function(d){return areaFocus(d,index);});
//
//		focus.selectAll(".focus .area" + index)
//				.data(dataProcessing)
//				.transition()
//				.duration(opts.durationTransition)
//				.ease(opts.ease)
//				.attr("d", function(d) {return areaFocus(d, index);})
//				.style({
//							"fill-opacity" : function(d) {
//								switch (index) {
//									case 0:return 0.85; // Local area
//									case 1:return 0.85; // Distortion area
//									case 2:return 0.85; // Distortion area
//									case 3:return 0.85; // Detailed area
//								}
//							},
//							"stroke-opacity" : function(d) {
//								switch (index) {
//									case 0:return 1; // Local area
//									case 1:return 1; // Distortion area
//									case 2:return 1; // Distortion area
//									case 3:return 1; // Detailed area
//								}
//							},
//							"fill" : function(d) {
//								switch (index) {
//									case 1:return "url(#gradientLeft"+ selectGradientFocus(d.values[0]["key"],gradientFocusLeft) + ")";
//									case 2:return "url(#gradientRight"+ selectGradientFocus(d.values[0]["key"],gradientFocusRight) + ")";
//									default:return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);
//								}
//							},
//							"stroke" : function(d) {
//								switch (index) {
//									case 1:return "url(#gradientLeftStroke"+ selectGradientFocus(d.values[0]["key"],gradientFocusLeftStroke)+ ")";
//									case 2:return "url(#gradientRightStroke"+ selectGradientFocus(d.values[0]["key"],gradientFocusRightStroke)+ ")";
//									default:return GetRGBColorString((d.values[0]["rangeBegin"] + d.values[0]["rangeEnd"]) / 2);
//								}
//							}
//						});
//	}
//	rangeData.forEach(callPreprocessing);
//}

/**
* CONTEXT Get Data Processing
* 
* @param nTimeGranularity
* @returns
*/
//function getDataProcessing(nTimeGranularity) {
//	console.log("getDataProcessing........")
//	// DateRange : get a new date dataset with the MinRange and MaxRange likelimites EVERY nTimeGranularity time
//	// dateRange = d3.time.minutes(d3.time.minute.floor(dateMinRange),d3.time.minute.ceil(dateMaxRange),nTimeGranularity);
//	switch (timePolarity) {
//		case 0: dateRange = d3.time.minutes(d3.time.minute.floor(dateMinRange),d3.time.minute.ceil(dateMaxRange), nTimeGranularity);
//			break;
//		case 1: dateRange = d3.time.hours(d3.time.hour.floor(dateMinRange),d3.time.hour.ceil(dateMaxRange), nTimeGranularity);
//			break;
//		case 2: dateRange = d3.time.days(d3.time.day.floor(dateMinRange), d3.time.day.ceil(dateMaxRange), nTimeGranularity);
//			break;
//		case 3: dateRange = d3.time.weeks(d3.time.week.floor(dateMinRange),d3.time.week.ceil(dateMaxRange), nTimeGranularity);
//			break;
//		case 4: dateRange = d3.time.months(d3.time.month.floor(dateMinRange),d3.time.month.ceil(dateMaxRange), nTimeGranularity);
//			break;
//		case 5: dateRange = d3.time.years(d3.time.year.floor(dateMinRange),d3.time.year.ceil(dateMaxRange), nTimeGranularity);
//			break;
//	}
//
//	// rangeData[0]: R0: numRange:4, R1: numRange:16, R2: numRange:16,R4:numRange:16
//	// preProcessing is a function to divide a data by range de time and range of R0, R1, R3, R4
//	// Calcule with rangeData[0] because is the range R0 with 4 range to divideand it is a Contexte
//	// var dataPreProcessing = preProcessing(dataset, dateRange,rangeData[0].numRange);
//	var dataPreProcessing = preProcessing(dataset, dateRange, ranges, 1); // nivel-1 for Context
//	var dataProcessing = stack(nest.entries(dataPreProcessing)); //data stacked
//	
//	// ANIMATION
//	var transition;
//	if (animation) {
//		transition = nTimeTransitionAnimation
//	} else {
//		transition = opts.durationTransition
//	}
//	
//	/* CONTEXT */
//	
//	
////	context.selectAll(".area").data(dataProcessing)
////	.transition()
////	.duration(1000)
////	.ease(opts.ease)
////	.attr("d", function(d) {return areaContext(d.values);});
//
//	
////	var areaContextTransition = svg.select(".context").transition();
////	areaContextTransition.select(".x.axis")
////						.duration(1000)
////						.ease(opts.ease)
////						.call(xAxisContext);
//
////	d3.select("#nTimeGranularity-text").text(nTimeGranularity);
////	d3.select("#nTimeGranularity-value").property("value", nTimeGranularity);
//
//	return dataProcessing;
//}

