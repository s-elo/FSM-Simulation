/**************************basic paramenter variables setting*******************************/
var entityName = '';
const entityNameId = document.getElementById('entityName');
var inputNumber = 0;
var outputNumber = 0;
const stepOne = document.getElementById('stepOne');

var stepOneFlag = 0;
var finishFlag = 0;
/*********************************input && output number**********************************/
const inputNumberId = document.getElementById('inputNumber');
const outputNumberId = document.getElementById('outputNumber');

inputNumberId.onchange = function () {
	if (this.value <= 0) {
		alert('at least one input');
		this.value = 1;
	}
}
outputNumberId.onchange = function () {
	if (this.value <= 0) {
		alert('at least one output');
		this.value = 1;
	}
}
/*********************************input type && output type**********************************/
const inputType = document.getElementById('inputType');
const outputType = document.getElementById('outputType');
const inputRange = document.getElementById('inputRange');
const outputRange = document.getElementById('outputRange');
const inputFrom = document.getElementById('inputFrom');
const inputTo = document.getElementById('inputTo');
const outputFrom = document.getElementById('outputFrom');
const outputTo = document.getElementById('outputTo');
//var bit_vectorText = "";
//alert(inputType.vavar inputFrom = document.getElementById("inputFrom");

inputType.onchange = function () {
	//alert(inputType.value);
	if (this.value === 'bit') {
		//inputRange.className = "noneDisplay";
		inputRange.style.display = 'none';
		// var inTypeCode = document.getElementById('inTypeCode');
		// inTypeCode.innerHTML = 'bit;';
		//change the button position
		// let top = parseInt(stepOne.style.top);
		// if (top >= 670) {
		// 	stepOne.style.top = (top - 25) + 'px';
		// }
	}
	if (this.value === 'bit_vector') {
		//inputRange.className = "showDisplay";
		inputRange.style.display = 'block';
		var btn1 = document.getElementById('btn1');
		//alert(parseInt(stepOne.style.top))
		// let top = parseInt(stepOne.style.top);
		// if (top <= 720) {
		// 	stepOne.style.top = (top + 25) + 'px';
		// }
	}
}
outputType.onchange = function () {
	if (this.value === 'bit') {
		outputRange.style.display = 'none';
		// var outTypeCode = document.getElementById("outTypeCode");
		// outTypeCode.innerHTML = "bit;";
		// let top = parseInt(stepOne.style.top);
		// if (top >= 670) {
		// 	stepOne.style.top = (top - 25) + 'px';
		// }
	}
	if (this.value === 'bit_vector') {
		outputRange.style.display = 'block';
		// let top = parseInt(stepOne.style.top);
		// if (top <= 720) {
		// 	stepOne.style.top = (top + 25) + 'px';
		// }
	}
}

inputFrom.onchange = function () {
	if (this.value <= 0) {
		alert('invalid range! please enter another range.');
		this.value = 1;
		return;
	}
	// bit_vectorText = "bit_vector("+this.value+" downto "+inputTo.value+");";
	// var inTypeCode = document.getElementById("inTypeCode");
	// inTypeCode.innerHTML = bit_vectorText;
}

inputTo.onchange = function () {
	if (this.value != 0) {
		alert('the lower bound should always be 0.');
		this.value = 0;
		return;
	}
	// bit_vectorText = "bit_vector("+inputFrom.value+" downto "+this.value+");";
	// var inTypeCode = document.getElementById("inTypeCode");
	// inTypeCode.innerHTML = bit_vectorText;
}

outputFrom.onchange = function () {
	if (this.value <= 0) {
		alert('invalid range! please enter another range.');
		this.value = 1;
		return;
	}
	// bit_vectorText = "bit_vector("+this.value+" downto "+outputTo.value+"));";
	// var outTypeCode = document.getElementById("outTypeCode");
	// outTypeCode.innerHTML = bit_vectorText;
}

outputTo.onchange = function () {
	if (this.value != 0) {
		alert('the lower bound should always be 0.');
		this.value = 0;
		return;
	}
	// bit_vectorText = "bit_vector("+outputFrom.value+" downto "+this.value+"));";
	// var outTypeCode = document.getElementById("outTypeCode");
	// outTypeCode.innerHTML = bit_vectorText;
}

/**************************after click step one button**********************/
let updateFirstTime = 1;
stepOne.onclick = function () {
	if (entityNameId.value === '') {
		alert('please give an name to this FSM');
		return;
	}
	
	stepOneFlag = 1;
	
	entityName = entityNameId.value;
	inputNumber = parseInt(inputNumberId.value);
	outputNumber = parseInt(outputNumberId.value);
	
	var group1 = document.getElementById('group1');
	group1.style.display = 'none';
	
	var group2Content = `<div id="group2">
							<h4>Step Two</h4><br />
							<label>input names: </label>`;
								
	//inputName input generation
	for (let i = 1; i <= inputNumber; i++) {
		group2Content += `<div class="input-group input-group-sm">
							<span class="input-group-addon">input${i}</span> 
							<input id=${'input' + i} type="text" class="form-control" aria-describedby="sizing-addon1"
								   placeholder="please give a name"></div><br />`;
	}
	group2Content += `<br />
					  <label>output names: </label>`;
	//outputName input generation
	for (let i = 1; i <= outputNumber; i++) {
		group2Content += `<div class="input-group input-group-sm">
							<span class="input-group-addon">output${i}</span> 
							<input id=${'output' + i} type="text" class="form-control" aria-describedby="sizing-addon1"
							placeholder="please give a name"></div><br />`;
	}
	//alert(inputNumber + outputNumber)
	//var btnTop = ((inputNumber + outputNumber) * 26 + 450) + 'px';
	//alert(btnTop)
	group2Content += `<br />
					  <button class="btn btn-primary" " type="button" id="stepTwoLast">Prev</button>
					  <button class="btn btn-primary" " type="button" id="finish">Finish</button>
					  </div>`;
					  // style="top: ${btnTop}; left: 120px;
					  // style="top: ${btnTop}; left: 200px;
	addHtmlById('paraSetting', 'beforeEnd', group2Content);
	var stepTwoLast = document.getElementById('stepTwoLast');
	stepTwoLast.onclick = function () {
		stepOneFlag = 0;
		
		var group2 = document.getElementById('group2');
		group2.parentNode.removeChild(group2);
		//group2.style.display = 'none';
		group1.style.display = 'block';
	}
	
	var finish = document.getElementById('finish');
	finish.onclick = function () {
		finishFlag = 1;
		
		//remind
		for (let i = 1; i <= inputNumber; i++) {
			if (document.getElementById('input' + i).value === '') {
				alert('please give the name');
				return;
			}
		}
		for (let i = 1; i <= outputNumber; i++) {
			if (document.getElementById('output' + i).value === '') {
				alert('please give the name');
				return;
			}
		}
		
		var group2 = document.getElementById('group2');
		group2.style.display = 'none';
		
		//create the group3
		var group3Content = `<div id="group3">
								<p><h4>entityName: </h4>${entityName}</p><hr />
								<p><h4>input: </h4></p>`;
		
		if (inputType.value === 'bit') {
			group3Content += `<p>(bit)</p>`;
		}
	    else {
			group3Content += `<p>from ${inputFrom.value} to ${inputTo.value}</p>`;
		}
		for (let i = 1; i <= inputNumber; i++) {
			let inputName = document.getElementById('input' + i).value;
			group3Content += `<p>input${i}: ${inputName}</p>`;
		}
		
		// present the reset
		let startIndex = startState.findIndex(x => x === 1);
		if (startIndex === -1) {
			group3Content += `<p id="resetShow">reset = 1 --> no state yet</p>`;
		} else {
			group3Content += `<p id="resetShow">reset = 1 --> ${ textArray[startIndex].innerHTML }</p>`;
		}
		

		group3Content += `<hr /><p><h4>output: </h4></p>`;
		
		if (outputType.value === 'bit') {
			group3Content += `<p>(bit)</p>`;
		}
		else {
			group3Content += `<p>from ${outputFrom.value} to ${outputTo.value}</p>`;
		}
		for (let i = 1; i <= outputNumber; i++) {
			let outputName = document.getElementById('output' + i).value;
			group3Content += `<p>output${i}: ${outputName}</p>`;
		}
		
		var top = ((inputNumber + outputNumber) * 26 + 500) + 'px';
		group3Content += `<br />
						  <button class="btn btn-primary" type="button" id="finishLast">Prev</button>
						  </div>`;
		
		addHtmlById('paraSetting', 'beforeEnd', group3Content);
		
		
		var finishLast = document.getElementById('finishLast');
		finishLast.onclick = function () {
			finishFlag = 0;
			
			var group3 = document.getElementById('group3');
			group3.parentNode.removeChild(group3);
			//group3.style.display = 'none';
			group2.style.display = 'block';
			
		}
		
		//change the info table
		for (let i = 1; i < lineFlag.length; i++) {
			for (let j = 1; j < lineFlag[i].length; j++) {
				if (Tline[i][j] != 0) {
					//alert('fff');
					//input condition
					let condition = document.getElementById('condition' + i + j);
					let conditionContent = ``;
					
					let inlen = 1;
					if(inputType.value === 'bit'){
						inlen = 1;
					}else{
						inlen = parseInt(inputFrom.value)+1;
					}
					
					for (let k = 1; k <= inputNumber; k++) {
						let inputName = document.getElementById('input' + k).value;
						conditionContent += `<p>${inputName}: 
											 <select id=${'input' + i + j + k}>`;
						for (let b = 0; b < (2 ** inlen); b++) {
							let str = decToBinary(b, inlen);
							conditionContent += `<option value=${str}>${str}</option>`;
						}
						conditionContent += `<option value='X'>X</option>`;
						conditionContent += `</select></p>`;
					}
					
					condition.innerHTML = conditionContent;
					
					//output
					let output = document.getElementById('output' + i + j);
					let outputContent = ``;
					
					let outlen = 1;
					if(outputType.value === 'bit'){
						outlen = 1;
					}else{
						outlen = parseInt(outputFrom.value)+1;
					}
					
					for (let k = 1; k <= outputNumber; k++) {
						let outputName = document.getElementById('output' + k).value;
						outputContent += `<p>${outputName}: 
											 <select id=${'output' + i + j + k}>`;
						for (let b = 0; b < (2 ** outlen); b++) {
							let str = decToBinary(b, outlen);
							outputContent += `<option value=${str}>${str}</option>`;
						}
						outputContent += `</select></p>`;
					}
					
					output.innerHTML = outputContent;
					
					//at circle tables
					var cirOutputContent = ``;
						
					for (let k = 1; k <= outputNumber; k++) {
						let outputName = document.getElementById('output' + k).value;
						var outputValue = document.getElementById('output' + i + j + k).value;
						cirOutputContent += `<p id = ${'cirOutput' + i + j + k}>
											 ${outputName}: ${outputValue}</p>`;
					}
					cirOutputContent += `<hr /></div>`;
					document.getElementById('cirOutput'+ i + j).innerHTML = cirOutputContent;
					
					//binding the ouput value event to syncronize the value at circle table
					for (let k = 1; k <= outputNumber; k++) {
						let outputValue = document.getElementById('output' + i + j + k);
						
						outputValue.onchange = function () {
							//get the id of this outputValue
							let id = this.getAttribute('id');
							let a = id.slice(6, 7);
							let b = id.slice(7, 8);
							let c = id.slice(8, 9);
							
							if (document.getElementById('output' + c)) {
								var outputName = document.getElementById('output' + c).value;
							}
							else {
								var outputName = '';
							}
							
							var cirOutput = document.getElementById('cirOutput' + a + b + c);
							cirOutput.innerHTML = `${outputName}: ${this.value}`;
						}
					}
					
				}
			}
		}
		
		if (updateFirstTime) {
			updateFirstTime = 0;
		} else {
			updateData();
		}
	}
	
}
