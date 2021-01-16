// Moore or Mealy machine
var Moore = document.getElementById("Moore");
var Mealy = document.getElementById("Mealy");

/*********************************************************************************/
//global variables of FSM 
var inEntityName;
var inputNumber;
var outputNumber;
var stateNumber;
var tt;
//name
var input = [];
var output = [];
var nextStateNumber = [];

function NextState(name, conditon){
	this.name = name;
	this.condition = conditon;
}

function Output(name, conditon){
	this.name = name;
	this.condition = conditon;
}
						
function State(name, nextState, output){
    this.name = name;
	this.nextState = nextState;
	this.output = output;
}
var state = [];

/*********************************************************************************/
//get the entity name, inputNumber and outputNumber from user's input
var submitBtn1 = document.getElementById("submitBtn1");
submitBtn1.onclick = function(){
    inEntityName = document.getElementById("entityName").value;
    inputNumber = parseInt(document.getElementById("inputNumber").value);
    outputNumber = parseInt(document.getElementById("outputNumber").value);
	stateNumber = parseInt(document.getElementById("stateNumber").value);
	//make sure all been input
	if((inEntityName=="")||(document.getElementById("inputNumber").value=="")||(document.getElementById("outputNumber").value=="")||(document.getElementById("stateNumber").value=="")){
		alert("please fill all the values");
		return;
	}
	//change the the name of entity in the code 
	var entityName = document.getElementsByClassName("entityName");
	for(var i = 0; i < entityName.length; i++){
		entityName[i].innerHTML = inEntityName;
	}
	var stateList = document.getElementById("stateList");
	var stateList_text = "(";
	for(var i = 0; i < stateNumber; i++){
		if(i==0){
			stateList_text = stateList_text + "state" + (i+1);
		}
		else{
			stateList_text = stateList_text + ", state" + (i+1);
		}
	}
	stateList_text = stateList_text + ");";
	stateList.innerHTML = stateList_text;
	
	/*********************************************************************************/
	//make sure all inputs
	if((inputType.value=="bit_vector")&&((inputFrom.value=="")||(inputTo.value==""))){
		alert("please enter all the parameters");
		return;
	}
	if((outputType.value=="bit_vector")&&((outputFrom.value=="")||(outputTo.value==""))){
		alert("please enter all the parameters");
		return;
	}
	/*********************************************************************************/
	//change the content of secondInputGroup dynamically
	var secondInputGroup = document.getElementById("secondInputGroup");
	secondInputGroup.style.display = "block";
	//secondInputGroup_1
	var secondInputGroup_1 = document.getElementById("secondInputGroup_1");
	var group_1_text = "";
	for(var i = 1; i < (inputNumber+1); i++){
		 group_1_text = group_1_text + "<pre>input"+i+": <input type='text' name='input"+i+"' id='input"+i+"'/>";
	}
	for(var i = 1; i < (outputNumber+1); i++){
		group_1_text = group_1_text + "<pre>output"+i+": <input type='text' name='output"+i+"' id='output"+i+"'/>";
	}
	// group_1_text = group_1_text + "<div id='inputSubmit2'>"+
	// 								"<button type='button' id='submitBtn2'>next</button>"+
	// 				              "</div>";
	secondInputGroup_1.innerHTML = group_1_text;
	secondInputGroup_1.insertAdjacentHTML("afterBegin", "<p class='ptext'>the names of inputs:</p>");
	var lastInput = document.getElementById("input"+inputNumber);
	lastInput.insertAdjacentHTML("afterEnd", "<br /><br /><p class='ptext'>the names of outputs:</p>");
	
	//secondInputGroup_2
	var secondInputGroup_2 = document.getElementById("secondInputGroup_2");
	var group_2_text = "";
	for(var i = 0; i < stateNumber; i++){
		group_2_text = group_2_text + "<pre class='StateNumber'>state"+(i+1)+": <input type='number' name='state"+(i+1)+"' id='state"+(i+1)+"'/>"+"</pre>";
	}
	secondInputGroup_2.innerHTML = group_2_text;
	secondInputGroup_2.insertAdjacentHTML("afterBegin", "<p class='ptext'>nextStateNumber: </p>");
	
	//style setting
	if(((inputNumber+outputNumber)>4)||stateNumber>4){
		if(stateNumber>=(inputNumber+outputNumber)){
			document.getElementById("secondInputGroup").style.height = 180+(30*(stateNumber-4))+"px";
		}else{
			document.getElementById("secondInputGroup").style.height = 180+(30*((inputNumber+outputNumber)-4))+"px";
		}
	}else{
		document.getElementById("secondInputGroup").style.height = 180 + "px";
	}
	
	var inputSubmit2 = document.getElementById("inputSubmit2");
	inputSubmit2.style.display = "block";
	
	/*********************************************************************************/
	//when click the second button
	var submitBtn2 = document.getElementById("submitBtn2");
	submitBtn2.onclick = function(){
		//make sure all been input
		for(var i = 1; i < (inputNumber+1); i++){
			if(document.getElementById("input"+i).value==""){
				alert("please enter all the names");
				return;
			} 
		}
		for(var i = 1; i < (outputNumber+1); i++){
			if(document.getElementById("output"+i).value==""){
				alert("please enter all the names");
				return;
			} 
		}
		for(var i = 1; i < (stateNumber+1); i++){
			if(document.getElementById("state"+i).value==""){
				alert("please enter all the names");
				return;
			} 
		}
		
		//get the names of inputs and outputs
		for(var i = 1; i < (inputNumber+1); i++){
			input[i] = document.getElementById("input"+i).value;
		}
		for(var i = 1; i < (outputNumber+1); i++){
			output[i] = document.getElementById("output"+i).value;
		}
		
		//change the code of inputList and ouputList
		//input
		var inputText = "";
		var outputText = "";
		var upProList_text = "(";
		for(var i = 1; i < (inputNumber+1); i++){
			if(i==inputNumber){
				inputText = inputText + input[i];
			}else{
				inputText = inputText + input[i] +", ";
			}
		}
		upProList_text = upProList_text + inputText + ", prestate)";
		inputText = inputText + ": in ";
	    var inputList = document.getElementById("inputList");
		inputList.innerHTML = inputText;
		var upProList = document.getElementById("upProList");
		upProList.innerHTML = upProList_text;
		
		//output
		for(var i = 1; i < (outputNumber+1); i++){
			if(i==outputNumber){
				outputText = outputText + output[i];
			}else{
				outputText = outputText + output[i] +", ";
			}
		}
		outputText = outputText + ": out ";
		var outputList = document.getElementById("outputList");
		outputList.innerHTML = outputText;
		
		/*********************************************************************************/
		//change the content of thirdInputGroup dynamically
		//describe the transiton of current state according to different inputs
		
		//get the nextStateNumbers of each state
		for(var i = 0; i < stateNumber; i++){
			nextStateNumber[i] = document.getElementById("state"+(i+1)).value;
		}
		
		var group_3_text = "";
		var inLen, outLen;//related to binary length of each input
		if(inputType.value=="bit"){
			inLen = 1;
		}else{
			inLen = parseInt(inputFrom.value)+1;
		}
		if(outputType.value=="bit"){
			outLen = 1;
		}else{
			outLen = parseInt(outputFrom.value)+1;
		}
		//alert(len);
		
		if(Moore.checked){
			for(var i = 0; i < stateNumber; i++){
				group_3_text = group_3_text + "<div id='thirdInputGroup_" + (i+1) + "'>";//state
				group_3_text = group_3_text + "<p class='pText'>when it is state" + (i+1) + ":</p>";
				group_3_text = group_3_text + "<p>------------------------------</P>";
				group_3_text = group_3_text + "<div id='state" + (i+1) + "_output" + "'>";//output
				for(var a = 0; a < outputNumber; a++){
					group_3_text = group_3_text + "<pre>output" + (a+1) + ": <select id='state" + (i+1) + "_output" + (a+1) + "'>";
					for(var b = 0; b < (2**outLen); b++){
						var str  = decToBinary(b, outLen);
						group_3_text = group_3_text + "<option value='" + str + "'>" + str + "</option>";
					}
					group_3_text = group_3_text + "</select></pre>";
				}
				group_3_text = group_3_text + "</div><br / >";//output
				for(var j = 0; j < nextStateNumber[i]; j++){
					group_3_text = group_3_text + "<div id='state" + (i+1) + "_nextState" + (j+1) + "'>";//nextState
					group_3_text = group_3_text + "<p class='pText'>nextState" + (j+1) + ":</p>";
					group_3_text = group_3_text + "<select id='state" + (i+1) + "_nextStateValue" + (j+1) + "'>";//nextStateValue
					for(var t = 0; t < stateNumber; t++){
						group_3_text = group_3_text + "<option value='state" + (t+1) + "'>state" + (t+1) + "</option>";
					}
					group_3_text = group_3_text + "</select>";//nextStateValue
					
					group_3_text = group_3_text + "<div id='state" + (i+1) + "_nextStateCondition" + (j+1) + "'>";//nextStateCondition
					group_3_text = group_3_text + "<p class='pText'>condition:</p>";
					for(var q = 0; q < inputNumber; q++){
						group_3_text = group_3_text + "<pre>input" + (q+1) + ": <select id='state" + (i+1) + "_nextState" + (j+1) + "_condition" + (q+1) + "'>";
						for(var g = 0; g < (2**inLen); g++){
							var str  = decToBinary(g, inLen);
							group_3_text = group_3_text + "<option value='" + str + "'>" + str + "</option>";
						}
						group_3_text = group_3_text + "<option value='X'>X</option>";
						group_3_text = group_3_text + "</select></pre>";
					}
					group_3_text = group_3_text + "</div>";//nextStateCondition
					group_3_text = group_3_text + "</div>";//nextState
				}
				group_3_text = group_3_text + "</div><br />";//state
			}
			var thirdInputGroup = document.getElementById("thirdInputGroup");
			thirdInputGroup.innerHTML = group_3_text;
			
			//style setting
			for(var i = 0; i < stateNumber; i++){
				document.getElementById("thirdInputGroup_"+(i+1)).style.position = "relative";
				document.getElementById("thirdInputGroup_"+(i+1)).style.height = 270+(60*(inputNumber-1))+"px";
				for(var j = 0; j < nextStateNumber[i]; j++){
					document.getElementById("state"+(i+1)+"_nextState"+(j+1)).style.position = "absolute";
					document.getElementById("state"+(i+1)+"_nextState"+(j+1)).style.left = (j*200)+"px";
				}
			}
		}
		//Mealy machine
		else{
			for(var i = 0; i < stateNumber; i++){
				group_3_text = group_3_text + "<div id='thirdInputGroup_" + (i+1) + "'>";//state
				group_3_text = group_3_text + "<p class='pText'>when it is state" + (i+1) + ":</p>";
				group_3_text = group_3_text + "<p>------------------------------</P>";
				for(var a = 0; a < outputNumber; a++){
					group_3_text = group_3_text + "<div id='state" + (i+1) + "_outputFrame" + (a+1) + "'>";//output
					group_3_text = group_3_text + "<pre>output" + (a+1) + ": <select id='state" + (i+1) + "_output" + (a+1) + "'>";
					for(var b = 0; b < (2**outLen); b++){
						var str  = decToBinary(b, outLen);
						group_3_text = group_3_text + "<option value='" + str + "'>" + str + "</option>";
					}
					group_3_text = group_3_text + "</select></pre>";
					group_3_text = group_3_text + "<p class='pText'>condition:</p>";
					for(var q = 0; q < inputNumber; q++){
						group_3_text = group_3_text + "<pre>input" + (q+1) + ": <select id='state" + (i+1) + "_output" + (a+1) + "_condition" + (q+1) + "'>";
						for(var g = 0; g < (2**inLen); g++){
							var str  = decToBinary(g, inLen);
							group_3_text = group_3_text + "<option value='" + str + "'>" + str + "</option>";
						}
						group_3_text = group_3_text + "<option value='X'>X</option>";
						group_3_text = group_3_text + "</select></pre>";
					}
					group_3_text = group_3_text + "</div><br />";//output
				}
				group_3_text = group_3_text + "<br />";
				
				for(var j = 0; j < nextStateNumber[i]; j++){
					group_3_text = group_3_text + "<div id='state" + (i+1) + "_nextState" + (j+1) + "'>";//nextState
					group_3_text = group_3_text + "<p class='pText'>nextState" + (j+1) + ":</p>";
					group_3_text = group_3_text + "<select id='state" + (i+1) + "_nextStateValue" + (j+1) + "'>";//nextStateValue
					for(var t = 0; t < stateNumber; t++){
						group_3_text = group_3_text + "<option value='state" + (t+1) + "'>state" + (t+1) + "</option>";
					}
					group_3_text = group_3_text + "</select>";//nextStateValue
					
					group_3_text = group_3_text + "<div id='state" + (i+1) + "_nextStateCondition" + (j+1) + "'>";//nextStateCondition
					group_3_text = group_3_text + "<p class='pText'>condition:</p>";
					for(var q = 0; q < inputNumber; q++){
						group_3_text = group_3_text + "<pre>input" + (q+1) + ": <select id='state" + (i+1) + "_nextState" + (j+1) + "_condition" + (q+1) + "'>";
						for(var g = 0; g < (2**inLen); g++){
							var str  = decToBinary(g, inLen);
							group_3_text = group_3_text + "<option value='" + str + "'>" + str + "</option>";
						}
						group_3_text = group_3_text + "<option value='X'>X</option>";
						group_3_text = group_3_text + "</select></pre>";
					}
					group_3_text = group_3_text + "</div>";//nextStateCondition
					group_3_text = group_3_text + "</div>";//nextState
				}
				group_3_text = group_3_text + "</div><br />";//state
			}
			var thirdInputGroup = document.getElementById("thirdInputGroup");
			thirdInputGroup.innerHTML = group_3_text;
			
			//style setting
			for(var i = 0; i < stateNumber; i++){
				document.getElementById("thirdInputGroup_"+(i+1)).style.position = "relative";
				document.getElementById("thirdInputGroup_"+(i+1)).style.height = 270+(60*(inputNumber-1))+"px"; 
				for(var j = 0; j < nextStateNumber[i]; j++){
					document.getElementById("state"+(i+1)+"_nextState"+(j+1)).style.position = "absolute";
					document.getElementById("state"+(i+1)+"_nextState"+(j+1)).style.left = (j*200)+"px";
					document.getElementById("state"+(i+1)+"_nextState"+(j+1)).style.top = 150+(30*(inputNumber-1))+"px";
				}
				for(var a = 0; a < outputNumber; a++){
					document.getElementById("state"+(i+1)+"_outputFrame"+(a+1)).style.position = "absolute";
					document.getElementById("state"+(i+1)+"_outputFrame"+(a+1)).style.left = (a*200)+"px";
					document.getElementById("state"+(i+1)+"_outputFrame"+(a+1)).style.top = 50+"px";
				}
		    }
		}
		
		var inputSubmit3 = document.getElementById("inputSubmit3");
		inputSubmit3.style.display = "block";
		
		/*************************************************************************************/
		//change the code of when case part
		var submitBtn3 = document.getElementById("submitBtn3");
		submitBtn3.onclick = function(){
			if(Moore.checked){
				// var test_condition = [[["00","01"],["10","11"],["00","01"]], [["00","01"],["10","11"],["00","01"]], [["00","01"],["10","11"],["00","01"]]];
				// var test_nextState = [["state1","state0","1"], ["state0","state1","2"],["state0","state1","2"]];
				// var test_output = [["00","01"],["01","11"],["10","11"]];
				//var inputNumber = 2;
				//var outputNumber = 2;
				//var stateNumber = 3;
				//length should be stateNumber
				//var nextStateNumber = [3, 3, 3];
				
				//three dimension
				var condition = [];
				for(var i = 0; i < stateNumber; i++){
					condition[i] = [nextStateNumber[i]];
					for(var j = 0; j < nextStateNumber[i]; j++){
						condition[i][j] = [inputNumber];
					}
				}
				//two dimension
				var nextState = [];
				for(var i = 0; i < stateNumber; i++){
					nextState[i] = [nextStateNumber[i]];
				}
				//two dimension
				var outputBasedOnState = [];
				for(var i = 0; i < stateNumber; i++){
					outputBasedOnState[i] = [outputNumber];
				}
				
				
				for(var i = 0; i < stateNumber; i++){
					for(var j = 0; j < nextStateNumber[i]; j++){
						for(var q = 0; q < inputNumber; q++){
							condition[i][j][q] = document.getElementById("state"+(i+1)+"_nextState"+(j+1)+"_condition"+(q+1)).value;
							//condition[i][j][q] = test_condition[i][j][q];
						}
					}
				}
				
				for(var i = 0; i < stateNumber; i++){
					for(var j = 0; j < nextStateNumber[i]; j++){
						nextState[i][j] = new NextState(document.getElementById("state"+(i+1)+"_nextStateValue"+(j+1)).value, condition[i][j]);
						//nextState[i][j] = new NextState(test_nextState[i][j], condition[i][j]);
					}
				}
				
				for(var i = 0; i < stateNumber; i++){
					for(var j = 0; j < outputNumber; j++){
						outputBasedOnState[i][j] = document.getElementById("state"+(i+1)+"_output"+(j+1)).value;
						//outputBasedOnState[i][j] = test_output[i][j];
					}
				}
				//var outputBasedOnState = ["00", "11"];//its length should be stateNumber
				for(var i = 0; i < stateNumber; i++){
					state[i] = new State("state"+(i+1), nextState[i], outputBasedOnState[i]);
				}
				
				
				//add code lines between case.....is and end case;
				document.getElementById("endCase").innerHTML = "";
				for(var i = 0; i < stateNumber; i++){
					addLineById("endCase", "beforeEnd", "<pre class='codeLine'>"+
															 "<span class='codeText tab'>	  </span>"+
															 "<span class='codeText dtab'>	  	  </span>"+
															 "<span class='codeText'>when </span>"+
															 "<span class='codeText'>" + state[i].name + "</span>"+
															 "<span class='codeText'> =></span>"+
														   "</pre>"+"<br />");
					//ouput code									   
					for(var j = 0; j < outputNumber; j++){
						addLineById("endCase", "beforeEnd", "<pre class='codeLine'>"+
																"<span class='codeText dtab'>	  	  </span>"+
																"<span class='codeText dtab'>	  	  </span>"+
																"<span class='codeText outputName'>" + output[j+1] + "</span>"+
																"<span class='codeText'> &lt;= &quot;</span>"+
																"<span class='codeText'>" + outputBasedOnState[i][j] + "&quot;;</span>"+
															  "</pre>"+"<br />");
					}
					
					var outFlag = 0;
					for(var j = 0; j < nextStateNumber[i]; j++){
						if(j==0){
							var text = "<pre class='codeLine'>"+
										  "<span class='codeText dtab'>	  	  </span>"+
										  "<span class='codeText dtab'>	  	  </span>"+
										  "<span class='codeText'>if(</span>";
						}
						else{
							var text = "<pre class='codeLine'>"+
										  "<span class='codeText dtab'>	  	  </span>"+
										  "<span class='codeText dtab'>	  	  </span>"+
										  "<span class='codeText'>elsif(</span>";
						}
						var flag = 0;
						for(var q = 0; q < inputNumber; q++){
							if((state[i].nextState[j].condition[q])!="X"){
								if(q==0){
									text = text + "<span class='codeText'>" + input[q+1] + "</span>"+
												  "<span class='codeText'>=&quot;</span>"+
												  "<span class='codeText'>" + state[i].nextState[j].condition[q] + "&quot;</span>";//"&quot;) then </span>"
								}
								if((q!=0)&&(flag==1)){
									text = text + "<span class='codeText'> and </span>"+
												  "<span class='codeText'>" + input[q+1] + "</span>"+
												  "<span class='codeText'>=&quot;</span>"+
												  "<span class='codeText'>" + state[i].nextState[j].condition[q] + "&quot;</span>";
								}
								if((q!=0)&&(flag==0)){
									text = text + "<span class='codeText'>" + input[q+1] + "</span>"+
												  "<span class='codeText'>=&quot;</span>"+
												  "<span class='codeText'>" + state[i].nextState[j].condition[q] + "&quot;</span>";
								}
								flag = 1;
								outFlag = 1;
							}
						}
						if(flag==1){
							text = text + "<span class='codeText'>) then nextState &lt;= </span>"+
										  "<span class='codeText'>" + state[i].nextState[j].name + ";</span>"+
										  "</pre>"+"<br />";
						}
						else{
							if(i==(stateNumber-1)){
								text = "<pre class='codeLine'>"+
										   "<span class='codeText dtab'>	  	  </span>"+
										   "<span class='codeText dtab'>	  	  </span>"+
										   "<span class='codeText'>nextState &lt;= </span>"+
										   "<span class='codeText'>" + state[i].nextState[j].name + ";</span>"+
										"</pre>"+"<br />";
							}else{
								text = "<pre class='codeLine'>"+
										   "<span class='codeText dtab'>	  	  </span>"+
										   "<span class='codeText dtab'>	  	  </span>"+
										   "<span class='codeText'>nextState &lt;= </span>"+
										   "<span class='codeText'>" + state[i].nextState[j].name + ";</span>"+
										"</pre>"+"<br /><br />";
							}
						}
						addLineById("endCase", "beforeEnd", text);
					}
					if((outFlag==1)&&(i!=(stateNumber-1))){
						addLineById("endCase", "beforeEnd", "<pre class='codeLine'>"+
																 "<span class='codeText dtab'>	  	  </span>"+
																 "<span class='codeText dtab'>	  	  </span>"+
																 "<span class='codeText'>end if;</span>"+
															  "</pre>"+"<br /><br />");
					}
					if((outFlag==1)&&(i==(stateNumber-1))){
						addLineById("endCase", "beforeEnd", "<pre class='codeLine'>"+
																 "<span class='codeText dtab'>	  	  </span>"+
																 "<span class='codeText dtab'>	  	  </span>"+
																 "<span class='codeText'>end if;</span>"+
															  "</pre>"+"<br />");
					}
				}
			}
			else{
				
			}
				
						
			
			
			//make sure all input before showing the code
			if(inputType.value!="bit"){
				//alert(inputFrom.value);
				if((inputFrom.value=="")||(inputTo.value=="")){
					alert("please enter the range");
					return;
				}
			}
			if(outputType.value!="bit"){
				//alert(inputFrom.value);
				if((outputFrom.value=="")||(outputTo.value=="")){
					alert("please enter the range");
					return;
				}
			}
			document.getElementById("code").style.display = "inline";
		}
	 }
}

/*********************************************************************************/
//when operate the firstInputGroup_2
var inputType = document.getElementById("inputType");
var outputType = document.getElementById("outputType");
var inputRange = document.getElementById("inputRange");
var outputRange = document.getElementById("outputRange");
var inputFrom = document.getElementById("inputFrom");
var inputTo = document.getElementById("inputTo");
var outputFrom = document.getElementById("outputFrom");
var outputTo = document.getElementById("outputTo");
var bit_vectorText = "";
//alert(inputType.vavar inputFrom = document.getElementById("inputFrom");

inputType.onchange = function(){
	//alert(inputType.value);
	if(this.value=="bit"){
		//inputRange.className = "noneDisplay";
		inputRange.style.display = "none";
		var inTypeCode = document.getElementById("inTypeCode");
		inTypeCode.innerHTML = "bit;";
	}
	if(this.value=="bit_vector"){
		//inputRange.className = "showDisplay";
		inputRange.style.display = "block";
	}
}
outputType.onchange = function(){
	if(this.value=="bit"){
		outputRange.style.display = "none";
		var outTypeCode = document.getElementById("outTypeCode");
		outTypeCode.innerHTML = "bit;";
	}
	if(this.value=="bit_vector"){
		outputRange.style.display = "block";
	}
}

inputFrom.onchange = function(){
	if(this.value<=0){
		alert("invalid range! please enter another range.");
		return;
	}
	bit_vectorText = "bit_vector("+this.value+" downto "+inputTo.value+");";
	var inTypeCode = document.getElementById("inTypeCode");
	inTypeCode.innerHTML = bit_vectorText;
}

inputTo.onchange = function(){
	if(this.value!=0){
		alert("invalid range! please enter another range.");
		return;
	}
	bit_vectorText = "bit_vector("+inputFrom.value+" downto "+this.value+");";
	var inTypeCode = document.getElementById("inTypeCode");
	inTypeCode.innerHTML = bit_vectorText;
}

outputFrom.onchange = function(){
	if(this.value<=0){
		alert("invalid range! please enter another range.");
		return;
	}
	bit_vectorText = "bit_vector("+this.value+" downto "+outputTo.value+"));";
	var outTypeCode = document.getElementById("outTypeCode");
	outTypeCode.innerHTML = bit_vectorText;
}

outputTo.onchange = function(){
	if(this.value!=0){
		alert("invalid range! please enter another range.");
		return;
	}
	bit_vectorText = "bit_vector("+outputFrom.value+" downto "+this.value+"));";
	var outTypeCode = document.getElementById("outTypeCode");
	outTypeCode.innerHTML = bit_vectorText;
}

/****************************************************************/
// //control the visibility of VHDL code
// var Vbutton = document.getElementById("vbtn");
// Vbutton.onclick = function(){
// 	//make sure the range is entered correctlly
// 	if(inputType.value!="bit"){
// 		//alert(inputFrom.value);
// 		if((inputFrom.value=="")||(inputTo.value=="")){
// 			alert("please enter the range");
// 			return;
// 		}
// 	}
// 	if(outputType.value!="bit"){
// 		//alert(inputFrom.value);
// 		if((outputFrom.value=="")||(outputTo.value=="")){
// 			alert("please enter the range");
// 			return;
// 		}
// 	}
// 	document.getElementById("code").style.display = "inline";
// }
		
/************************************************************************/
//self-defined functions

//add one new line between a specified positon by id
function addLineById(id, pos, content){
	var Code = document.getElementById(id);
	Code.insertAdjacentHTML(pos, content);
}

//add a tab by id
function addTabById(id, pos){
	var Code = document.getElementById(id);
	Code.insertAdjacentHTML(pos, "<pre class='codeLine'>"+
									"<span class='codeText tab'>	  </span>"+
								 "</pre>");
}	
	
//add a new space line by id
function addSpaceById(id, pos){
	addLineById(id, pos, "<pre class='codeLine'>"+
							"<span class='codeText space'>&#8203;</span>"+
						 "</pre>")
}

//Decimal to binary
function decToBinary(dec, binaryLen){
	var str = "";
	var restr = [];
	var reverse = "";
	for(var i = 0; i < binaryLen; i++){
		str = str + dec%2;
		dec = parseInt(dec/2);
	}
	if(str.length>0){
	　　var restr = str.split("").reverse().join("");
	}
	for(var i = 0; i < str.length; i++){
		reverse = reverse + restr[i];
	}
	return reverse;
}
