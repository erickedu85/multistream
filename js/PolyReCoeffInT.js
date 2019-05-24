function PolyReSolveT(dataForm){
	//http://www3.telus.net/thothworks/PolyRootRe.html
  // Function for inputting and solving a real polynomial. Input comes from a textarea box

 var MAXDEGREE = 100;             // Degree of largest polynomial accepted by this script.
 var MDP1 = MAXDEGREE + 1;   // MAXDEGREE PLUS 1.

 //var dataFormElements = dataForm.elements; // Reference to the form elements array.
 var dataFormElements = dataForm; // Replace Erick
 var textareaIndex = 0;  // The form array index for the textarea element
 //var textareaString = "";//origin
 var textareaString = dataForm;//replace Erick
 var rawArray = new Array(); // Array for holding raw data entry from textarea box
 var rawArrayLength = 0; // The length of the raw array entered from textarea box
 var numCoeff = 0;  //Indicates the number of data entries that have been entered
 var POLYDEGREE = 0;				// The degree of the polynomial to be solved.
 var k;   // Array index
 var tempx;   // Dummy variable
 var p = new Array(MDP1);				// Array of polynomial coefficients

 //document.getElementById('output').innerHTML = ""; //erick
 //textareaString = textareaString + dataFormElements[textareaIndex].value; //erick
 //console.log(textareaString);

 if (textareaString.length == 0){
  //alert("The length of textareaString is 0. No data has been entered. No further action taken.");
  return;
 }

 // At this point, textareaString is a big long string containing the entire field entered in the textarea box.
 // Must now clean up the data: remove leading and trailing spaces, identify the inputs, etc.

 // Check to see that string contains digits; if not, no point continuing
 if (textareaString.search(/\d/) == -1){
  //alert("textareaString does not contain any digits. No further action taken.");
  return;
 }

 // Check to see that string contains only digits, decimal points, "+" or "-" sign, or white space; if not, no point continuing
 if (textareaString.search(/[^\d\.\s\+-]/) != -1){
  //alert("textareaString contains an invalid character. Please edit data so that it is in the appropriate format. No further action taken.");
  return;
 }

 // Check to see that string contains newline characters;
 // if not, then there are not AT LEAST two entries, and the algorithm won't work--no point continuing
  if (textareaString.search(/\n/) == -1){
   //alert("This utility requires more than two entries to be entered, but two entries have not been detected. Either fewer than two entries have been entered, or the data is not in the appropriate format. No further action taken.");
   return;
 }

 // Do some rough clean up
 textareaString = textareaString.replace(/\s*$/, ''); // Remove trailing whitespace
 textareaString = textareaString.replace(/^\s*/, ''); // Remove leading whitespace

 // Divide the string up into its individual entries, which--presumably--are separated by whitespace
 rawArray = textareaString.split(/\s+/g);
 rawArrayLength = rawArray.length;

 // Check to see if at least three entries are present
  if (rawArrayLength < 3){
   //alert("This utility requires AT LEAST three entries to be entered, but fewer than three entries have been detected. No further action taken.");
   return;
  }

// A maximum of 102 entries may be entered (first entry for the polynomial degree, up to 101 for the coefficients).

if (rawArrayLength > (MDP1 + 1)){
   //alert("This utility accepts input of up to 102 entries: the first for the degree and up to 101 for the coefficients. However, more than 102 entries have been input. No further action taken.");
   return;
}

 numCoeff = rawArrayLength - 1;

// Now check the individual data entries, confirm they are valid numbers, and place the entries in the array

 k = parseInt(rawArray[0], 10);
 if (!isNaN(k)){ // Degree field contains a valid number; otherwise ignore
    POLYDEGREE = k;
  }//End if !isNaN
  else {
    //alert("Invalid input for polynomial degree. No further action taken");
    return;
 } // End else

 if (POLYDEGREE > MAXDEGREE){
      //alert("This utility accepts polynomials of degree up to " + MAXDEGREE + ". However, a higher number has been input. No further action taken.");
      return;
 }

if (POLYDEGREE < 0 ){
   //alert("Negative values for the polynomial degree are not accepted. No further action taken.");
   return;
 }

 if (POLYDEGREE > (numCoeff - 1)){
   //alert("There are too few coefficients entered for the polynomial degree input. Check the data. No further action taken.");
   return;
 }

 k = 1;
 for (var i = 0; i < numCoeff; i++) {// Examine the data fields
  tempx = parseFloat(rawArray[k]);
  k++;
  if (!isNaN(tempx)){ // Field contains a valid number
   p[i] = tempx;
  }//End if !isNaN
  else {
   //alert("Invalid input for entry " + (i+1) + ". No further action taken");
   return;
  } // End else
 } // End for i

 // Check for leading zeros.
 // Use k as a temporary value of Degree, based upon the number of coefficients entered

 k = numCoeff - 1;

 while ((p[0] == 0) && (k > 0)){
    for (var i = 0; i < k; i++) {
      p[i] = p[i + 1];
    } // End for i
    k--;
 } // End while (p[0] == 0)

  if (k == 0 ){
    //alert("Polynomial degree is 0. No further action taken.");
    return;
 }

  if (POLYDEGREE != k){
    //alert("The number of coefficients entered does not correspond with the polynomial degree input. Check the data. No further action taken.");
    return;
 }

 POLYDEGREE = k;

 //  **********************************************************************************************************************************
 // At this point, POLYDEGREE should be the polynomial degree and the p array should contain the coefficient values entered
 //  **********************************************************************************************************************************

var zeror = new Array(POLYDEGREE);   // Vector of real components of roots
var zeroi = new Array(POLYDEGREE);   // Vector of imaginary components of roots

var degreePar = new Object();    // degreePar is a dummy variable for passing the parameter POLYDEGREE by reference

degreePar.Degree = POLYDEGREE; //polynomi degree

for (var i = 0; i < POLYDEGREE; i++) {
  zeroi[i] = zeror[i] = 0;
}// End for i loop

rpSolve(degreePar, p, zeror, zeroi);
POLYDEGREE = degreePar.Degree;
return complexVecOut(7, POLYDEGREE, zeror, zeroi); //flag, vectorSize, 

//return;
}  //End of PolyReSolveT

// end of JavaScript-->