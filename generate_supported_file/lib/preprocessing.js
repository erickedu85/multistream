let d3 = require('d3'); //npm install d3@3.5.17
let chroma = require('chroma-js'); //npm install chorma-js
const jerarquia = require('./jerarquia');

function getPreproData (rawDataHierarchy,rawData,color_palette){

	jerarquia.setColors(color_palette)
	let hierarchy = jerarquia.getHierarchy(rawDataHierarchy);
	
	// get the list of dates
	let dates = rawData.map(d=>{
		return d['date']
	});
	
	let leaf_level = [];

	rawData.forEach(d=>{
		// slice the keys (except the date index 0)
		keys = Object.keys(d).slice(1)

		keys.forEach(k=>{
			try{
				node = jerarquia.getNodeByName(k,hierarchy)
				leaf_level.push(
					{
						'date':d['date'],
						'name':k,
						'value':+d[k],
						'key': node.key
					}
				)
			} catch(error){
				console.error("Error in: ", k)
			};
		});
	});

	// BUILDING leaf_level for superior levels
	hierarchy.forEach(function(node){
		if(node.children){

			dates.forEach(d=>{
				
				children = node.children.map(c=>{
					return c['key']
				})
				
				// this is the sum
				let filtrado_child_by_date = leaf_level.filter(f=>f['date'] === d && children.includes(f['key']))
				let sumGroup = filtrado_child_by_date.reduce(function(acc,curr){
					return +(acc + curr.value).toFixed(2);
				},0);

				leaf_level.push(
					{
						'date':d,
						'name':node['name'],
						'value':sumGroup,
						'key': node.key
					}
				)
			})	

			if(!node.color){
				if(node.children.length == 1){
					node.color = node.children[0].color;
				}else{
					for(var i=0;i<node.children.length-1;i++){
						node.color = chroma.blend(node.children[i].color, node.children[(i+1)].color, 'darken').hex();	
					}
				}
			}
		}
    });


	//parser attributs
	return leaf_level.map(d=>{
		let dt = new Date(d['date'])
		return {
			'date_time':dt,
			'category':d['name'],
			'value':d['value'],
			'key':d['key']
		}
	})

}

module.exports.getPreproData = getPreproData;
