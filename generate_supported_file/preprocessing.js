const preprocessing = require('./lib/preprocessing');
const jsonfiles = require('./lib/dealFiles');
const minimist = require('minimist')

var arguments = minimist(process.argv.slice(2));
var argumentsKeys = Object.keys(arguments).slice(1)

if (argumentsKeys.includes('raw') 
    & argumentsKeys.includes('hierarchy') 
    &  argumentsKeys.includes('output') 
    & argumentsKeys.includes('granularity')
    & argumentsKeys.includes('step')
    ){

    let inputRawData = arguments["raw"] //time series data csv file
    let inputRawHierarchy = arguments["hierarchy"] //hierarchy structure json file
    let outputPreprocessedFile = arguments["output"] //outputfile json 
    let t_granularity = arguments["granularity"] //time series granularity: minutes, hours, days, weeks, months, years
    let t_step = arguments["step"] //time step between each observation. E.g., if "granularity"="minutes" and "step"=5, then it means that the time series is every five minutes. Most of the time step=1

    let outputType = "" //data type
    if ('datatype' in arguments){ 
        outputType = arguments["datatype"]
    } 

    callPreprocessing(inputRawData,inputRawHierarchy,outputPreprocessedFile,outputType, t_granularity, t_step)

}else{
    console.error('Check the arguments:');
    console.error('--raw = input CSV file (raw data)');
    console.error('--hierarchy = input JSON file (hierarchy structure)');
    console.error('--output = output JSON file');
    console.error('--granularity = time series granularity. E.g., "minutes" or "hours" or "days" or "weeks" or "months" or "years"');
    console.error('--step = time step between each observation. E.g., if "granularity"="minutes" and "step"=5, then it means that the time series is every five minutes. Most of the time step=1');
    console.error('OPTIONAL --datatype = "data type"\n');
    console.error("Example:");
    console.error("$node preprocessing.js --raw=input/data.csv --hierarchy=input/hierarchy.json --output=data.json --granularity='years' --step=1 --datatype='number of bands'\n");
    process.exit(1)
}

function callPreprocessing(pathRawData,pathRawHierarchy,pathRawOutpuJsonFile,dataType, t_granularity, t_step){

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
        'type':dataType,
        "t_granularity":t_granularity,
        "t_step":t_step
    }

    jsonfiles.saveCircularObjToJsonFile(pathRawOutpuJsonFile,all);
    console.log('Finished!')
}

