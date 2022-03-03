const fs = require('fs');
const d3 = require('d3'); //npm install d3@3.5.17

function getJsonFromFile(pathJsonFile){
    let raw = loadFile(pathJsonFile);
    return JSON.parse(raw);
}

function loadFile(pathFile){
    return fs.readFileSync(pathFile, {encoding: 'utf8'});
}


const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

function saveCircularObjToJsonFile(pathJsonFile, obj){
    let json = JSON.stringify(obj, getCircularReplacer());
    fs.writeFile(pathJsonFile, json, 'utf8', function(err){
        if(err) throw err;
        console.log("saved to",pathJsonFile);
    });
}



function saveObjToJsonFile(pathJsonFile, obj){
    let json = JSON.stringify(obj);
    fs.writeFile(pathJsonFile, json, 'utf8', function(err){
        if(err) throw err;
        console.log("saved to",pathJsonFile);
    });
}

function getCsvFromFile(pathCsvFile){
    let raw = loadFile(pathCsvFile);
    return d3.csv.parse(raw);
}

function copyFile(fromFile, toFile){
    fs.createReadStream(fromFile).pipe(fs.createWriteStream(toFile)); 
    console.log("saved from",fromFile,"to",toFile);
}

module.exports.getJsonFromFile = getJsonFromFile;
module.exports.getCsvFromFile = getCsvFromFile;
module.exports.saveObjToJsonFile = saveObjToJsonFile;
module.exports.saveCircularObjToJsonFile = saveCircularObjToJsonFile;
module.exports.copyFile = copyFile;