const d3 = require('d3'); //npm install d3@3.5.17
const chroma = require('chroma-js'); //npm install chorma-js

var colores_d3 =  d3.scale.category10(); 

var tree =  d3.layout.tree();
var hierarchy = [];
var color_range_children = [];
var num_leaf_children;
var num_initial_color;
var color_begin_range = "white";

function setNumChildrenLeaf(d){
	if(d.children){
		d.children.forEach(setNumChildrenLeaf);
	}else{
		num_leaf_children ++;
	}
}


function addingKeyColor(d,index){
	
	d.name = d.name.toLowerCase();
	d.key =  d.parent.key + "_" + index;
	
	let child_index;
	if(d.depth == 1){
		// num_initial_color < 5 ? color_root = colores_d3(index) : color_root = colores_brewer(index);
		color_root = colores(index);
		if(!d.color)
		d.color = chroma(color_root).desaturate().brighten(0.4).hex();
		num_leaf_children = 0;
		child_index = 0;
		setNumChildrenLeaf(d);

		let color_finish_range = chroma(color_root).saturate().darken();

		if(num_leaf_children>10){
			num_leaf_children = num_leaf_children+3;
		}else{
			num_leaf_children = num_leaf_children+1;
		}
		color_range_children =  chroma.scale([color_begin_range,color_finish_range]).colors(num_leaf_children);
		
	}
	if(d.children){
	    d.children.forEach(addingKeyColor,index);
	}else{
		child_index = --num_leaf_children;
		if(!d.color)
		d.color = color_range_children[child_index];
		d.visible = true;

		if(!d.img)
		d.img = "";
	}
}

function getHierarchy (rawDataHierarchy){

	hierarchy = tree.nodes(rawDataHierarchy).reverse();
	// hierarchy = tree.nodes(rawDataHierarchy);

	num_initial_color = getNodesByDepth(1,hierarchy).length;

	//ROOT NODE
	let root_node = hierarchy[hierarchy.length-1];
	// let root_node = hierarchy[0];
	// console.log(root_node.name)
	root_node.key = "R0";
	if(!root_node.color)
	root_node.color = "#a65628";

	//For each element
	// root_node.children.reverse().forEach(addingKeyColor); 
	root_node.children.forEach(addingKeyColor); 

    return hierarchy;
}


//DEALING WITH AN HIERARCHY
function getNodesByDepth(depth, hierarchy){
	var nodes_by_depth = [];
	hierarchy.forEach(function(node){
		if(node.depth == depth){
			nodes_by_depth.push(node.key);
		}
	})
	return nodes_by_depth;
}

function getNodeByName(node_name, hierarchy){
	let index = hierarchy.map(d=>d.name.toLowerCase()).indexOf(node_name.toLowerCase());
	if(index!=-1){
		return hierarchy[index];
	}else{
		return null;
	}
}

function getLeafNodes(hierarchy){
	let leaf_node = [];
	hierarchy.forEach(function(node){
		if(!node.children && node.visible == true){
			leaf_node.push(node);
		}
	})
	return leaf_node;
}

var colors
function setColors(arr){
	colors = arr
}

function colores(n){
	return colors[n % colors.length];
}

module.exports.getHierarchy = getHierarchy;
module.exports.getLeafNodes = getLeafNodes;
module.exports.getNodeByName = getNodeByName;
module.exports.setColors = setColors;
