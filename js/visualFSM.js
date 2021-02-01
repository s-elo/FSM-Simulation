
/************************** drawing variables setting*******************************/
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('svg');
const svgWidth = svg.getAttribute('width');
const svgHeight = svg.getAttribute('height');

const CX = '100';
const CY = '200';
const R = '40';
const BR = '50';
const textFontSize = '20';
const enterColor = 'blue';
const leaveColor = 'black';
const controlAngle = 20;
const rotateAngle = 15;
const limStateNumber = 11;

var stateNumber = 0;
var circleArray = [];
var bigCircleArray = [];
var textArray = [];
var Tline = [];//line(start state, end state)
for (let i = 0; i < limStateNumber; i++) {
	Tline[i] = new Array(limStateNumber).fill(0);
}


//var Rline = [];//line(end state, start state)
//for (let i = 0; i < 10; i++) {
//	Rline[i] = new Array(10).fill(0);
//}

var selfLinkAngle = [];

var lineFlag = [];//record if the line being selected
for (let i = 0; i < limStateNumber; i++) {
	lineFlag[i] = new Array(limStateNumber).fill(0);
}

var circleFlag = new Array(limStateNumber).fill(0);//record if the circle being selected

var startState = new Array(limStateNumber).fill(0);

// var table = new Vue({
// 	el: '#table',
// 	data: {
// 		stateNumber: 0,
// 		textName: []
// 	}
// });

/**************************set a start state*******************************/
const startBtn = document.getElementById('setStartState');
startBtn.onclick = function () {
	for (let i = 1; i <= stateNumber; i++) {
		if (circleFlag[i] ===1 ) {
			bigCircleArray[i].setAttribute('stroke', 'black');
			startState[i] = 1;
		}
		else {
			bigCircleArray[i].setAttribute('stroke', 'transparent');
			startState[i] = 0;
		}
	}
}
/**************************delete*******************************/
const deleteBtn = document.getElementById('delete');
deleteBtn.onclick = function () {
	var TlineFlag = [];//avoid repeatedly handling
	for (let i = 0; i < limStateNumber; i++) {
		TlineFlag[i] = new Array(limStateNumber).fill(0);
	}
	
	for (let i = 1; i < lineFlag.length; i++) {
		//when select a circle
		if (circleFlag[i] === 1) {
			circleFlag[i] = 0;
			
			//delete the inputframe
			let forn = document.getElementById('f' + i);
			if (forn) {
				forn.parentNode.removeChild(forn);
			}
			
			//delete the related lines and the info table
			for (let k = 1; k < lineFlag[i].length; k++) {
				if (Tline[i][k] != 0) {
					//lineFlag[i][j] = 0;
					Tline[i][k].parentNode.removeChild(Tline[i][k]);
					Tline[i][k] = 0;
					//Rline[k][i] = 0;
					let lineTable = document.getElementById('table' + i + k);
					lineTable.parentNode.removeChild(lineTable);
				}
				if (Tline[k][i] != 0) {
					Tline[k][i].parentNode.removeChild(Tline[k][i]);
					//Rline[i][k] = 0;
					Tline[k][i] = 0;
					let lineTable = document.getElementById('table' + k + i);
					lineTable.parentNode.removeChild(lineTable);
					
					//delete the infor of the output at the k circle
					let circle = document.getElementById('circle' + k + i);
					circle.parentNode.removeChild(circle);
					
					let cirOutput = document.getElementById('cirOutput' + k + i);
					cirOutput.parentNode.removeChild(cirOutput); 
				}
			}
			
			circleArray[i].parentNode.removeChild(circleArray[i]);
			bigCircleArray[i].parentNode.removeChild(bigCircleArray[i]);
			textArray[i].parentNode.removeChild(textArray[i]);
			//delete information table of this state
			let ti = document.getElementById('table' + i);
			ti.parentNode.removeChild(ti);
			
			for (let q = i; q < stateNumber; q++) {
				//handle circles
				circleArray[q] = circleArray[q+1];
				circleArray[q].setAttribute('id', 'c' + q);
				circleArray[q+1] = null;
				let table = document.getElementById('table' + (q+1));
				table.setAttribute('id', 'table' + q);
				
				let circleinfo = document.getElementById('circle' + (q+1));
				circleinfo.setAttribute('id', 'circle' + q);
				circleinfo.innerHTML = `${textArray[q + 1].innerHTML}`;
				
				let cirOutput = document.getElementById('cirOutput' + (q+1));
				cirOutput.setAttribute('id', 'cirOutput' + q);
				
				//handle lines
				for (let p = 1; p <= stateNumber; p++) {
					//from p to q+1
					if ((Tline[p][q+1] != 0) && (TlineFlag[p][q+1] === 0)) {
						if (p < i) {
							Tline[p][q] = Tline[p][q+1];
							Tline[p][q+1] = 0;
							TlineFlag[p][q] = 1;
							
							let lineTable = document.getElementById('table' + p + (q+1));
							lineTable.setAttribute('id', 'table' + p + q);
							
							let line = document.getElementById('line' + p + (q+1));
							line.setAttribute('id', 'line' + p + q);
							//line.innerHTML = textArray[]
							let condition = document.getElementById('condition' + p + (q+1));
							condition.setAttribute('id', 'condition' + p + q);
							
							let Output = document.getElementById('output' + p + (q+1));
							Output.setAttribute('id', 'output' + p + q);
							
							for (let g = 1; g <= inputNumber; g++) {
								let input = document.getElementById('input' + p + (q+1) + g);
								input.setAttribute('id', 'input' + p + q + g);
							}
							
							for (let g = 1; g <= outputNumber; g++) {
								let output = document.getElementById('output' + p + (q+1) + g);
								output.setAttribute('id', 'output' + p + q + g);
							}
							
							//output at circle table
							let circle = document.getElementById('circle' + p + (q+1));
							circle.setAttribute('id', 'circle' + p + q);
							
							let circleOutput = document.getElementById('cirOutput' + p + (q+1));
							circleOutput.setAttribute('id', 'cirOutput' + p + q);
							
							for (let g = 1; g <= outputNumber; g++) {
								let ciroutput = document.getElementById('cirOutput' + p + (q+1) + g);
								ciroutput.setAttribute('id', 'cirOutput' + p + q + g);
							}
							
							// //update selflinkAngle
							// if (p === q) {
							// 	selfLinkAngle[p] = selfLinkAngle[p];
							// }
						}
						else {
							Tline[p-1][q] = Tline[p][q+1];
							Tline[p][q+1] = 0;
							TlineFlag[p-1][q] = 1;
							
							let lineTable = document.getElementById('table' + p + (q+1));
							lineTable.setAttribute('id', 'table' + (p-1) + q);
							
							let line = document.getElementById('line' + p + (q+1));
							line.setAttribute('id', 'line' + (p-1) + q);
							
							let condition = document.getElementById('condition' + p + (q+1));
							condition.setAttribute('id', 'condition' + (p-1) + q);
							
							let Output = document.getElementById('output' + p + (q+1));
							Output.setAttribute('id', 'output' + (p-1) + q);
							
							for (let g = 1; g <= inputNumber; g++) {
								let input = document.getElementById('input' + p + (q+1) + g);
								input.setAttribute('id', 'input' + (p-1) + q + g);
							}

							for (let g = 1; g <= outputNumber; g++) {
								let output = document.getElementById('output' + p + (q+1) + g);
								output.setAttribute('id', 'output' + (p-1) + q + g);
							}
							
							//output at circle table
							let circle = document.getElementById('circle' + p + (q+1));
							circle.setAttribute('id', 'circle' + (p-1) + q);
							
							let circleOutput = document.getElementById('cirOutput' + p + (q+1));
							circleOutput.setAttribute('id', 'cirOutput' + (p-1) + q);
							
							for (let g = 1; g <= outputNumber; g++) {
								let ciroutput = document.getElementById('cirOutput' + p + (q+1) + g);
								ciroutput.setAttribute('id', 'cirOutput' + (p-1) + q + g);
							}
							
							//update selflinkAngle
							if ((p - 1) === q) {
								selfLinkAngle[p-1] = selfLinkAngle[p];
							}
						}
					}

					//from q+1 to p
					if ((Tline[q+1][p] != 0) && (p != i) && (TlineFlag[q+1][p] === 0)) {
						//if the state order is smaller than the deleted state
						//no need to sub 1
						if (p < i) {
							Tline[q][p] = Tline[q+1][p];
							Tline[q+1][p] = 0;
							TlineFlag[q][p] = 1;
							//Rline[p][q] = Rline[p][q+1];
							//Rline[p][q+1] = 0;
							let lineTable = document.getElementById('table' + (q+1) + p);
							lineTable.setAttribute('id', 'table' + q + p);
							
							let line = document.getElementById('line' + (q+1) + p);
							line.setAttribute('id', 'line' + q + p);
							
							let condition = document.getElementById('condition' + (q+1) + p);
							condition.setAttribute('id', 'condition' + q + p);
							
							let Output = document.getElementById('output' + (q+1) + p);
							Output.setAttribute('id', 'output' + q + p);
							
							for (let g = 1; g <= inputNumber; g++) {
								let input = document.getElementById('input' + (q+1) + p + g);
								input.setAttribute('id', 'input' + q + p + g);
							}
							
							for (let g = 1; g <= outputNumber; g++) {
								let output = document.getElementById('output' + (q+1) + p + g);
								output.setAttribute('id', 'output' + q + p + g);
							}
							
							//output at circle table
							let circle = document.getElementById('circle' + (q+1) + p);
							circle.setAttribute('id', 'circle' + q + p);
							
							let circleOutput = document.getElementById('cirOutput' + (q+1) + p);
							circleOutput.setAttribute('id', 'cirOutput' + q + p);
							
							for (let g = 1; g <= outputNumber; g++) {
								let ciroutput = document.getElementById('cirOutput' + (q+1) + p + g);
								ciroutput.setAttribute('id', 'cirOutput' + q + p + g);
							}
							
							//update selflinkAngle
							if (q === p) {
								selfLinkAngle[q] = selfLinkAngle[q+1];
							}
						}
						//if the state order is bigger than the deleted state
						//need to sub 1
						else {
							// alert((q+1));
							// alert(p);
							Tline[q][p-1] = Tline[q+1][p];
							Tline[q+1][p] = 0;
							TlineFlag[q][p-1] = 1;
							//Rline[p-1][q] = Rline[p][q+1];
							//Rline[p][q+1] = 0;
							let lineTable = document.getElementById('table' + (q+1) + p);
							lineTable.setAttribute('id', 'table' + q + (p-1));
							
							let line = document.getElementById('line' + (q+1) + p);
							line.setAttribute('id', 'line' + q + (p-1));
							
							let condition = document.getElementById('condition' + (q+1) + p);
							condition.setAttribute('id', 'condition' + q + (p-1));
							
							let Output = document.getElementById('output' + (q+1) + p);
							Output.setAttribute('id', 'output' + q + (p-1));
							
							for (let g = 1; g <= inputNumber; g++) {
								let input = document.getElementById('input' + (q+1) + p + g);
								input.setAttribute('id', 'input' + q + (p-1) + g);
							}
							
							for (let g = 1; g <= outputNumber; g++) {
								let output = document.getElementById('output' + (q+1) + p + g);
								output.setAttribute('id', 'output' + q + (p-1) + g);
							}
							
							//output at circle table
							let circle = document.getElementById('circle' + (q+1) + p);
							circle.setAttribute('id', 'circle' + q + (p-1));
							
							let circleOutput = document.getElementById('cirOutput' + (q+1) + p);
							circleOutput.setAttribute('id', 'cirOutput' + q + (p-1));
							
							for (let g = 1; g <= outputNumber; g++) {
								let ciroutput = document.getElementById('cirOutput' + (q+1) + p + g);
								ciroutput.setAttribute('id', 'cirOutput' + q + (p-1) + g);
							}
							
							//update selflinkAngle
							if (q === (p - 1)) {
								selfLinkAngle[q] = selfLinkAngle[q+1];
							}
						}
					}
				}
				bigCircleArray[q] = bigCircleArray[q+1];
				bigCircleArray[q].setAttribute('id', 'C' + q);
				bigCircleArray[q+1] = null;
				
				textArray[q] = textArray[q+1];
				textArray[q].setAttribute('id', 't' + q);
				textArray[q+1] = null;
				
				//textArray[q].innerHTML = table.textName[q];
				cirBindDragEventById('c' + q);
				texBindDragEventById('t' + q);
			}
			
			stateNumber--;
			document.getElementById('table').innerHTML = `State Number: ${stateNumber}`;
			
			//chaneg the start state and selected state when the deleted state is a start state
			if (startState[i] ===1) {
				startState[i] = 0;
			}
			//all go to the state1 defaultly
			if (stateNumber != 0) {
				startState[1] = 1;
				bigCircleArray[1].setAttribute('stroke', 'black');
				circleArray[1].setAttribute('stroke-width', '5');
				circleFlag[1] = 1;
				document.getElementById('table1').style.display = 'inline-block';
			}
			return;
		}
		
		//when select a line
		for (let j = 1; j < lineFlag[i].length; j++) {
			if (lineFlag[i][j] === 1) {
				lineFlag[i][j] = 0;
				Tline[i][j].parentNode.removeChild(Tline[i][j]);
				Tline[i][j] = 0;
				
				//delete the table
				let lineTable = document.getElementById('table' + i + j);
				lineTable.parentNode.removeChild(lineTable);
				//Rline[j][i] = 0;
				
				//handle the output at circle table
				let circle = document.getElementById('circle' + i + j);
				circle.parentNode.removeChild(circle);
				
				let cirOutput = document.getElementById('cirOutput' + i + j);
				cirOutput.parentNode.removeChild(cirOutput);
				
				return;
			}
		}
	}
	alert("please select at least a element");
}

/**************************add a new state or circle*******************************/
const addStateBtn = document.getElementById('addState');
addStateBtn.onclick = function () {
	//see if the params has been set
	if ((!stepOneFlag) || (!finishFlag)) 
		alert('please finish the parameters setting at the left side'); 
	
	for (let i = 1; i <= stateNumber; i++) {
		document.getElementById('table' + i).style.display = 'none';
		circleArray[i].setAttribute('stroke-width', '3');
		circleFlag[i] = 0;
	}
	
	stateNumber++;

	document.getElementById('table').innerHTML = `State Number: ${stateNumber}`;
	var newCircle = createElem('circle', {'class':'circle', 'id':'c' + stateNumber, 
							   'cx':CX, 'cy':CY, 'r':R, 
							   'stroke':'black', 'stroke-width':'3', 'fill':'transparent'});
	var newBigCircle = createElem('circle', {'class':'circle', 'id':'C' + stateNumber, 
								  'cx':CX, 'cy':CY, 'r':BR, 
								  'stroke':'transparent', 'stroke-width':'2', 'fill':'transparent'});
	if (stateNumber === 1) {
		newBigCircle.setAttribute('stroke', 'black');
		startState[1] = 1;
	}
	svg.appendChild(newBigCircle);
	svg.appendChild(newCircle);
	
	//get the text coordinates
	var tx = CX;
	var ty = parseInt(CY) + parseInt(textFontSize) / 2 - 2;
	
	var newText = createElem('text', {'class':'text', 'id':'t' + stateNumber, 
									  'x':tx, 'y':ty, 
									  'font-size':textFontSize, 'text-anchor':'middle'});
	newText.innerHTML = 'state' + stateNumber;
	// table.textName[table.stateNumber] = newText.innerHTML;
	// table.textName.reverse().reverse();//keep updated in HTML
	
	svg.appendChild(newText);
	cirBindDragEventById('c' + stateNumber);// include binding the bigcircle 
	texBindDragEventById('t' + stateNumber);
	
	//record each obj
	circleArray[stateNumber] = newCircle;
	bigCircleArray[stateNumber] = newBigCircle;
	textArray[stateNumber] = newText;
	
	//display current state
	var content = `<div id = ${'table' + stateNumber} >
				      <h4>Current State: </h4>
					  <p id = ${'circle' + stateNumber}>${textArray[stateNumber].innerHTML}</p>
					  <hr />
					  <h4>output:</h4>
					  <div id = ${'cirOutput' + stateNumber}></div>
				   </div>`;
	addHtmlById('dataTable', 'beforeEnd', content);
	
	//select this new state
	circleFlag[stateNumber] = 1;
	circleArray[stateNumber].setAttribute('stroke-width', '5');
	/**************************binding the events of big circles*******************************/
	newBigCircle.onmouseenter = function () {
		var i = this.getAttribute('id').slice(1, this.getAttribute('id').length);
		var circle = document.getElementById('c' + i);
		//this.style.stroke = enterColor;
		this.style.cursor = 'crosshair';
		circle.style.stroke = enterColor;
	}
	
	newBigCircle.onmousedown = function (event) {
		var groupIndex = this.getAttribute('id').slice(1, this.getAttribute('id').length);
		groupIndex = parseInt(groupIndex);
		var circleCx = circleArray[groupIndex].getAttribute('cx');
		var circleCy = circleArray[groupIndex].getAttribute('cy');
		
		event = event || window.event;
		event.preventDefault();//avoid the text being selected
		
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		
		var svgLeft = getElementLeft(document.getElementById('svgContainer'));
		var svgTop = getElementTop(document.getElementById('svgContainer'));
		
		var x = event.clientX - svgLeft + scrollX;
		var y = event.clientY - svgTop + scrollY;
		
		var dis = pointDistance(circleCx, circleCy, x, y);
		
		
		//(startX-circleCx)/(x-circleCx) = R/dis
		//(circleCy-startY)/(circleCy-y) = R/dis
		startX = (R / dis) * (x - circleCx) + parseInt(circleCx);
		startY = parseInt(circleCy) - (R / dis) * (circleCy - y);

		var newLine = createElem('path', {'class':'line',
										  'd':'M' + startX + ' ' + startY + 'L' + startX + ' ' + startY,
										  'stroke':'black', 'fill':'transparent', 'stroke-width':'3'});						  
		newLine.setAttribute('marker-end', 'url(#markerArrow)');
		svg.appendChild(newLine);
		
		document.onmousemove = function (event) {
			//avoid the text being selected
			newBigCircle.releaseCapture && newBigCircle.releaseCapture();
			event = event || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			
			var xm = event.clientX - svgLeft + scrollX;
			var ym = event.clientY - svgTop + scrollY;
			
			var dism = pointDistance(circleCx, circleCy, xm, ym);
			
			//(startXm-circleCx)/(xm-circleCx) = R/dis
			//(circleCy-startYm)/(circleCy-ym) = R/dis
			startXm = (R / dism) * (xm - circleCx) + parseInt(circleCx);
			startYm = parseInt(circleCy) - (R / dism) * (circleCy - ym);
				
			if (dism <= BR) {
				//if there is not a selfLink
				if (Tline[groupIndex][groupIndex] === 0) {
					drawSelfCur(newLine, circleCx, circleCy, xm, ym, groupIndex);
					newLine.setAttribute('marker-end', 'url(#markerArrow)');
				}
			}
			else {
				newLine.setAttribute('d', 'M' + startXm + ' ' + startYm + 'L' + xm + ' ' + ym);
				newLine.setAttribute('marker-end', 'url(#markerArrow)');
			}
		}
		
		document.onmouseup = function (event) {
			//avoid the text being selected
			newBigCircle.releaseCapture && newBigCircle.releaseCapture();
			
			event = event || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			
			var xu = event.clientX - svgLeft + scrollX;
			var yu = event.clientY - svgTop + scrollY;
			
			var disu = pointDistance(circleCx, circleCy, xu, yu);
			
			startXu = (R / disu) * (xu - circleCx) + parseInt(circleCx);
			startYu = parseInt(circleCy) - (R / disu) * (circleCy - yu);
			
			var flag = 0;
			for (let i = 1; i <= stateNumber; i++) {
				var bcir = document.getElementById('C' + i);
				var bcx = bcir.getAttribute('cx');
				var bcy = bcir.getAttribute('cy');
				
				var disu = pointDistance(bcx, bcy, xu, yu);
				var dis = pointDistance(bcx, bcy, circleCx, circleCy);
				
				if ((disu <= BR) && (Tline[groupIndex][i] === 0)) {
					flag = 1;
					if (i === groupIndex) {
						drawSelfCur(newLine, circleCx, circleCy, xu, yu, groupIndex);
						Tline[groupIndex][i] = newLine;
						//Rline[i][groupIndex] = newLine;
					}
					else {
						var tr = parseInt(R) + 10;//give some space for arrow
						//(endX-circleCx)/(bcx-circleCx) = (dis-tr)/dis
						//(endY-circleCy)/(bcy-circleCy) = (dis-tr)/dis
						var endX = ((dis - tr) / dis) * (bcx - circleCx) + parseInt(circleCx);
						var endY = ((dis - tr) / dis) * (bcy - circleCy) + parseInt(circleCy);
						
						//when two links
						if (Tline[i][groupIndex] != 0) {
							//draw the curve
							drawCurves(newLine, groupIndex, i, startXu, startYu, endX, endY, controlAngle, rotateAngle, tr);
							Tline[groupIndex][i] = newLine;
							//Rline[i][groupIndex] = newLine;
							
							//reverse
							endX = (tr / disu) * (xu - circleCx) + parseInt(circleCx);
							endY = parseInt(circleCy) - (tr / disu) * (circleCy - yu);
							startXu = ((dis - R) / dis) * (bcx - circleCx) + parseInt(circleCx);
							startYu = ((dis - R) / dis) * (bcy - circleCy) + parseInt(circleCy);
							drawCurves(Tline[i][groupIndex], i, groupIndex, startXu, startYu, endX, endY, controlAngle, rotateAngle, tr);
						}
						else {
							//link the two circles
							Tline[groupIndex][i] = newLine;
							Tline[groupIndex][i].setAttribute('d', 'M' + startXu + ' ' + startYu + 
															  'L' + endX + ' ' + endY);
							//Rline[i][groupIndex] = newLine;
						}
					}
					
					//create a info table for this line
					var lineTableContent = `<div class="lineTable" id=${'table' + groupIndex + i}>
										<h4>Current Line:</h4>
										<p id=${'line' + groupIndex + i}>
										${textArray[groupIndex].innerHTML} => ${textArray[i].innerHTML}</p>
										<br />
										<h4>condition: </h4>
										<div id=${'condition' + groupIndex + i}>`;
											
					var inlen = 1;
					if(inputType.value === 'bit'){
						inlen = 1;
					}else{
						inlen = parseInt(inputFrom.value)+1;
					}
					
					for (let k = 1; k <= inputNumber; k++) {
						if (document.getElementById('input' + k)) {
							var inputName = document.getElementById('input' + k).value;
						}
						else {
							var inputName = '';
						}
						lineTableContent += `<p>${inputName}: 
											 <select id=${'input' + groupIndex + i + k}>`;
						for (let b = 0; b < (2 ** inlen); b++) {
							let str = decToBinary(b, inlen);
							lineTableContent += `<option value=${str}>${str}</option>`;
						}
						lineTableContent += `<option value='X'>X</option>`;
						lineTableContent += `</select></p>`;
					}
					lineTableContent += `</div><br />
										 <h4>output: </h4>
										 <div id=${'output' + groupIndex + i}>`;
										
					var outlen = 1;
					if(outputType.value === 'bit'){
						outlen = 1;
					}else{
						outlen = parseInt(outputFrom.value)+1;
					}
					
					for (let k = 1; k <= outputNumber; k++) {
						//alert(document.getElementById('input' + k))
						if (document.getElementById('output' + k)) {
							var outputName = document.getElementById('output' + k).value;
						}
						else {
							var outputName = '';
						}
						
						lineTableContent += `<p>${outputName}: 
											 <select id=${'output' + groupIndex + i + k}>`;
						for (let b = 0; b < (2 ** outlen); b++) {
							let str = decToBinary(b, outlen);
							lineTableContent += `<option value=${str}>${str}</option>`;
						}
						lineTableContent += `</select></p>`;
					}
					lineTableContent += `</div></div>`;
					addHtmlById('dataTable', 'beforeEnd', lineTableContent);
					
					//ouput infor at circle table
					//var cirOutput = document.getElementById('cirOutput' + groupIndex);
					var cirOutputContent = `<p id = ${'circle' + groupIndex + i}>=> ${textArray[i].innerHTML}:</p>
											<div id = ${'cirOutput'+ groupIndex + i}>`;
						
					for (let k = 1; k <= outputNumber; k++) {
						if (document.getElementById('output' + k)) {
							var outputName = document.getElementById('output' + k).value;
						}
						else {
							var outputName = '';
						}
						var outputValue = document.getElementById('output' + groupIndex + i + k).value;
						cirOutputContent += `<p id = ${'cirOutput' + groupIndex + i + k}>
											 ${outputName}: ${outputValue}</p>`;
					}
					cirOutputContent += `<hr /></div>`;
					addHtmlById('cirOutput' + groupIndex, 'beforeEnd', cirOutputContent);
					
					//binding the ouput value event to syncronize the value at circle table
					for (let k = 1; k <= outputNumber; k++) {
						let outputValue = document.getElementById('output' + groupIndex + i + k);
						
						outputValue.onchange = function () {
							//alert('555');
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
					
					//remind user to set the parameters first
					var remindFlag = 0;
					if (stepOneFlag === 1) {
						for (let i = 1; i <= inputNumber; i++) {
							if (document.getElementById('input' + i).value === '') {
								alert('please set the parameters at the left table first');
								remindFlag = 1;
							}
						}
						for (let i = 1; i <= outputNumber; i++) {
							if ((document.getElementById('output' + i).value === '') && (remindFlag === 0)) {
								alert('please set the parameters at the left table first');
								//remindFlag = 1;
							}
						}
					}
					else {
						alert('please set the parameters at the left table first');
						//remindFlag = 1;
					}
					
					//select this new line 
					//make other line tables invisible
					for (let q = 1; q < lineFlag.length; q++) {
						for (let t = 1; t < lineFlag[q].length; t++) {
							if (Tline[q][t] != 0) {
								lineFlag[q][t] = 0;
								Tline[q][t].setAttribute('stroke', 'black');
								Tline[q][t].setAttribute('stroke-width', '3');
								document.getElementById('table' + q + t).style.display = 'none';
							}
						}
					}
					document.getElementById('table' + groupIndex + i).style.display = 'block';
					Tline[groupIndex][i].setAttribute('stroke', 'blue');
					Tline[groupIndex][i].setAttribute('stroke-width', '5');
					lineFlag[groupIndex][i] = 1;
					
					//make circle tables invisible
					for (let i = 1; i <= stateNumber; i++) {
						circleArray[i].setAttribute('stroke-width', '3');
						circleFlag[i] = 0;
						document.getElementById('table' + i).style.display = 'none';
					}
					
				}
				
				/**************************binding the events of lines (delete)*******************************/
				Tline[groupIndex][i].onclick = function (event) {
					//remind user to set the parameters first
					var remindFlag = 0;
					if (stepOneFlag === 1) {
						for (let i = 1; i <= inputNumber; i++) {
							if (document.getElementById('input' + i).value === '') {
								alert('please set the parameters at the left table first');
								remindFlag = 1;
							}
						}
						for (let i = 1; i <= outputNumber; i++) {
							if ((document.getElementById('output' + i).value === '') && (remindFlag === 0)) {
								alert('please set the parameters at the left table first');
								//remindFlag = 1;
							}
						}
					}
					else {
						alert('please set the parameters at the left table first');
						//remindFlag = 1;
					}
					
					event.stopPropagation();//avoid click the SVG
					this.setAttribute('stroke', 'blue');
					this.setAttribute('stroke-width', '5');
					line = this;
					
					var groupIndex1;
					var groupIndex2;
					for (let i = 1; i < limStateNumber; i++) {
						if (i <= stateNumber) {
							circleArray[i].setAttribute('stroke-width', '3');
							circleFlag[i] = 0;
						}
						
						for (let j = 1; j < limStateNumber; j++) {
							if (Tline[i][j] === this) {
								groupIndex1 = i;
								groupIndex2 = j;
								//alert(i + ' ' + j);
								lineFlag[i][j] = 1;
							}
							if ((Tline[i][j] != 0) && (Tline[i][j] != this)) {
								lineFlag[i][j] = 0;
								Tline[i][j].setAttribute('stroke', 'black');
								Tline[i][j].setAttribute('stroke-width', '3');
								//Rline[j][i].setAttribute('stroke', 'black');
								//Rline[j][i].setAttribute('stroke-width', '3');
							}
						}
					}
					
					svg.onclick = function () {
						lineFlag[groupIndex1][groupIndex2] = 0;
						line.setAttribute('stroke', 'black');
						line.setAttribute('stroke-width', '3');
						this.onclick = null;
					}
					
					//make table information for circles invisible
					for (let i = 1; i <= stateNumber; i++) {
						document.getElementById('table' + i).style.display = 'none';
					}
					
					//make table information for lines invisible
					for (let q = 1; q < lineFlag.length; q++) {
						for (let t = 1; t < lineFlag[q].length; t++) {
							if (document.getElementById('table' + q + t)) {
								document.getElementById('table' + q + t).style.display = 'none';
							}
						}
					}
					document.getElementById('table' + groupIndex1 + groupIndex2).style.display = 'block';
				}
			}
			
			//see if there is a linked circle
			if (flag === 0) {
				newLine.parentNode.removeChild(newLine);
			}
			
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
	
	newBigCircle.onmouseleave = function () {
		var i = this.getAttribute('id').slice(1, this.getAttribute('id').length);
		var circle = document.getElementById('c' + i);
		//this.style.stroke = leaveColor;
		circle.style.stroke = leaveColor;
	}
	
	
	
	/**************************binding the events of circles*******************************/
	//when select a circle
	newCircle.onclick = function (event) {
		event.stopPropagation();//avoid click the SVG
		this.setAttribute('stroke-width', '5');
		circle = this;
		
		var index;
		for (let i = 1; i < circleFlag.length; i++) {
			if (circleArray[i] === this) {
				index = i;
				circleFlag[i] = 1;
			}
			if ((circleArray[i]) && (circleArray[i] != this) && (i <= stateNumber)) {
				circleArray[i].setAttribute('stroke-width', '3');
				circleFlag[i] = 0;
			}
			for (let j = 1; j < circleFlag.length; j++) {
				if (Tline[i][j] != 0) {
					lineFlag[i][j] = 0;
					Tline[i][j].setAttribute('stroke', 'black');
					Tline[i][j].setAttribute('stroke-width', '3');
					//Rline[j][i].setAttribute("stroke", "black");
					//Rline[j][i].setAttribute("stroke-width", "3");
				}
			}
		}
		svg.onclick = function () {
			circle.setAttribute('stroke-width', '3');
			circleFlag[index] = 0;
			
			//avoid  other inputframe at other circles
			for (let j = 1; j <= stateNumber; j++) {
				let forn = document.getElementById('f' + j);
				//alert(foreign);
				let txt = document.getElementById('t' + j);
				if (forn) {
					txt.innerHTML = forn.firstChild.value;
					forn.parentNode.removeChild(forn);
				}
			}
			this.onclick = null;
		}
		
		//table information for circles
		for (let i = 1; i <= stateNumber; i++) {
			document.getElementById('table' + i).style.display = 'none';
		}
		document.getElementById('table' + index).style.display = 'inline-block';
		
		//make table information for lines invisible
		for (let q = 1; q < lineFlag.length; q++) {
			for (let t = 1; t <= lineFlag[q].length; t++) {
				if (document.getElementById('table' + q + t)) {
					document.getElementById('table' + q + t).style.display = 'none';
				}
			}
		}
	}
	//when double click the circles, create the input frame
	newCircle.ondblclick = function () {
		var x = this.getAttribute('cx') - R + 5;
		var y = this.getAttribute('cy') - textFontSize / 2 - 8;
		var i = this.getAttribute('id').slice(1, this.getAttribute('id').length);
		var cir = document.getElementById('c' + i);
		var text = document.getElementById('t' + i);
		
		//avoid  other inputframe at other circles
		for (let j = 1; j <= stateNumber; j++) {
			let forn = document.getElementById('f' + j);
			//alert(foreign);
			let txt = document.getElementById('t' + j);
			if (forn && (j != i)) {
				txt.innerHTML = forn.firstChild.value;
				forn.parentNode.removeChild(forn);
			}
		}
		
		//avoid creating multiple inputFrame
		if (document.getElementById('f' + i)) {
			return;
		}
		
		
		var foreign = createElem('foreignObject', {'id':'f' + i, 'x':x, 'y':y, 
								 'width':'70', 'height':'30'});
		foreign.innerHTML = "<input type='text'/>";
		svg.appendChild(foreign);
		
		//save the last value;
		foreign.firstChild.value = text.innerHTML;
		//temperorily set blank for being invisible behind the input frame
		text.innerHTML = '';
		//show the cursor and select the value at the beginning
		foreign.firstChild.focus();
		foreign.firstChild.selectionStart = 0;
		foreign.firstChild.selectionEnd = foreign.firstChild.value.length;
		
		//when click beyond the circles, delete the input frame
		svg.onclick = function (event) {
			event = event || window.event;
			
			var svgLeft = getElementLeft(document.getElementById('svgContainer'));
			var svgTop = getElementTop(document.getElementById('svgContainer'));
			var dis = pointDistance(cir.getAttribute('cx'), cir.getAttribute('cy'), event.clientX-svgLeft, event.clientY-svgTop);
			//alert(dis);
			if (dis > R) {
				text.innerHTML = foreign.firstChild.value;
				// table.textName[i] = foreign.firstChild.value;
				// table.textName.reverse().reverse();
				
				document.getElementById('circle' + i).innerHTML = `${textArray[i].innerHTML}`;
				
				//change the stateName at line info table
				for (let k = 1; k < lineFlag.length; k++) {
					if (Tline[i][k] != 0) {
						let lineinfo = document.getElementById('line' + i + k);
						lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
					}
					if (Tline[k][i] != 0) {
						let lineinfo = document.getElementById('line' + k + i);
						lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;
						
						let nextText = document.getElementById('circle' + k + i);
						nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
					}
				}
				
				foreign.parentNode.removeChild(foreign);
				this.onclick = null;//cancel this event everytime
			}
		}
		
		foreign.firstChild.onchange = function () {
			//var text = document.getElementById("t"+i);
			if (this.value != '') {
				text.innerHTML = this.value;
				// table.textName[i] = this.value;
				// table.textName.reverse().reverse();
				
				document.getElementById('circle' + i).innerHTML = `${textArray[i].innerHTML}`;
				
				//change the stateName at line info table
				for (let k = 1; k < lineFlag.length; k++) {
					if (Tline[i][k] != 0) {
						let lineinfo = document.getElementById('line' + i + k);
						lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
					}
					if (Tline[k][i] != 0) {
						let lineinfo = document.getElementById('line' + k + i);
						lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;
					
						let nextText = document.getElementById('circle' + k + i);
						nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
					}
				}
				
				foreign.parentNode.removeChild(foreign);
			}
			else {
				alert("please enter the value~");
				this.focus();
			}
		}
	}
	
	/**************************binding the events of text*******************************/
	//when click text => select the circle
	newText.onclick = function (event) {
		event.stopPropagation();
		var num = this.getAttribute('id').slice(1, this.getAttribute('id').length);
		circleArray[num].setAttribute('stroke-width', '5');
		
		var index;
		for (let i = 1; i < circleFlag.length; i++) {
			if (circleArray[i] === circleArray[num]) {
				index = i;
				circleFlag[i] = 1;
			}
			if ((circleArray[i]) && (circleArray[i] != circleArray[num])) {
				circleArray[i].setAttribute('stroke-width', '3');
				circleFlag[i] = 0;
			}
			for (let j = 1; j < circleFlag.length; j++) {
				if (Tline[i][j] != 0) {
					lineFlag[i][j] = 0;
					Tline[i][j].setAttribute('stroke', 'black');
					Tline[i][j].setAttribute('stroke-width', '3');
					//Rline[j][i].setAttribute("stroke", "black");
					//Rline[j][i].setAttribute("stroke-width", "3");
				}
			}
		}
		svg.onclick = function () {
			circleArray[num].setAttribute('stroke-width', '3');
			circleFlag[index] = 0;
			
			for (let j = 1; j <= stateNumber; j++) {
				let forn = document.getElementById('f' + j);
				//alert(foreign);
				let txt = document.getElementById('t' + j);
				if (forn) {
					txt.innerHTML = forn.firstChild.value;
					forn.parentNode.removeChild(forn);
				}
			}
			this.onclick = null;
		}
		
		//make table information for circles invisible
		for (let i = 1; i <= stateNumber; i++) {
			document.getElementById('table' + i).style.display = 'none';
		}
		document.getElementById('table' + index).style.display = 'inline-block';
		
		//make table information for lines invisible
		for (let q = 1; q < lineFlag.length; q++) {
			for (let t = 1; t <= lineFlag[q].length; t++) {
				if (document.getElementById('table' + q + t)) {
					document.getElementById('table' + q + t).style.display = 'none';
				}
			}
		}
		document.onmousemove = null;
	}
	//when double click the text, create the input frame
	newText.ondblclick = function () {
		document.onmousemove = null;
		
		var i = this.getAttribute('id').slice(1, this.getAttribute('id').length);
		var cir = document.getElementById('c' + i);
		var text = document.getElementById('t' + i);
		
		var x = cir.getAttribute('cx') - R + 5;
		var y = cir.getAttribute('cy') - textFontSize / 2 - 8;
		
		for (let j = 1; j <= stateNumber; j++) {
			let forn = document.getElementById('f' + j);
			let txt = document.getElementById('t' + j);
			if (forn && (j != i)) {
				txt.innerHTML = forn.firstChild.value;
				forn.parentNode.removeChild(forn);
			}
		}
		
		//avoid creating multiple inputFrame
		if (document.getElementById('f' + i)) {
			return;
		}
		
		var foreign = createElem('foreignObject', {'id':'f' + i, 'x':x, 'y':y, 
								 'width':'70', 'height':'30'});
		foreign.innerHTML = "<input type='text'/>";
		svg.appendChild(foreign);
		
		//save the last value;
		foreign.firstChild.value = text.innerHTML;
		//temperorily set blank
		text.innerHTML = '';
		//show the cursor and select the value at the beginning
		foreign.firstChild.focus();
		foreign.firstChild.selectionStart = 0;
		foreign.firstChild.selectionEnd = foreign.firstChild.value.length;
		
		//when click beyond the circles, delete the input frame
		svg.onclick = function (event) {
			event = event || window.event;
			var svgLeft = getElementLeft(document.getElementById('svgContainer'));
			var svgTop = getElementTop(document.getElementById('svgContainer'));
			var dis = pointDistance(cir.getAttribute('cx'), cir.getAttribute('cy'), event.clientX-svgLeft, event.clientY-svgTop);
			
			if (dis > R) {
				text.innerHTML = foreign.firstChild.value;
				// table.textName[i] = foreign.firstChild.value;
				// table.textName.reverse().reverse();
				
				document.getElementById('circle' + i).innerHTML = `${textArray[i].innerHTML}`;
				
				//change the stateName at line info table
				for (let k = 1; k < lineFlag.length; k++) {
					if (Tline[i][k] != 0) {
						let lineinfo = document.getElementById('line' + i + k);
						lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
					}
					if (Tline[k][i] != 0) {
						let lineinfo = document.getElementById('line' + k + i);
						lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;
						
						let nextText = document.getElementById('circle' + k + i);
						nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
					}
				}
				
				//console.log(table.textName[i]);
				foreign.parentNode.removeChild(foreign);
				this.onclick = null;//cancel this event everytime
			}
		}
		
		foreign.firstChild.onchange = function () {
			var text = document.getElementById('t' + i);
			if (this.value != '') {
				text.innerHTML = this.value;
				// table.textName[i] = this.value;
				// table.textName.reverse().reverse();
				
				document.getElementById('circle' + i).innerHTML = `${textArray[i].innerHTML}`;
				
				//change the stateName at line info table
				for (let k = 1; k < lineFlag.length; k++) {
					if (Tline[i][k] != 0) {
						let lineinfo = document.getElementById('line' + i + k);
						lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
					}
					if (Tline[k][i] != 0) {
						let lineinfo = document.getElementById('line' + k + i);
						lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;
						
						let nextText = document.getElementById('circle' + k + i);
						nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
					}
				}
				foreign.parentNode.removeChild(foreign);
			}
			else {
				alert("please enter the value~");
				this.focus();
			}
		}
	}
}

/**************************functions definition********************************/
/*createElem("circle", {'cx':'500', 'cy':'500', 'r':'50'})
 *JSON format*/
function createElem(tag, objAttr) {
	var elem = document.createElementNS(svgNS, tag);
	for (var attr in objAttr) {
		elem.setAttribute(attr, objAttr[attr]);
	}
	return elem;
}


//when drag text
function texBindDragEventById(id) {
	var text = document.getElementById(id);
	var groupIndex = id.slice(1, id.length);
	groupIndex = parseInt(groupIndex);
	var circle = document.getElementById('c' + groupIndex);
	var bigCircle = document.getElementById('C' + groupIndex);
	
	//change style
	text.onmouseenter = function () {
		circle.style.stroke = enterColor;
		//bigCircle.style.stroke = enterColor;
	}
	text.onmouseleave = function () {
		circle.style.stroke = leaveColor;
		//bigCircle.style.stroke = leaveColor;
	}
	
	text.onmousedown = function (event) {
		event = event || window.event;
		var dx = event.clientX - text.getAttribute('x');
		var dy = event.clientY - text.getAttribute('y');
		
		//change style
		// circle.setAttribute("r", parseInt(R)+5);
		// bigCircle.setAttribute("r", parseInt(BR)+5);
		
		
		document.onmousemove = function (event) {
			event = event || window.event;
			var left = event.clientX - dx;
			var top = event.clientY - dy;
			
			var cirLeft = left;
			var cirTop = top - textFontSize / 2 + 2;
			
			//deal with the boundary
			if ((cirLeft <= bigCircle.getAttribute('r'))) {
				cirLeft = bigCircle.getAttribute('r');
				left = cirLeft;
			}
			if ((cirTop <= bigCircle.getAttribute('r'))) {
				cirTop = bigCircle.getAttribute('r');
				//top = cirTop + textFontSize/2 - 2;
				top = 58;
			}
			if (((svgWidth - cirLeft) <= bigCircle.getAttribute('r'))) {
				cirLeft = svgWidth - bigCircle.getAttribute('r');
				left = cirLeft;
			}
			if (((svgHeight - cirTop) <= bigCircle.getAttribute('r'))) {
				cirTop = svgHeight - bigCircle.getAttribute('r');
				top = cirTop + textFontSize / 2 - 2;
			}
			
			//avoid overlap(only two)
			var elemIndex = parseInt(id.slice(1, id.length));
			//circlePosition[elemIndex] = [cirLeft, cirTop];
			
			if (stateNumber > 1) {
			   for (let i = 1; i < (stateNumber + 1); i++) {
				  if (elemIndex != i) {
					var cir = document.getElementById('c' + i);
					let cirLeft1 = parseInt(cir.getAttribute('cx'));
					let cirTop1 = parseInt(cir.getAttribute('cy'));
					
					var dis = pointDistance(cirLeft,cirTop, cirLeft1, cirTop1);
					if (dis <= parseInt(2 * BR + 5)) {
					  //similar triangle principle
					  var offY = (((2 * BR + 5) - dis) / dis) * (cirTop1 - cirTop);
					  var offX = (((2 * BR + 5) - dis) / dis) * (cirLeft1 - cirLeft);
					  cirLeft = cirLeft - offX;
					  cirTop = cirTop - offY;
					 
					  //boudary problem
					  if (cirTop <= BR) {
						  cirTop = BR;
						  if (cirLeft >= cirLeft1) {
							cirLeft = cirLeft1 + Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
						  }
						  else {
							cirLeft = cirLeft1 - Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
						  }
					  }
					  if ((svgHeight - cirTop) <= BR) {
						  cirTop = svgHeight - BR;
						  if (cirLeft >= cirLeft1) {
							  cirLeft = cirLeft1 + Math.sqrt((2 * BR) ** 2 - ((svgHeight - BR) - cirTop1) ** 2);
						  }
						  else {
							  cirLeft = cirLeft1 - Math.sqrt((2 * BR) ** 2 - ((svgHeight - BR) - cirTop1) ** 2);
						  }
					  }
					  
					  if (cirLeft <= BR) {
						  cirLeft = BR;
						  if (cirTop >= cirTop1) {
							  cirTop = cirTop1 + Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
						  }
						  else {
							  cirTop = cirTop1 - Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
						  }
					  }
					  if ((svgWidth - cirLeft) <= BR) {
						  cirLeft = svgWidth - BR;
						  if (cirTop >= cirTop1) {
							  cirTop = cirTop1 + Math.sqrt((2 * BR) ** 2 - ((svgWidth - BR) - cirLeft1) ** 2);
						  }
						  else {
							  cirTop = cirTop1 - Math.sqrt((2 * BR) ** 2 - ((svgWidth - BR) - cirLeft1) ** 2);
						  }			  
					  }
					  
					  left = cirLeft;
					  top = cirTop + textFontSize / 2 - 2;
					  if (cirTop === bigCircle.getAttribute('r')) {
						 top = 58;
					  }
				   }
				 }
			   }
			}
			
			text.setAttribute('x', left);
			text.setAttribute('y', top);
			
			circle.setAttribute('cx', cirLeft);
			circle.setAttribute('cy', cirTop);
			
			bigCircle.setAttribute('cx', cirLeft);
			bigCircle.setAttribute('cy', cirTop);
			
			//lines
			for (let i = 1; i <= stateNumber; i++) {
				//as a start circle
				if (Tline[groupIndex][i] != 0) {
					var cx = circleArray[i].getAttribute('cx');
					var cy = circleArray[i].getAttribute('cy');
					
					//if it is a selflink
					if (i === groupIndex) {
						var x = pointOnCircle(cx, cy, parseInt(cx) + R, cy, selfLinkAngle[i], R)[0];
						var y = pointOnCircle(cx, cy, parseInt(cx) + R, cy, selfLinkAngle[i], R)[1];
						
						drawSelfCur(Tline[groupIndex][i], cx, cy, x, y, i);
					}
					else {
						var dis = pointDistance(cx, cy, cirLeft, cirTop);
						
						var tr = parseInt(R) + 10;//give some space for arrow
						//(startX-cirleft)/(cx-cirleft) = R/dis
						//(startY-cirtop)/(cy-cirtop) = R/dis
						var startX = (R / dis) * (cx - cirLeft) + parseInt(cirLeft);
						var startY = (R / dis) * (cy - cirTop) + parseInt(cirTop);
						
						//(endX-cirLeft)/(cx-cirLeft) = (dis-tr)/dis
						//(endY-cirTop)/(cy-cirTop) = (dis-tr)/dis
						var endX = ((dis - tr) / dis) * (cx - cirLeft) + parseInt(cirLeft);
						var endY = ((dis - tr) / dis) * (cy - cirTop) + parseInt(cirTop);
						
						//if two links
						if (Tline[i][groupIndex] != 0) {
							
							drawCurves(Tline[groupIndex][i], groupIndex, i, startX, startY, endX, endY, controlAngle, rotateAngle, tr);
							
							//reverse
							startX = ((dis - R) / dis) * (cx - cirLeft) + parseInt(cirLeft);
							startY = ((dis - R) / dis) * (cy - cirTop) + parseInt(cirTop);
							endX = (tr / dis) * (cx - cirLeft) + parseInt(cirLeft);
							endY = (tr / dis) * (cy - cirTop) + parseInt(cirTop);
							drawCurves(Tline[i][groupIndex], i, groupIndex, startX, startY, endX, endY, controlAngle, rotateAngle, tr);
						}
						else{
							Tline[groupIndex][i].setAttribute('d', 'M' + startX + ' ' + startY + 'L' + endX + ' ' + endY);
						}
					}
					continue;
				}
				//as a end circle  
				if (Tline[i][groupIndex] != 0) {
					var cx = circleArray[i].getAttribute('cx');
					var cy = circleArray[i].getAttribute('cy');
					var dis = pointDistance(cx, cy, cirLeft, cirTop);
					
					var tr = parseInt(R) + 10;//give some space for arrow
					//(startX-cx)/(cirleft-cx) = R/dis
					//(startY-cy)/(cirtop-cy) = R/dis
					var startX = (R / dis) * (cirLeft - cx) + parseInt(cx);
					var startY = (R / dis) * (cirTop - cy) + parseInt(cy);
					
					//(endX-cx)/(cirLeft-cx) = (dis-tr)/dis
					//(endY-cy)/(cirTop-cy) = (dis-tr)/dis
					var endX = ((dis - tr) / dis) * (cirLeft - cx) + parseInt(cx);
					var endY = ((dis - tr) / dis) * (cirTop - cy) + parseInt(cy);
					
					Tline[i][groupIndex].setAttribute('d', 'M' + startX + ' ' + startY + 'L' + endX + ' ' + endY);
				}
			}
			
			document.onmouseup = function () {
			   //change style
			   // circle.setAttribute("r", parseInt(R));
			   // bigCircle.setAttribute("r", parseInt(BR));
			   
			   document.onmousemove = null;
			   document.onmouseup = null;
			}
			return false;
		}
	}
}

//when drag circles
function cirBindDragEventById(id) {
	var groupIndex = id.slice(1, id.length);
	groupIndex = parseInt(groupIndex);
	var elem = document.getElementById(id);
	var elemText = document.getElementById('t' + groupIndex);
	var bigCircle = document.getElementById('C' + groupIndex);
	
	//change style
	elem.onmouseenter = function () {
		this.style.stroke = enterColor;
		//bigCircle.style.stroke = enterColor;
	}
	elem.onmouseleave = function () {
		this.style.stroke = leaveColor;
		//bigCircle.style.stroke = leaveColor;
	}
	
	elem.onmousedown = function (event) {
	  elem.setCapture && elem.setCapture(); 
	  event = event || window.event;
	  var dx = event.clientX - elem.getAttribute('cx');
	  var dy = event.clientY - elem.getAttribute('cy');
	  
	  //change style
	  // elem.setAttribute("r", parseInt(R)+5);
	  // bigCircle.setAttribute("r", parseInt(BR)+5);
	  
	  document.onmousemove = function (event) {
		  event = event || window.event;
		  var left = event.clientX - dx;
		  var top = event.clientY - dy;
		  
		  //deal with the boundary
		  //bigCircle.getAttribute("r") = BR
		  if ((left <= bigCircle.getAttribute('r'))) {
			  left = bigCircle.getAttribute('r');
		  }
		  if ((top <= bigCircle.getAttribute('r'))) {
			  top = bigCircle.getAttribute('r');
		  }
		  if (((svgWidth - left) <= bigCircle.getAttribute('r'))) {
			  left = svgWidth - bigCircle.getAttribute('r');
		  }
		  if (((svgHeight - top) <= bigCircle.getAttribute('r'))) {
			  top = svgHeight - bigCircle.getAttribute('r');
		  }
		  
		  //avoid overlap(only two)
		  var elemIndex = parseInt(id.slice(1, id.length));
		  //circlePosition[elemIndex] = [left, top];
		  
		  if (stateNumber > 1) {
			  for (let i = 1; i < (stateNumber + 1); i++) {
				  if (elemIndex != i) {
					  var cir = document.getElementById('c' + i);
					  let cirLeft1 = parseInt(cir.getAttribute('cx'));
					  let cirTop1 = parseInt(cir.getAttribute('cy'));
					  var dis = pointDistance(left,top, cirLeft1, cirTop1);
					  if (dis <= parseInt(2 * BR + 5)) {
						  //similar triangle
						  var offY = (((2 * BR + 5) - dis) / dis) * (cirTop1 - top);
						  var offX = (((2 * BR + 5) - dis) / dis) * (cirLeft1 - left);
						  left = left - offX;
						  top = top - offY;
						  
						  //boudary problem
						  if (top <= BR) {
							  top = BR;
							  if (left >= cirLeft1) {
								left = cirLeft1 + Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
							  }
							  else {
								left = cirLeft1 - Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
							  }
						  }
						  if ((svgHeight - top) <= BR) {
							  top = svgHeight - BR;
							  if (left >= cirLeft1) {
								  left = cirLeft1 + Math.sqrt((2 * BR) ** 2 - ((svgHeight - BR) - cirTop1) ** 2);
							  }
							  else {
								  left = cirLeft1 - Math.sqrt((2 * BR) ** 2 - ((svgHeight - BR) - cirTop1) ** 2);
							  }
						  }
						  
						  if (left <= BR) {
							  left = BR;
							  if (top >= cirTop1) {
								  top = cirTop1 + Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
							  }
							  else {
								  top = cirTop1 - Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
							  }
						  }
						  if ((svgWidth - left) <= BR) {
							  left = svgWidth - BR;
							  if (top >= cirTop1) {
								  top = cirTop1 + Math.sqrt((2 * BR) ** 2 - ((svgWidth - BR) - cirLeft1) ** 2);
							  }
							  else {
								  top = cirTop1 - Math.sqrt((2 * BR) ** 2 - ((svgWidth - BR) - cirLeft1) ** 2);
							  }
						  }
					  }
				  }
			  }
		  }
		  
		  elem.setAttribute('cx', left);
		  elem.setAttribute('cy', top);
		  
		  bigCircle.setAttribute('cx', left);
		  bigCircle.setAttribute('cy', top);
		  
		  var textLeft = left;
		  var textTop = top + textFontSize / 2 - 2;
		  if (top === bigCircle.getAttribute('r')) {
			  textTop = 58;
		  }
		  elemText.setAttribute('x', textLeft);
		  elemText.setAttribute('y', textTop);
		  
		  //inputframe
		  if (document.getElementById('f' + id.slice(1, id.length))) {
			  var inputText = document.getElementById('f' + id.slice(1, id.length));
			  var inputLeft = left - R + 5;
			  var inputTop = top - textFontSize / 2 - 8;
			  
			  inputText.setAttribute('x', inputLeft);
			  inputText.setAttribute('y', inputTop);
		  }
		  
		  //lines
		  for (let i = 1; i <= stateNumber; i++) {
			  //as a start circle
			  if (Tline[groupIndex][i] != 0) {
				  var cx = circleArray[i].getAttribute('cx');
				  var cy = circleArray[i].getAttribute('cy');
				  
				  if (i === groupIndex) {
				  	var x = pointOnCircle(cx, cy, parseInt(cx) + R, cy, selfLinkAngle[i], R)[0];
				  	var y = pointOnCircle(cx, cy, parseInt(cx) + R, cy, selfLinkAngle[i], R)[1];
				  	
				  	drawSelfCur(Tline[groupIndex][i], cx, cy, x, y, i);
				  }
				  else {
					  var dis = pointDistance(cx, cy, left, top);
					  
					  var tr = parseInt(R) + 10;//give some space for arrow
					  //(startX-left)/(cx-left) = R/dis
					  //(startY-top)/(cy-top) = R/dis
					  var startX = (R / dis) * (cx - left) + parseInt(left);
					  var startY = (R / dis) * (cy - top) + parseInt(top);
					  
					  //(endX-Left)/(cx-Left) = (dis-tr)/dis
					  //(endY-Top)/(cy-Top) = (dis-tr)/dis
					  var endX = ((dis - tr) / dis) * (cx - left) + parseInt(left);
					  var endY = ((dis - tr) / dis) * (cy - top) + parseInt(top);
					  
					  if (Tline[i][groupIndex] != 0) {
					  	
					  	drawCurves(Tline[groupIndex][i], groupIndex, i, startX, startY, endX, endY, controlAngle, rotateAngle, tr);
					  	
					  	//reverse
					  	startX = ((dis - R) / dis) * (cx - left) + parseInt(left);
					  	startY = ((dis - R) / dis) * (cy - top) + parseInt(top);
					  	endX = (tr / dis) * (cx - left) + parseInt(left);
					  	endY = (tr / dis) * (cy - top) + parseInt(top);
					  	drawCurves(Tline[i][groupIndex], i, groupIndex, startX, startY, endX, endY, controlAngle, rotateAngle, tr);
					  }
					  else{
					  	Tline[groupIndex][i].setAttribute('d', 'M' + startX + ' ' + startY + 'L' + endX + ' ' + endY);
					  }
				  }
				  continue;
			  }
			  //as a end circle
			  if (Tline[i][groupIndex] != 0) {
				  var cx = circleArray[i].getAttribute('cx');
				  var cy = circleArray[i].getAttribute('cy');
				  var dis = pointDistance(cx, cy, left, top);
				  
				  var tr = parseInt(R) + 10;//give some space for arrow
				  //(startX-cx)/(left-cx) = R/dis
				  //(startY-cy)/(top-cy) = R/dis
				  var startX = (R / dis) * (left - cx) + parseInt(cx);
				  var startY = (R / dis) * (top - cy) + parseInt(cy);
				 
				  //(endX-cx)/(Left-cx) = (dis-tr)/dis
				  //(endY-cy)/(Top-cy) = (dis-tr)/dis
				  var endX = ((dis - tr) / dis) * (left - cx) + parseInt(cx);
				  var endY = ((dis - tr) / dis) * (top - cy) + parseInt(cy);
				  
				  Tline[i][groupIndex].setAttribute('d', 'M' + startX + ' ' + startY + 'L' + endX + ' ' + endY);
			  }
		  }
		  
	  }
	  
	  document.onmouseup = function () {
		  elem.releaseCapture && elem.releaseCapture();
		  // elem.setAttribute("r", parseInt(R));
		  // bigCircle.setAttribute("r", parseInt(BR));
		  document.onmousemove = null;
		  document.onmouseup = null;
	  }
	  return false;
	}
}

function pointDistance(x1, y1, x2, y2) {
	return (Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
}

function getElementLeft(element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current != null) {
		actualLeft = actualLeft + current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
 }
 
function getElementTop(element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current != null) {
		actualTop = actualTop + current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

//get the curve controling point by angle, starPoint and endPoint
function getControlPoint(startX, startY, endX, endY, angle) {
	var point = [];
	angle = angle * (Math.PI / 180);
	var a = pointDistance(startX, startY, endX, endY) / 2;
	var b = a / Math.cos(angle);
	//alert("a: "+a+" "+"b: "+b);
	var phase1 = Math.atan(Math.abs(startY - endY) / Math.abs(startX - endX));
	//alert("phase1:"+phase1);
	//alert("angle:"+angle);
	var phase2 = Math.abs(angle - phase1);
	//alert("phase2:"+phase2);
	if ((startX < endX) && (startY < endY)) {
		if (angle > phase1) {
			point[0] = startX + b * Math.cos(phase2);
			point[1] = startY - b * Math.sin(phase2);
		}
		else {
			point[0] = startX + b * Math.cos(phase2);
			point[1] = startY + b * Math.sin(phase2);
		}
	}
	
	if ((startX > endX) && (startY > endY)) {
		if (angle > phase1) {
			point[0] = startX - b * Math.cos(phase2);
			point[1] = startY + b * Math.sin(phase2);
		}
		else {
			point[0] = startX - b * Math.cos(phase2);
			point[1] = startY - b * Math.sin(phase2);
		}
	}
	
	if ((startX > endX) && (startY < endY)) {
		if (angle > phase1) {
			point[0] = endX + b * Math.cos(phase2);
			point[1] = endY + b * Math.sin(phase2);
		}
		else {
			point[0] = endX + b * Math.cos(phase2);
			point[1] = endY - b * Math.sin(phase2);
		}
	}
	
	if ((startX < endX) && (startY > endY)) {
		if (angle > phase1) {
			point[0] = endX - b * Math.cos(phase2);
			point[1] = endY - b * Math.sin(phase2);
		}
		else {
			point[0] = endX - b * Math.cos(phase2);
			point[1] = endY + b * Math.sin(phase2);
		}
	}
	return point;
}

//get the point on the circle turnning an angle relative to (x,y)
function pointOnCircle(cx, cy, x, y, angle, r) {
	var point = [];
	angle = angle * (Math.PI / 180);
	cx = parseInt(cx);
	cy = parseInt(cy);
	if (x > cx) {
		phase1 = Math.atan((cy - y) / (x - cx));
	}
	else {
		phase1 = Math.atan((cy - y) / (x - cx)) + Math.PI;
	}
	phase2 = phase1 + angle;
	point[0] = cx + r * Math.cos(phase2);
	point[1] = cy - r * Math.sin(phase2);
	
	 // alert("cx:"+cx);
	 // alert("cy:"+cy);
	 // alert("x:"+x);
	 // alert("y: "+y);
	// alert("R*Math.sin(phase2):"+R*Math.sin(phase2));
	// alert("R*Math.cos(phase2);:"+R*Math.cos(phase2));
	 // alert("Math.atan((cy-y)/(x-cx)):"+Math.atan((cy-y)/(x-cx)));
	 // alert("phase1:"+phase1);
	 // alert("angle:"+angle);
	 // alert("phase2:"+phase2);
	// alert("point[0]:"+point[0]);
	// alert("point[1]:"+point[1]);
	return point;
}

function drawCurves(line, startIndex, endIndex, startX, startY, endX, endY, contrAngle, rotAngle, r) {
	var scx = circleArray[startIndex].getAttribute('cx');
	var scy = circleArray[startIndex].getAttribute('cy');
	var ecx = circleArray[endIndex].getAttribute('cx');
	var ecy = circleArray[endIndex].getAttribute('cy');
	
	//for Tline
	var conStarPoint = pointOnCircle(scx, scy, startX, startY, rotAngle, R);
	var conSx = conStarPoint[0];
	var conSy = conStarPoint[1];
	
	var conEndPoint = pointOnCircle(ecx, ecy, endX, endY, -rotAngle, r);
	var conEx = conEndPoint[0];
	var conEy = conEndPoint[1];
	
	var controlPoint = getControlPoint(conSx, conSy, conEx, conEy, contrAngle);
	line.setAttribute('d', 'M' + conSx + ' ' + conSy + 
						 'Q' + controlPoint[0] + ' ' + controlPoint[1] + ' ' + conEx + ' ' + conEy);
	
}

//dis(cx, cy, x, y)<=BR
function drawSelfCur(line, cx, cy, x, y, index) {
	var cx = parseInt(cx);
	var cy = parseInt(cy);
	//(cy-y)/(cy-endY)=dis(cx, cy, x, y)/R
	//(cx-x)/(cx-endX)=dis(cx, cy, x, y)/R
	var tr = parseInt(R) + 10;
	var endX = cx - (cx - x) * tr / pointDistance(cx, cy, x, y);
	var endY = cy - (cy - y) * tr / pointDistance(cx, cy, x, y);
	
	// record the angle of selflink line 
	selfLinkAngle[index] = Math.atan((cy - endY) / (endX - cx)) * (180 / Math.PI);
	if (endX < cx) {
		selfLinkAngle[index] = selfLinkAngle[index] + 180;
	}
	var starPoint = pointOnCircle(cx, cy, endX, endY, 30, R);
	var startX = starPoint[0];
	var startY = starPoint[1];
	
	var Sphase = 10;
	var Ephase = -4;
	var r = parseInt(R) + 100;
	
	var startControl = pointOnCircle(cx, cy, startX, startY, Sphase, R);
	startControl[0] = cx - (cx-startControl[0]) * r / pointDistance(cx, cy, startControl[0], startControl[1]);
	startControl[1] = cy - (cy-startControl[1]) * r / pointDistance(cx, cy, startControl[0], startControl[1]);
	
	var endControl = pointOnCircle(cx, cy, endX, endY, Ephase, R);
	endControl[0] = cx - (cx-endControl[0]) * r / pointDistance(cx, cy, endControl[0], endControl[1]);
	endControl[1] = cy - (cy-endControl[1]) * r / pointDistance(cx, cy, endControl[0], endControl[1]);
	
	line.setAttribute('d', 'M' + startX + ' ' + startY +
						   'C' + startControl[0] + ' ' + startControl[1] + ' ' + endControl[0] + ' ' + endControl[1] +
						   ' ' + endX + ' ' + endY);
}

//add one new HTML between a specified positon by id
function addHtmlById(id, pos, content){
	var Code = document.getElementById(id);
	Code.insertAdjacentHTML(pos, content);
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
