var parseDate = d3.time.format("%d/%m/%Y %H:%M:%S").parse;
var dataset;
var dataset_nested = [];
var hierarchy;
var root_key = "R0";
var root_color = "#a65628";
var data_type = "";
var nest_by_name = d3.nest().key(function(d) {return d.value}); //d[1] Group by key
var colores_d3 =  d3.scale.category10();

var customTimeFormat = d3.time.format.multi([ 
                 		                    [ ".%L", function(d) {return d.getMilliseconds();} ],
                 							[ ":%S", function(d) {return d.getSeconds();} ],
                 							[ "%H:%M", function(d) {return d.getMinutes();} ],
                 							[ "%H:%M", function(d) {return d.getHours();} ],
//                 						    [ "%I:%M", function(d) { return d.getMinutes(); }],
//                 						    [ "%I %p", function(d) { return d.getHours(); }],
                 							[ "%a:%d", function(d) {return d.getDay() && d.getDate() != 1;} ],
                 							[ "%b:%d", function(d) {return d.getDate() != 1;} ], 
                 							[ "%B", function(d) {return d.getMonth();} ], 
                 							[ "%Y", function(d) {return d.getYear();} ] 
                 	                    ]);


var color_begin_range = "white";
var color_range_children;
var num_leaf_children;
var child_index;

function setNumChildrenLeaf(d){
	if(d.children){
		d.children.forEach(setNumChildrenLeaf);
	}else{
		num_leaf_children ++;
	}
}

var num_initial_color;
function addingKey(d,index){
//	console.log(d.name)
	d.name = d.name.toLowerCase()
	d.key =  d.parent.key + "_" + index;
	
	if(d.depth == 1){
		num_initial_color < 5 ? color_root = colores_d3(index) : color_root = colores_brewer(index);
		//color_root = colores_d3(index);
//		d.color = chroma(color_root).desaturate().brighten(1.2);
		d.color = chroma(color_root).desaturate().brighten(0.4);
		
		num_leaf_children = 0;
		child_index = 0;
		setNumChildrenLeaf(d);
		
//		console.log("for ",d.name,"leaf:",num_leaf_children)
		var color_finish_range = chroma(color_root).saturate().darken();
//		var color_finish_range = d.color.saturate().darken();

		if(num_leaf_children>10){
			num_leaf_children = num_leaf_children+3;
		}else{
			num_leaf_children = num_leaf_children+1;
		}
		color_range_children =  chroma.scale([color_begin_range,color_finish_range]).colors(num_leaf_children);
	}
	if(d.children){
		numberChild = d.children.length;
		//d.children.reverse()
	    d.children.forEach(addingKey,index);
	}else{
		var child_index = --num_leaf_children;
		d.color = color_range_children[child_index];
		d.visible = true;
	}
}

$(document).ready(function() {
	dataset = jsonArray.data.map(function(d, i) {
//		console.log(d.text); 
		return {"date":parseDate(d.date_time), "value": d.value, "text":d.text };
//		return {"date":parseDate(d.date_time), "value": d.value };
	});
	
//	console.log("finish parse date")
	
	dataset_nested = nest_by_name.entries(dataset);
	//sort the dataset_nested by Date
	dataset_nested.forEach(function(leaf_node){
		leaf_node.values.sort(function (a, b) {
					  if (a.date > b.date) {
						    return 1;
						  }
					  if (a.date < b.date) {
					    return -1;
					  }
					  return 0;
				});
	})
	
//	console.log("finish nested function")
//	console.log(dataset_nested);
	
	data_type = jsonArray.type;
	
	console.log(jsonArray.ranges)
	
	//tree.nodes add: children, depth, name, x, y
	hierarchy = tree.nodes(jsonArray.ranges).reverse();//array of objects
	hierarchy[hierarchy.length-1].key = root_key;
	hierarchy[hierarchy.length-1].color = root_color;
	num_initial_color = getNodesByDepth(1).length;
	hierarchy[hierarchy.length-1].children.reverse().forEach(addingKey);//reverse() start from root to down
	
//	hierarchy[0].key = root_key;
//	hierarchy[0].color = root_color;
//	hierarchy[0].children.forEach(addingKey);//reverse() start from root to down
	//hierarchy[0].children.forEach(addingKey);//As [0] contains all structure

	//Loading VIS
	loadMultiresolutionVis();
//	console.log("finish load multiresolution view")
	loadTreeVis();
//	console.log("finish loadtree view")
	
	//
	document.getElementById("loader").style.display = "none";
//	document.getElementById("cm-menu").style.display = "inherit";
	document.getElementById("cm-header").style.display = "block";
	document.getElementById("global").style.display = "block";
	
	
	
});


function colores_brewer(n){
	var colors = [
		             "#e41a1c" //red
					,"#377eb8" //blue
					,"#ffff33" //jaune
					,"#984ea3" //purple
					,"#ff7f00" //orange
					,"#4daf4a" //green
					,"#a65628"
					,"#f781bf"
				]
	
	return colors[n % colors.length];
}

function colores_google(n) {
  var colores_g = ["#990099", "#dc3912", "#ff9900", "#109618", "#3366cc", "#0099c6", "#dd4477", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}

