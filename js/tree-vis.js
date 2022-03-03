var treeHeight 

var opts_tree = {
	hDepth : 90,
	wraps : 45,
	transition_links_duration : 500,
	strokeWidthNodeSelected : 2.3,
	strokeWidthNodeDeselected : 1
}


var margin = {top: 0, right: 120, bottom: 50, left: 60},
    width = 560 - margin.right - margin.left;

var tree = d3.layout.tree();
					// .size([height, width]);

var diagonal = d3.svg.diagonal()
					.projection(function(d) { return [d.y, d.x]; });

var i = 0;
var root;
var svg_tree_vis;
var tooltip_tree;
var nodes;
var node_radius = 10;
var links;
var linkNivelTop=[];
var linkNivelBottom=[];




function loadTreeVis(){

	height = (treeHeight + 50) - margin.top - margin.bottom;
	
	svg_tree_vis = d3.select("body").select("#tree-vis")
						.attr("width", width + margin.right + margin.left)
						.attr("height", height + margin.top + margin.bottom)
					.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
						;
					

	root = hierarchy; //hierarchy[0] => root
	root.x0 = 0;
	root.y0 = 0;

	update(root);
	tooltip_tree = d3.select("#cm-menu-content").append("div")
												.attr("id", "tooltip-tree")
	
	

}

//d3.select(self.frameElement).style("height", "800px");

function zoom() {
    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function getBrowser() {
	  if( navigator.userAgent.indexOf("Chrome") != -1 ) {
	    return "Chrome";
	  } else if( navigator.userAgent.indexOf("Opera") != -1 ) {
	    return "Opera";
	  } else if( navigator.userAgent.indexOf("MSIE") != -1 ) {
	    return "IE";
	  } else if( navigator.userAgent.indexOf("Firefox") != -1 ) {
	    return "Firefox";
	  } else {
	    return "unknown";
	  }
	}

function update(source) {

  // Compute the new tree layout.
  nodes = hierarchy; // tree.nodes(root);
  links = tree.links(nodes);
  
  d3.select("#tree-vis").on("mousemove",function(d,i){
	  
		var mouse_coordinates = d3.mouse(this);
		
		//TO FIX BUG DE FIREFOX
		var browser = getBrowser();
		if(browser == "Firefox"){
			mouse_coordinates[0] = mouse_coordinates[0] - 562;
		}
		//
		
		var mouse_x = mouse_coordinates[0] - margin.left; 
		var mouse_y = mouse_coordinates[1] + margin.top;
		
		var node_over_mouse = getNodeOverMouse(mouse_x, mouse_y);
		
		if(node_over_mouse!=null && node_over_mouse.level != "" && node_over_mouse.visible){
			ratonOver(node_over_mouse);
			ratonOverTree(node_over_mouse);
			
			var node_key = node_over_mouse.key;
			
			var btnUpHierarchy = "<button id=" + node_key
					+ " class='btnUpHierarchy' onclick='upInTheHierarchy(this)'></button>";
			var btnDownHierarchy = "<button id=" + node_key
					+ " class='btnDownHierarchy' onclick='downInTheHierarchy(this)'></button>";
			
			var btn_contents = "";
			
			var father_disponible =  getFatherDisponible(node_key);
			var children_disponible = getChildrenDisponible(node_key);
			
			if(father_disponible!=null){
				btn_contents += btnUpHierarchy;
			}
			if(children_disponible!=null){
				btn_contents += btnDownHierarchy;
			}
			if(father_disponible!=null || children_disponible!=null){
				showTooltipTree(node_over_mouse, btn_contents);
			}
		}else{
			nodeOut();
		}
  });

  
  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * opts_tree.hDepth;  });

  // Update the nodes…
  var node = svg_tree_vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });
  
  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
					.attr("id",function(d){return d.key;})
					.attr("class", "node")
					.attr("transform", function(d) {  return "translate(" + source.y0 + "," + source.x0 + ")"; });
  
  nodeEnter.append("circle")
			      .attr("r",node_radius)
			      .on("click", nodeClick)
			      .on("mouseover", function(d){
			    	  nodeOver(this,d);
			      })
			      .style({
			    	  "fill": function(d) { return d.visible ? d.color : "white";},
			    	  "stroke": "grey",
			    	  "stroke-width": opts_tree.strokeWidthNodeDeselected
			      });

  nodeEnter.append("text")
		      .attr("x", function(d) { return d.children || d._children ? -15 : 15; })
		      .attr("dy", ".35em")
		      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
		      .text(function (d) { return d.name;})
		      .call(wrap, 50)
		      .style("fill-opacity", 1);
  
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
			      .duration(opts_tree.transition_links_duration)
			      .attr("transform", function(d) {
			    	  return "translate(" + d.y + "," + d.x + ")"; 
			    	  });
//  					.attr("transform", function(d) {return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
		      .attr("r", node_radius)
		      .style({
		    	  "fill": function(d) { return d.visible ? d.color : "white";},
		    	  "stroke": "grey",
		    	  "stroke-width": opts_tree.strokeWidthNodeDeselected
		      });

  
  nodeUpdate.select("text")
      		.style("fill-opacity", 1);
  
  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(opts_tree.transition_links_duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg_tree_vis.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(opts_tree.transition_links_duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(opts_tree.transition_links_duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y
		};
		return diagonal({
			source : o,
			target : o
		});
	}).remove();

	// Stash the old positions for transition.
	nodes.forEach(function(d) {
		d.x0 = d.x;
		d.y0 = d.y;
	});
	
	
  // Adding Top and Bottom line Hierarchy
  lineTopAndBottomHierarchy(links);
}

function nodeOver(t, d){
	var k = d3.select(t);
	if(d.level == ""){
		k.style("cursor", "default")
	}else{
		k.style("cursor", "pointer")
	}
}

function nodeOut(){
	ratonOut();
	ratonOutTree();
	tooltip_tree.html("").style({"opacity":0});
}

function fillTopBottomArray(links){
	var nivelTop = [];
	var nivelBottom = [];
	
	links.forEach(function(element){
		var source = element.source;
		var target = element.target;

		// top
		if(source.level == "top"){
			var contains = nivelTop.find( function( ele ) { 
			    return ele.key == source.key;
			} );
			if(!contains){
				nivelTop.push({
					"depth" : source.depth,
					"key" : source.key,
					"name" : source.name,
					"level" : source.level,
					"x" : source.x,
					"y" : source.y,
					"visible" : source.visible
				})	
			}
		}
		
		//bottom
		if(target.level == "bottom"){
			var contains = nivelBottom.find( function( ele ) { 
			    return ele.key == source.key;
			} );
			if(!contains){
				nivelBottom.push({
					"depth" : target.depth,
					"key" : target.key,
					"name" : target.name,
					"level" : target.level,
					"x" : target.x,
					"y" : target.y,
					"visible" : target.visible
				})	
			}
		}
	})
	
	nivelBottom.sort(function (a, b) {
		  if (a.x > b.x) {
			    return 1;
			  }
			  if (a.x < b.x) {
			    return -1;
			  }
			  return 0;
			});
	
	
	linkNivelTop=[];
	linkNivelBottom=[];
	
	for(var i = 0; i < nivelTop.length-1; i++){
		var s = nivelTop[i];
		var t = nivelTop[(i+1)];
		linkNivelTop.push({
					"key":t.key,
					"x1":s.x,
					"y1":s.y,
					"x2":t.x,
					"y2":t.y
				})
	}
	
	for(var i = 0; i < nivelBottom.length-1; i++){
		var s = nivelBottom[i];
		var t = nivelBottom[(i+1)];
		
		linkNivelBottom.push({
					"key":t.key,
					"x1":s.x,
					"y1":s.y,
					"x2":t.x,
					"y2":t.y
				})
	}
	
}

function lineTopAndBottomHierarchy(links){
	
	fillTopBottomArray(links);

	var topH;
	if(linkNivelTop.length == 0){
		//its root level
		var hierarchy_node = getNodeByKey(root_key);
		var x1 = hierarchy_node.x - (3*node_radius);
		var y1 = hierarchy_node.y;
		var x2 = hierarchy_node.x + (3*node_radius) ;
		var y2 = hierarchy_node.y;
		var nivel_root = [{"key":root_key,"x1":x1,"y1":y1,"x2":x2,"y2":y2}];
		topH = svg_tree_vis.selectAll(".lineTopHierarchy").data(nivel_root,function(d) { return d.key; });
	}else{
		topH = svg_tree_vis.selectAll(".lineTopHierarchy").data(linkNivelTop,function(d) { return d.key; });
	}	
		
	//update
	topH.transition(t)
					.duration(opts.durationTransition)
						.attr("x1", function(d){return d.y1;})
			            .attr("y1", function(d){return d.x1;})
			            .attr("x2", function(d){return d.y2;})
			            .attr("y2", function(d){return d.x2;});
	//create
	topH.enter().append("line")
				.style("opacity",0)
			.transition(t)
			.duration(opts.durationTransition)
				.attr("class","lineTopHierarchy")
				.attr("x1", function(d){return d.y1;})
	            .attr("y1", function(d){return d.x1;})
	            .attr("x2", function(d){return d.y2;})
	            .attr("y2", function(d){return d.x2;})
	            .style({
						"opacity" : 1,
					});	
	//exit
	topH.exit().transition(t)
				.duration(opts.durationTransition)
					.style("opacity", 0)
					.remove();
	
	
	var bottomH = svg_tree_vis.selectAll(".lineBottomHierarchy").data(linkNivelBottom,function(d) { return d.key; });
	
	//update
	bottomH.transition(t)
					.duration(opts.durationTransition)
						.attr("x1", function(d){return d.y1;})
				        .attr("y1", function(d){return d.x1;})
				        .attr("x2", function(d){return d.y2;})
				        .attr("y2", function(d){return d.x2;});
	
	//enter
	bottomH.enter().append("line")
				.style("opacity",0)
			.transition(t)
			.duration(opts.durationTransition)
				.attr("class","lineBottomHierarchy")
				.attr("x1", function(d){return d.y1;})
		        .attr("y1", function(d){return d.x1;})
		        .attr("x2", function(d){return d.y2;})
		        .attr("y2", function(d){return d.x2;})
		        .style({
						"opacity" : 1,
					});	
	//exit
	bottomH.exit().transition(t)
			.duration(opts.durationTransition)
				.style("opacity", 0)
				.remove();
}

function showTooltipTree(node, btn_contents) {
	tooltip_tree.html(btn_contents)
				.style({
					"opacity" : 1,
					"left" : (node.y + margin.left + node_radius) + "px",
					"top" :  (node.x - node_radius) + "px"
				});
}

var listNodeBottomToMove = [];
var listNodeTopToMove = [];

function upInTheHierarchy(element) {

	var hierarchy_node = getNodeByKey(element.id);
	var father_node = hierarchy_node.parent;
	
	if(hierarchy_node.level == "bottom"){
		listNodeBottomToMove = [];
		father_node.children.forEach(getAllChildrenInBottom);
	}

	if(hierarchy_node.level == "top"){
		listNodeTopToMove = [];
		father_node.children.forEach(getAllChildrenInTop);
	}
	
	father_node.level = hierarchy_node.level;
	father_node.visible = true;
	
	if(hierarchy_node.level == "bottom"){
		listNodeBottomToMove.forEach(function(child){
			child.level = "";
			child.visible = false;
		})
	}

	if(hierarchy_node.level == "top"){
		listNodeTopToMove.forEach(function(child){
			child.level = "";
			child.visible = false;
		})
	}
	
	callUpdate();
}

function getAllChildrenInBottom(node){
//	var index_node = key_bottom_list.indexOf(node.key);
//	if(index_node != -1){
		var hierarchy_node = getNodeByKey(node.key)
		if(hierarchy_node.level == "bottom")
			listNodeBottomToMove.push(hierarchy_node);
//	}
	if(node.children){
		node.children.forEach(getAllChildrenInBottom);
	}
}

function getAllChildrenInTop(node){
//	var index_node = key_top_list.indexOf(node.key);
//	if(index_node != -1){
		var hierarchy_node = getNodeByKey(node.key)
		if(hierarchy_node.level == "top")
			listNodeTopToMove.push(hierarchy_node);
//	}
	if(node.children){
		node.children.forEach(getAllChildrenInTop);
	}
}

function downInTheHierarchy(element){

	var hierarchy_node = getNodeByKey(element.id);
	
	hierarchy_node.children.forEach(function(child){
		child.level = hierarchy_node.level;
		child.visible = true;
	})
	
	hierarchy_node.level = "";
	hierarchy_node.visible = false;

	callUpdate();
}

//Toggle children on click.
function nodeClick(d) {
	
	var level = d.level;
	
	switch (d.level) {
	case "bottom":
			changeNodeVisibility(d.key);
			if(getVisibleBottomLevelNodes().length==0){
				changeNodeVisibility(d.key);
			}
			callUpdate();
			break;
	case "top":
		if(d.depth !=0){//it is not root node
			changeNodeVisibilityRecursive(d.key, !d.visible);
			if(getVisibleTopLevelNodes().length==0){
				changeNodeVisibilityRecursive(d.key, true);
			}
			callUpdate();
		}
		break;
	}
	
}

function callUpdate(){
	
	key_bottom_list = getVisibleBottomLevelNodes();
	key_bottom_list.reverse(); 
	hijos(key_bottom_list);
	
	key_top_list =  getVisibleTopLevelNodes();
	key_top_list.reverse();
	papas(key_top_list);
	
	createGradientArrays(key_bottom_list);
	
	updateFlows();
	
	lineTopAndBottomHierarchy(links);
	
	svg_tree_vis.selectAll("circle")
		.data(hierarchy)
		.style({
//			"fill":function(d){return d.visible ? d.color : "white";},
			"fill":function(d){
						var nodeColor;
						if(opts.fadingColors && d.level == "top"){
							nodeColor = chroma(d.color).desaturate().brighten(opts.fadingColorsFactor);
						}else{
							nodeColor = d.color;
						}
						return d.visible ? nodeColor : "white";
					},
			"stroke":function(d){return d.visible ? d.color : "grey";},
		});

	
	nodeOut();
}


function ratonOverTree(d){
	var selectedNode = d; //get d selectione for use later in transition
	
	svg_tree_vis.selectAll("circle")
		.transition()
		.duration(10)
			.style({
					"stroke":function(d){
						return (selectedNode.key == d.key || selectedNode.key == getFatherKey(d.key) && d.level != ""  ) ? "black" : "grey";
					},
					"stroke-width":function(d){
						return (selectedNode.key == d.key || selectedNode.key == getFatherKey(d.key) && d.level != ""  ) ? opts_tree.strokeWidthNodeSelected : opts_tree.strokeWidthNodeDeselected;
					}
				})
}

function ratonOutTree(){
	svg_tree_vis.selectAll("circle")
				.transition()
				.duration(10)
					.style({
						"stroke":"grey",
						"stroke-width":opts_tree.strokeWidthNodeDeselected
					})
}


function treeVisMove(){
	
	
	var mouse_coordinates = d3.mouse(this);
	
	console.log(mouse_coordinates);
	
	var mouse_x = mouse_coordinates[0] - margin.left; 
	var mouse_y = mouse_coordinates[1] + margin.top;
	
	//console.log("x ",mouse_x," y",mouse_y);
	var node_over_mouse = getNodeOverMouse(mouse_x, mouse_y);
	
	if(node_over_mouse!=null && node_over_mouse.level != "" && node_over_mouse.visible){
		ratonOver(node_over_mouse);
		ratonOverTree(node_over_mouse);
		
		var node_key = node_over_mouse.key;
		
		var btnUpHierarchy = "<button id=" + node_key
				+ " class='btnUpHierarchy' onclick='upInTheHierarchy(this)'></button>";
		var btnDownHierarchy = "<button id=" + node_key
				+ " class='btnDownHierarchy' onclick='downInTheHierarchy(this)'></button>";
		
		var btn_contents = "";
		
		var father_disponible =  getFatherDisponible(node_key);
		var children_disponible = getChildrenDisponible(node_key);
		
		if(father_disponible!=null){
			btn_contents += btnUpHierarchy;
		}
		if(children_disponible!=null){
			btn_contents += btnDownHierarchy;
		}
		if(father_disponible!=null || children_disponible!=null){
			showTooltipTree(node_over_mouse, btn_contents);
		}
	}else{
		nodeOut();
	}
}

function getNodeOverMouse(mouse_x, mouse_y){
	var length_limit = 40;
	for(var i = 0; i < hierarchy.length;i++){
		var node = hierarchy[i];
		var a = (node.y-mouse_x);
		var b = (node.x-mouse_y);
		var dist = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
		if((dist <= node_radius) || (((mouse_x - node.y) <= (length_limit)) && (mouse_x >= node.y) && ((mouse_y - node.x) <= node_radius) && (mouse_y >= (node.x - node_radius)) )){
			return node;
		}
	}
}

function wrap(text, width) {
    text.each(function (element) {
    	if(element.depth <= 1){//just for root and depth 1
    		var text = d3.select(this),
    		words = text.text().split(/\s+/).reverse(),
    		word,
    		line = [],
    		lineNumber = 0,
    		lineHeight = 1.1, // ems
    		x = text.attr('x'),
    		y = text.attr('y'),
    		dy = 0, //parseFloat(text.attr('dy')),
    		tspan = text.text(null)
    		.append('tspan')
    		.attr('x', x)
    		.attr('y', y)
    		.attr('dy', dy + 'em');
    		while (word = words.pop()) {
    			line.push(word);
    			tspan.text(line.join(' '));
    			if (tspan.node().getComputedTextLength() > width) {
    				line.pop();
    				tspan.text(line.join(' '));
    				line = [word];
    				tspan = text.append('tspan')
    				.attr('x', x)
    				.attr('y', y)
    				.attr('dy', lineHeight + dy + 'em')
    				.text(word);
    			}
    		}
    	}
    });
}