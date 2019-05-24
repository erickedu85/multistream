
function getChildrenDisponible(node_key){
	var children_disponibles = [];
	var hierarchy_node = getNodeByKey(node_key);
	if(hierarchy_node.children){
		for(var i=0; i<hierarchy_node.children.length;i++){
			var child = hierarchy_node.children[i];
			var index_child = key_bottom_list.indexOf(child.key);
			if(index_child == -1 && child.level == ""){
				children_disponibles.push(child);
			}else{
				return null;
			}
		}
	}else{
		return null;
	}
	return children_disponibles;
}

function getFatherDisponible(node_key){
	var hierarchy_node = getNodeByKey(node_key);
	var parent = hierarchy_node.parent;
	if(parent){
		var index_parent = key_top_list.indexOf(parent.key);
		if(index_parent == -1){
			return parent;
		}else{
			return null;
		}
	}else{
		return null;
	}
}


function hijos(bottom_nodes){
	bottom_nodes.reverse();
	nivel_bajo = [];
	bottom_nodes.forEach(function(bottom_node){
		
		var ds_child = leaf_level.filter(function(leaf){
			return leaf.key == bottom_node;
		})
		nivel_bajo = nivel_bajo.concat(ds_child);
		
//		var hierarchy_node = getNodeByKey(bottom_node);
//		if(hierarchy_node.children){
//			children_visible_list = [];
//			fillChildrenVisibleList(hierarchy_node);
////			var fusion = mergingChildren(bottom_node, children_visible_list);
//			var fusion = mergingChildrenHijo(hierarchy_node, children_visible_list);
//			nivel_bajo = nivel_bajo.concat(fusion);
//		}else{
//			var ff = getChild(hierarchy_node);
//			nivel_bajo = nivel_bajo.concat(ff);
//		}
	})
}

function fillChildrenVisibleList(node){
	if(node.children){
		node.children.forEach(fillChildrenVisibleList);
	}else {
		children_visible_list.push({
			"key":node.key,
			"name":node.name,
		});
	}
}

function fillChildrenBottomList(node){
	//tomar los hijos que estan en el array de bottom list
	if(node.level == "bottom" && node.visible){
		children_bottom_list.push({
			"key":node.key,
			"name":node.name,
		});
	}
	if(node.children){
		node.children.forEach(fillChildrenBottomList);
	}
}

function getVisibleLeafNodes(){
	var leaf_visible = [];
	hierarchy.forEach(function(node){
		if(!node.children && node.visible == true){
			leaf_visible.push(node.key);
		}
	})
	return leaf_visible;
}

function getNodesByDepth(depth){
	var nodes_by_depth = [];
	hierarchy.forEach(function(node){
		if(node.depth == depth){
			nodes_by_depth.push(node.key);
		}
	})
	return nodes_by_depth;
}


function setVisibleNodes(arreglo){
	arreglo.forEach(function(node_key){
		var hierarchy_node = getNodeByKey(node_key);
		hierarchy_node.visible = true;
	})
}

function setBottomNodes(arreglo){
	key_bottom_list = [];
	arreglo.forEach(function(bottom_node){
		key_bottom_list.push(bottom_node);
		var hierarchy_node = getNodeByKey(bottom_node);
		hierarchy_node.level = "bottom";
	});
}

function setEmptyLevelNode(node_key){
	var hierarchy_node = getNodeByKey(node_key);
	hierarchy_node.level = "";
}


function getVisibleBottomLevelNodes(){
	var result = [];
	hierarchy.forEach(function(node){
		if(node.level == "bottom" && node.visible){
			result.push(node.key);
		}
	});
	return result;
}

function getVisibleTopLevelNodes(){
	var result = [];
	hierarchy.forEach(function(node){
		if(node.level == "top" && node.visible){
			result.push(node.key);
		}
	});
	return result;
}


function setTopNodes(arreglo){
	key_top_list = []
	arreglo.forEach(function(top_node){
		key_top_list.push(top_node);
		var hierarchy_node = getNodeByKey(top_node);
		hierarchy_node.level = "top";
	});
}

function voidHierarchyLevel(){
	hierarchy.forEach(function(node){
		node.level = "";
	})
}

function mergingChildrenHijo(father, children){
	var fusion = [];
	children.forEach(function(child){
		var ds_child = leaf_level.filter(function(leaf){
			return leaf.key == child.key;
		})
		//same taille between arrays
		
		var valor = 0;
		var texto = [];
		for(var i = 0; i < ds_child.length; i++) {
			if(!fusion[i]){
				valor = ds_child[i].value;
				texto = ds_child[i].text;
			}else{
				valor = fusion[i].value + ds_child[i].value;
				texto = fusion[i].text.concat(ds_child[i].text);
			}
			var fecha = ds_child[i].date;
			var obj = {key:father.key,name:father.name,date:fecha,value:valor,text:texto};
			fusion[i] = obj;
		}
	})
//	console.log("fusion",fusion);
	return fusion;
}

//function mergingColors(father, children){
////	var merge = chroma.blend(children[0].color, children[1].color, 'multiply');
//	var merge = chroma.blend("blue", "blue", 'multiply');
//	father.color = merge;
//}

function mergingChildren(father, children){
	var fusion = [];
	children.forEach(function(child){
		var ds_child = leaf_level.filter(function(leaf){
			return leaf.key == child.key;
		})
//		console.log(child.name,"",ds_child.length)
		//same taille between arrays
		var valor = 0;
		var texto = [];
		for(var i = 0; i < ds_child.length; i++) {
			if(!fusion[i]){
				valor = ds_child[i].value;
				texto = ds_child[i].text;
			}else{
				valor = fusion[i].value + ds_child[i].value;
				texto = fusion[i].text.concat(ds_child[i].text);
			}
			var fecha = ds_child[i].date;
			var obj = {key:father.key,name:father.name,date:fecha,value:valor,text:texto};
			fusion[i] = obj;
		}
	})
	return fusion;
}

function splitFather(father){
	var split = [];
	father.children.forEach(function(child){
		var ds_child = leaf_level.filter(function(leaf){
			return leaf.key == child.key;
		})
		split = split.concat(ds_child);
	})
	return split;
}


function getChild(child){
	var ds_child = leaf_level.filter(function(leaf){
		return leaf.key == child.key;
	})
	return ds_child; 
}

function papas(top_nodes){
	nivel_alto = [];
	top_nodes.reverse();
	top_nodes.forEach(function(top_node){
//		console.log("analizando",top_node)
		var hierarchy_node = getNodeByKey(top_node);
		if(hierarchy_node.children){
			children_bottom_list = [];
			fillChildrenBottomList(hierarchy_node);
			var fusion = mergingChildren(hierarchy_node, children_bottom_list);
			nivel_alto = nivel_alto.concat(fusion);
		}
		
		//--------
//		var ds_child = leaf_level.filter(function(leaf){
//			return leaf.key == top_node;
//		})
//		nivel_alto = nivel_alto.concat(ds_child);
		//----------
	});
}

function changeNodeVisibility(node_key){
	var hierarchy_node = getNodeByKey(node_key);
	hierarchy_node.visible = !hierarchy_node.visible;
}

function changeNodeVisibilityRecursive(node_key, isVisible){
	var hierarchy_node = getNodeByKey(node_key);
	changeNodeVisibility(node_key);
	
	if(isVisible){
		hierarchy_node.children.forEach(cambiarVisibilidadTrue);
	}else{
		hierarchy_node.children.forEach(cambiarVisibilidadFalse);
	}
}

function cambiarVisibilidadFalse(d){
	if(d.level == "bottom"){
		d.visible = false;
	}
	if (d.children){
		d.children.forEach(cambiarVisibilidadFalse);
	}
}

function cambiarVisibilidadTrue(d){
	if(d.level == "bottom"){
		d.visible = true;
	}
	if (d.children){
		d.children.forEach(cambiarVisibilidadTrue);
	}
}


function getLeafNodes(){
	var nodes_leaf = [];
	hierarchy.forEach(function(node){
		if(!node.children){
			nodes_leaf.push(node.key);
		}
	})
	return nodes_leaf;
}

function getNodeByKey(node_key){
	var index = hierarchy.map(function(o) { return o.key; }).indexOf(node_key);
	return hierarchy[index];
}

function getNodeByName(node_name){
	var index = hierarchy.map(function(o) { return o.name; }).indexOf(node_name.toLowerCase());
	if(index!=-1){
		return hierarchy[index];
	}else{
		return null;
	}
}
