const preprocessing = require('./lib/preprocessing');
const jsonfiles = require('./lib/dealFiles');
const minimist = require('minimist')

var arguments = minimist(process.argv.slice(2));

if ('raw' in arguments & 'hierarchy' in arguments & 'output' in arguments){

    let inputRawData = arguments["raw"] //time series data csv file
    let inputRawHierarchy = arguments["hierarchy"] //hierarchy structure json file
    let outputPreprocessedFile = arguments["output"] //outputfile json 
    let outputType = "" //data type
    if ('datatype' in arguments){ 
        outputType = arguments["datatype"]
    } 

    callPreprocessing(inputRawData,inputRawHierarchy,outputPreprocessedFile,outputType)

}else{
    console.error('Check the arguments:');
    console.error('--raw = input CSV file (raw data)');
    console.error('--hierarchy = input JSON file (hierarchy structure)');
    console.error('--output = output JSON file');
    console.error('OPTIONAL --datatype = "data type"\n');
    console.error("Example:");
    console.error("$node preprocessing.js --raw=input/data.csv --hierarchy=input/hierarchy.json --output=data.json --datatype='number of bands'\n");
    process.exit(1)
}

function callPreprocessing(pathRawData,pathRawHierarchy,pathRawOutpuJsonFile,dataType){

    let ranges = jsonfiles.getJsonFromFile(pathRawHierarchy).ranges;
    let raw = jsonfiles.getCsvFromFile(pathRawData);
   
    let color_palette = [
		"#2ca02c" 
        ,"#ff7f0e" 
        ,"#9467bd"
        ,"#ffff33" 
        ,"#1f77b4" 
        ,"#d62728" 	
		,"#7F7F7F"
		,"#8c564b"
		,"#9467BD"
		,"#17BECE"
		,"#BCBD22"
    ]
	
    let dataPreprocessing = preprocessing.getPreproData(ranges, raw, color_palette);

    let all = {
        'ranges':ranges,
        'data':dataPreprocessing,
        'type':dataType
    }

    jsonfiles.saveCircularObjToJsonFile(pathRawOutpuJsonFile,all);
    console.log('Finished!')
}

