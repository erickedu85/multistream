function complexVecOut(erFlag, vecSize, rVec, iVec){
//http://www3.telus.net/thothworks/PolyRootRe.html
var outputString = "";
var resultados;

if (vecSize != 0) {

  outputString = outputString + "<br /> &nbsp; &nbsp; The solutions follow:<br /> &nbsp; &nbsp;";
  outputString = outputString + "<br /> &nbsp; &nbsp;";

  var resultados = [];
  
  for (var i = 0; i < vecSize; i++) {
	  
    outputString = outputString + rVec[i];
  
    if (iVec[i] != 0) {
      if (iVec[i] > 0) {
        outputString = outputString + " &nbsp; + &nbsp; " + iVec[i] + " i" ;
		
      }  // End if (iVec[i] > 0)
      else {
        outputString = outputString + " &nbsp; - &nbsp; " + Math.abs(iVec[i]) + " i" ;
      }  // End else (iVec[i] < 0)
      ;
    }  // End if (iVec[i] != 0)
    else{
    	//-------------------------------------------------------------
    	//Attention
		//    	//rVec[i]
		//    	//iVec[i]
    	if(rVec[i]> 1) {//doit etre plus grand que 1
    		var index = resultados.length;
    		resultados[index] = rVec[i];//All R value big than 1 Erick
    	}
    	//-----------------------------------------------------------
    }
    outputString = outputString + "<br /> &nbsp; &nbsp;";
    
  } 

  if (erFlag != 99){ // If erFlag equals 99, do not print Error Code, just results
//	console.log(outputString)
    outputString = outputString + "<br /> &nbsp; &nbsp; <b>Error Code</b>: " + vecSize;
  } // End if (erFlag != 99)

}   // End if (vecSize != 0)

  //document.getElementById('output').innerHTML = outputString;
  var max = Math.max.apply(null, resultados)
  return max;
}  //End of complexVecOut

// end of JavaScript-->
