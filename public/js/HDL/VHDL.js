/**
 * Necessary Data
 *
 * 1. stateNumber
 * 2. Tline[i][j] (i => j)
 *
 * 3. entityName: $('#entityName')
 * 4. inputNumber: $('#inputNumber')
 * 5. outputNumber: $('#outputNumber')
 *
 * 6. inputType: $('#inputType')
 * 7. outputType: $('#outputType')
 *
 * 8. inputFrom: $('#inputFrom')
 * 9. inputTo: $('#inputTo')
 * 10. outputFrom: $('#outputFrom')
 * 11. outputTo: $('#outputTo')
 *
 * 12. inputName: $('#input' + order) //input1, input2
 * 13. outputName:$('#output' + order)
 *
 * 14. stateName: $('#t' + order)//t1, t2
 *
 * 15. condition: $('#condition' + i + j)//i => j
 * 16. condition(inputs): $('#input' + i + j + k)//inputk at i => j
 * 17. condition(outputs): $('#output' + i + j + k)//outputk at i => j
 *
 */

let lineNumber = 0;

let inputTypeFlag;
let outputTypeFlag;

let inputName = [];
let outputName = [];

// let entityName = '';
let inputNum = 0;
let outputNum = 0;

let inputTypeVal = "";
let outputTypeVal = "";

let inputFromVal = "";
let inputToVal = "";
let outputFromVal = "";
let outputToVal = "";

let stateName = [];

let inputCondition = [];
let outputForEachTran = [];

let start = 0;

let data = {};

function updateData() {
  // console.log('updated!');
  startState.filter((val, index) => {
    if (val === 1) {
      start = index;
    }
  });

  entityName = $("#entityName").val();
  inputNum = parseInt($("#inputNumber").val());
  outputNum = parseInt($("#outputNumber").val());

  for (let i = 0; i < inputNum; i++) {
    inputName[i] = $("#input" + (i + 1)).val();
  }

  for (let i = 0; i < outputNum; i++) {
    outputName[i] = $("#output" + (i + 1)).val();
  }

  inputTypeVal = $("#inputType").val();
  outputTypeVal = $("#outputType").val();

  inputTypeFlag = 0; //bit_vector
  if (inputTypeVal === "bit") {
    inputTypeFlag = 1;
  }
  outputTypeFlag = 0; //bit_vector
  if (outputTypeVal === "bit") {
    outputTypeFlag = 1;
  }

  inputFromVal = $("#inputFrom").val();
  inputToVal = $("#inputTo").val();
  outputFromVal = $("#outputFrom").val();
  outputToVal = $("#outputTo").val();

  for (let i = 0; i < stateNumber; i++) {
    stateName[i] = $("#t" + (i + 1)).html();
  }

  for (let i = 0; i < Tline.length; i++) {
    inputCondition[i] = new Array(Tline[i].length);

    for (let j = 0; j < Tline[i].length; j++) {
      inputCondition[i][j] = new Array(inputNum).fill(-1);

      if (Tline[i][j] != 0) {
        for (let k = 0; k < inputNum; k++) {
          inputCondition[i][j][k] = $("#input" + i + j + (k + 1)).val();
        }
      }
    }
  }

  for (let i = 0; i < Tline.length; i++) {
    outputForEachTran[i] = new Array(Tline[i].length);

    for (let j = 0; j < Tline[i].length; j++) {
      outputForEachTran[i][j] = new Array(outputNum).fill(-1);

      if (Tline[i][j] != 0) {
        for (let k = 0; k < outputNum; k++) {
          outputForEachTran[i][j][k] = $("#output" + i + j + (k + 1)).val();
        }
      }
    }
  }

  let pathStr = [].fill(0);
  for (let i = 0; i < Tline.length; i++) {
    pathStr[i] = new Array(Tline[i].length).fill(0);

    for (let j = 0; j < Tline[i].length; j++) {
      if (Tline[i][j] != 0) {
        pathStr[i][j] = eleToString(Tline[i][j]);
      }
    }
  }

  let circleStr = [].fill(null);
  let bigCircleStr = [].fill(null);
  let textStr = [].fill(null);
  for (let i = 1; i <= stateNumber; i++) {
    circleStr[i] = eleToString(circleArray[i]);
    bigCircleStr[i] = eleToString(bigCircleArray[i]);
    textStr[i] = eleToString(textArray[i]);
  }

  // export the data
  data = {
    inputName: inputName,
    outputName: outputName,

    entityName: entityName,
    inputNum: inputNum,
    outputNum: outputNum,

    inputTypeVal: inputTypeVal,
    outputTypeVal: outputTypeVal,

    inputFromVal: inputFromVal,
    inputToVal: inputToVal,
    outputFromVal: outputFromVal,
    outputToVal: outputToVal,

    stateName: stateName,
    inputCondition: inputCondition,
    outputForEachTran: outputForEachTran,
    stateNumber: stateNumber,

    pathStr: pathStr,
    circleStr: circleStr,
    bigCircleStr: bigCircleStr,
    textStr: textStr,

    Tline: Tline,
    selfLinkAngle: selfLinkAngle,

    start: start,
  };
  let storage = window.localStorage;
  if (storage.getItem("data")) {
    storage.removeItem("data");
  }

  window.localStorage.setItem("data", JSON.stringify(data));

  //   login({ data: JSON.stringify(data) });
}

function eleToString(ele) {
  let tmpNode = document.createElement("g");

  let newNode = ele.cloneNode(true);

  tmpNode.appendChild(newNode);

  let str = tmpNode.innerHTML;

  tmpNode = newNode = null;

  return str;
}

$("#VHDLBtn").click(function () {
  // console.log(Tline)
  VHDLInit();

  const $contentVHDL = $(".VHDL code");

  updateData();
  //console.log(outputForEachTran)

  /**
   * the first two code lines
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
							<span class="comment">-- using necessary libraries</span>
						 </span>`);
  lineNumber++;

  var $libCode = $(`<span class="lineBlock">
						<span class="keyWord">library </span>
						<span>ieee;</span>
					</span>
					<span class="lineBlock">
						<span class="keyWord">use </span>
						<span>ieee.std_logic_1164.all;</span>
					</span>`);
  $contentVHDL.append($libCode);
  lineNumber = lineNumber + 2;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for defining a entity
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
							<span class="comment">-- entity definition</span>
						 </span>`);
  lineNumber++;

  var entityDef = `<span class="lineBlock">
							<span class="keyWord">entity</span>
							<span class="entityName">${entityName}</span>
							<span> is</span>
						</span>
						<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord ">port</span>
							<span>(</span>`;

  //in
  for (let i = 0; i < inputNum; i++) {
    entityDef += `<span>${inputName[i]}, </span>`;
  }

  entityDef += `<span>clk, rst: </span><span class="in">in </span>`;

  if (inputTypeVal === "bit") {
    entityDef += `<span class="Type">bit</span>
					  <span class="moveSpace">;</span>
					  </span>`;
  } else {
    entityDef += `<span class="Type">bit_vector(${inputFromVal} downto ${inputToVal})</span>
					  <span>;</span>
					  </span>`;
  }

  //out
  entityDef += `<span class="lineBlock">
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
  for (let i = 0; i < outputNum; i++) {
    if (i === outputNum - 1) {
      entityDef += `<span>${outputName[i]}: </span>`;
    } else {
      entityDef += `<span>${outputName[i]}, </span>`;
    }
  }

  entityDef += `<span class="in">out </span>`;
  if (outputTypeVal === "bit") {
    entityDef += `<span class="Type">bit</span>`;
  } else {
    entityDef += `<span class="Type">bit_vector(${outputFromVal} downto ${outputToVal})</span>`;
  }

  entityDef += `<span>);</span></span>`;

  entityDef += `<span class="lineBlock">
					<span class="keyWord">end </span>
					<span class="entityName">${entityName}</span>
					<span class="moveSpace">;</span>
				  </span>`;

  $contentVHDL.append(entityDef);

  lineNumber = lineNumber + 5;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for defining the states
   */
  var stateDef = `<span class="lineBlock">
						<span class="keyWord">architecture </span>
						<span class="entityName">${entityName} </span>
						<span>of </span>
						<span class="entityName">${entityName} </span>
						<span>is</span>
					</span>`;

  //comments
  $contentVHDL.append(`<span class="lineBlock">
							<span class="comment">-- define a states type</span>
						 </span>`);
  lineNumber++;

  //declare the names of states
  stateDef += `<span class="lineBlock">
					<span>&nbsp;&nbsp;</span>
					<span class="keyWord">type states </span>
					<span>is (</span>`;

  $.each(stateName, function (index, value) {
    if (index === stateName.length - 1) {
      stateDef += `<span>${value});</span></span>`;
    } else {
      stateDef += `<span>${value}, </span>`;
    }
  });

  //define the states type signals
  stateDef += `<span class="lineBlock">
					<span>&nbsp;&nbsp;</span>
					<span class="keyWord">signal</span>
					<span>pre, nextState: </span>
					<span class="keyWord">states</span>
					<span class="moveSpace">;</span>
				 </span>`;

  $contentVHDL.append(stateDef);

  lineNumber += 4;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for the lower part
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
							<span class="comment">-- define the lower section</span>
						 </span>`);
  lineNumber++;

  var lowerdef = `<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="keyWord">begin</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span>lower: </span>
						<span class="keyWord">process</span>
						<span>(clk, rst)</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span class="keyWord">begin</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span class="keyWord">if </span>
						<span>(rst = </span>
						<span class="value moveSpace">'1'</span>
						<span class="moveSpace">) </span>
						<span class="keyWord">then </span>
						<span>pre <= ${stateName[start - 1]};</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span class="keyWord">elsif </span>
						<span>(clk'event</span>
						<span class="in"> and </span>
						<span>clk = </span>
						<span class="value moveSpace">'1'</span>
						<span class="moveSpace">) </span>
						<span class="keyWord">then </span>
						<span>pre <= nextState;</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span class="keyWord">end if </span>
						<span class="moveSpace">;</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="keyWord">end </span>
						<span>process lower;</span>
					</span>`;

  $contentVHDL.append(lowerdef);

  lineNumber += 8;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for upper part
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
							<span class="comment">-- define the upper section (behaviours)</span>
						 </span>`);
  lineNumber++;

  var upperInit = `<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span>upper: </span>
						<span class="keyWord">process</span>
						<span>(</span>`;

  for (let i = 0; i < inputNum; i++) {
    upperInit += `<span>${inputName[i]}, </span>`;
  }

  upperInit += `<span>pre)</span></span>
				  <span class="lineBlock">
				  	<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
					<span class="keyWord">begin</span>
				  </span>`;

  $contentVHDL.append(upperInit);

  lineNumber += 3;

  // transitions handling
  var transitionCode = `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="keyWord">case</span>
							<span>pre is</span>
						  </span>`;
  lineNumber++;

  // each state
  for (let i = 1; i <= stateNumber; i++) {
    if (i > 1) {
      transitionCode += `<span class="lineBlock">&nbsp;</span>`;
      lineNumber++;
    }

    transitionCode += `<span class="lineBlock">
								<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<span class="keyWord">when</span>
								<span>${stateName[i - 1]} => </span>
						   </span>`;
    lineNumber++;

    //when the output of every transition is the same (moore)
    //console.log(outputForEachTran[i])
    if (isElementEqual(outputForEachTran[i])) {
      //handle the outputs
      for (let j = 0; j < Tline[i].length; j++) {
        if (Tline[i][j] != 0) {
          for (let k = 0; k < outputNum; k++) {
            if (outputTypeFlag) {
              transitionCode += `<span class="lineBlock">
													<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
													<span>${outputName[k]} <= </span>
													<span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
													<span class="moveSpace">;</span>
											   </span>`;
            }
            //bit_vector using ""
            else {
              transitionCode += `<span class="lineBlock">
													<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
													<span>${outputName[k]} <= </span>
													<span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
													<span class="moveSpace">;</span>
											   </span>`;
            }
          }
          lineNumber += outputNum;
          break;
        }
      }

      //handle the transitions
      let count = 1;
      let conFlag = 1; //see if it is unconditional

      for (let j = 0; j < Tline[i].length; j++) {
        if (Tline[i][j] != 0) {
          //when it is uncondiotional transition
          if (isAllX(inputCondition[i][j])) {
            transitionCode += `<span class="lineBlock">
												<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
												<span>nextState <= ${stateName[j - 1]};</span>
										   </span>`;
            lineNumber++;
            //if it unconditional, it can only have one transition
            conFlag = 0;
            break;
          } else {
            //if it is the first one
            if (count == 1) {
              count++;
              transitionCode += `<span class="lineBlock">
													<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
													<span class="keyWord">if </span>
													<span>(</span>
													${conditionCreator(inputCondition[i][j])}
													<span>) </span>
													<span class="keyWord">then</span>
											   </span>
											   <span class="lineBlock">
											   		<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
											   		<span>nextState <= ${stateName[j - 1]};</span>	
											   	</span>`;
              lineNumber += 2;
            } else {
              transitionCode += `<span class="lineBlock">
													<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
													<span class="keyWord">elsif </span>
													<span>(</span>
													${conditionCreator(inputCondition[i][j])}
													<span>) </span>
													<span class="keyWord">then</span>
											   </span>
											   <span class="lineBlock">
											   		<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
											   		<span>nextState <= ${stateName[j - 1]};</span>	
											   	</span>`;
              lineNumber += 2;
            }
          }
        }
      }

      if (conFlag) {
        transitionCode += `<span class="lineBlock">
										<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
										<span class="keyWord">end if </span>
										<span class="moveSpace">;</span>	
									</span>`;
        lineNumber++;
      }
    }

    //when the output of every transition is not the same (mealy)
    else {
      //handle the transitions
      let count = 1;
      let conFlag = 1; //see if it is unconditional

      for (let j = 0; j < Tline[i].length; j++) {
        if (Tline[i][j] != 0) {
          //when it is uncondiotional transition
          if (isAllX(inputCondition[i][j])) {
            transitionCode += `<span class="lineBlock">
												<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
												<span>nextState <= ${stateName[j - 1]};</span>
										   </span>`;
            //output
            for (let k = 0; k < outputNum; k++) {
              if (outputTypeFlag) {
                transitionCode += `<span class="lineBlock">
														<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
														<span>${outputName[k]} <= </span>
														<span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
														<span class="moveSpace">;</span>
												   </span>`;
              }
              //bit_vector using ""
              else {
                transitionCode += `<span class="lineBlock">
														<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
														<span>${outputName[k]} <= "</span>
														<span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
														<span class="moveSpace">;</span>
												   </span>`;
              }
            }

            lineNumber += outputNum + 1;
            //if it unconditional, it can only have one transition
            conFlag = 0;
            break;
          } else {
            //if it is the first one
            if (count == 1) {
              count++;
              transitionCode += `<span class="lineBlock">
													<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
													<span class="keyWord">if </span>
													<span>(</span>
													${conditionCreator(inputCondition[i][j])}
													<span>) </span>
													<span class="keyWord">then</span>
											   </span>
											   <span class="lineBlock">
											   		<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
											   		<span>nextState <= ${stateName[j - 1]};</span>	
											   	</span>`;
              //output
              for (let k = 0; k < outputNum; k++) {
                if (outputTypeFlag) {
                  transitionCode += `<span class="lineBlock">
															<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
															<span>${outputName[k]} <= </span>
															<span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
															<span class="moveSpace">;</span>
													   </span>`;
                }
                //bit_vector using ""
                else {
                  transitionCode += `<span class="lineBlock">
															<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
															<span>${outputName[k]} <= </span>
															<span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
															<span class="moveSpace">;</span>
													   </span>`;
                }
              }
              lineNumber += 2 + outputNum;
            } else {
              transitionCode += `<span class="lineBlock">
													<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
													<span class="keyWord">elsif </span>
													<span>(</span>
													${conditionCreator(inputCondition[i][j])}
													<span>) </span>
													<span class="keyWord">then</span>
											   </span>
											   <span class="lineBlock">
											   		<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
											   		<span>nextState <= ${stateName[j - 1]};</span>	
											   	</span>`;
              //output
              for (let k = 0; k < outputNum; k++) {
                if (outputTypeFlag) {
                  transitionCode += `<span class="lineBlock">
															<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
															<span>${outputName[k]} <= </span>
															<span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
															<span class="moveSpace">;</span>
													   </span>`;
                }
                //bit_vector using ""
                else {
                  transitionCode += `<span class="lineBlock">
															<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
															<span>${outputName[k]} <= </span>
															<span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
															<span class="moveSpace">;</span>
													   </span>`;
                }
              }

              lineNumber += 2 + outputNum;
            }
          }
        }
      }

      if (conFlag) {
        transitionCode += `<span class="lineBlock">
										<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
										<span class="keyWord">end if </span>
										<span class="moveSpace">;</span>	
									</span>`;
        lineNumber++;
      }
    }
  }

  $contentVHDL.append(transitionCode);

  var endCode = `<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span class="keyWord">end case</span>
						<span class="moveSpace">;</span>
				   </span>
				   <span class="lineBlock">
				   		<span>&nbsp;&nbsp;</span>
				   		<span class="keyWord">end </span>
				   		<span>process upper;</span>			
				   	</span>
					<span class="lineBlock">
						<span class="keyWord">end </span>
						<span class="entityName">${entityName}</span>		
						<span class="moveSpace">;</span>
					</span>`;

  lineNumber += 3;
  $contentVHDL.append(endCode);

  lineNumber += 1;
  $(".VHDL .pre-numbering").css("display", "block");
  for (let i = 1; i <= lineNumber; i++) {
    $(".VHDL .pre-numbering").append(`<li>${i}</li>`);
  }

  // //make sure the height of the marks is the same as the lines
  // var height = $('.VHDL .pre-numbering li').css('height');//px

  // $('.lineBlock').css('height', height);
});

/**
 * see if the params has been set
 * return true means can not generate and simulate
 * otherwise return undefine
 */
function reminder() {
  // left params
  if (!stepOneFlag || !finishFlag) {
    alert("please finish the parameters setting at the left side");
    return true;
  } else if (stateNumber === 0) {
    alert("please finish the state diagram");
    return true;
  }
  for (let i = 1; i <= stateNumber; i++) {
    let f = 1;
    for (let j = 1; j <= stateNumber; j++) {
      if (Tline[i][j] != 0) {
        f = 0;
        break;
      }
    }
    if (f) {
      alert("each state must have at least one next state");
      return true;
    }
  }

  let inputNum = parseInt($("#inputNumber").val());
  let inputCondition = [];
  for (let i = 0; i < Tline.length; i++) {
    inputCondition[i] = new Array(Tline[i].length);

    for (let j = 0; j < Tline[i].length; j++) {
      inputCondition[i][j] = new Array(inputNum).fill(-1);

      if (Tline[i][j] != 0) {
        for (let k = 0; k < inputNum; k++) {
          inputCondition[i][j][k] = $("#input" + i + j + (k + 1)).val();
        }
      }
    }
  }

  // inputs of each transition must be different
  for (let i = 1; i <= stateNumber; i++) {
    let cnt = 0;
    for (let j = 1; j <= stateNumber; j++) {
      if (Tline[i][j] != 0) {
        cnt++;
        //when there are at least two transitions
        if (cnt > 1) break;
      }
    }

    //when there are at least two transitions
    if (cnt > 1) {
      if (isElementEqual(inputCondition[i])) {
        alert("inputs of each transition must be different");
        return true;
      }

      // see if there a transition with all 'X' when more than one transition
      for (let j = 1; j < stateNumber; j++) {
        if (Tline[i][j] != 0) {
          if (isAllX(inputCondition[i][j])) {
            alert(`${$("#t" + i).html()} should not have a 'X' transition`);
            return true;
          }
        }
      }

      // see if there are transitions with same conditions
      if (hasSameElement(inputCondition[i])) {
        alert(
          `the transitions of ${$(
            "#t" + i
          ).html()} can not have same conditions`
        );
        return true;
      }
    }

    // inputs shoud be all 'X'
    if (cnt === 1) {
      for (let j = 1; j <= stateNumber; j++) {
        if (Tline[i][j] != 0) {
          if (isAllX(inputCondition[i][j])) break;
          else {
            alert(`the inputs of ${$("#t" + i).html()} should be 'X'`);
            return true;
          }
        }
      }
    }
  }
}
//make sure the height of the marks is the same as the lines
$(window).on("resize", function () {
  var height = $(".VHDL .pre-numbering li").css("height"); //px

  $(".lineBlock").css("height", height);
});

$("#showBtn").click(() => {
  // check
  if (reminder()) return;

  // clear
  $(".content").html("");
  $(".pre-numbering").html("");

  // show VHDL code
  $("#VHDLBtn").trigger("click");
  // show Verilog code
  $("#verilogBtn").trigger("click");
  // generate VHDL testBench code
  $("#VHDLTestBenchBtn").trigger("click");
  // generate Verilog testBench code
  $("#verilogTestBenchBtn").trigger("click");
});

$("#updateBtn").click(function () {
  $("#showBtn").trigger("click");
});

/**
 *
 * @param {inputCondition[i]} array
 * @returns: if there are transitions with same conditions, return true
 * otherwise false
 */
function hasSameElement(array) {
  const nextStateNum = array.length;

  function isAllSame(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    if (arr1 === arr2) return true;

    for (const [index, val] of arr1.entries()) {
      if (val !== arr2[index]) return false;
    }
    return true;
  }

  for (let i = 0; i < nextStateNum; i++) {
    // has a transition
    if (array[i][0] !== -1) {
      // compare with other transitions
      for (let j = 0; j < nextStateNum; j++) {
        if (array[j][0] !== -1 && j !== i) {
          // compare each inputs
          if (isAllSame(array[j], array[i])) return true;
        }
      }
    }
  }

  return false;
}

/**
 * only used in arrays with two demensions
 * only used to see if all the outputs/inputs of each transition are the same (moore)
 */
function isElementEqual(array) {
  let flag = 0;
  let temp = null;

  for (let i = 0; i < array.length; i++) {
    //find the first then stop
    if (array[i][0] != -1 && flag === 0) {
      temp = array[i];
      flag = 1;
    }

    //compare each one
    if (array[i][0] != -1) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] != temp[j]) return false;
      }
    }
  }
  return true;
}

function isAllX(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] != "X") return false;
  }
  return true;
}

function conditionCreator(inputArray) {
  var ret = ``;
  //bit
  if (inputTypeFlag) {
    var count = 1;
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] != "X" && inputArray[i] != -1) {
        if (count === 1) {
          ret += `<span>${inputName[i]} = </span>
							<span class="value moveSpace">'${inputArray[i]}'</span>`;
          count++;
        } else {
          ret += `<span class="in"> and </span>
							<span>${inputName[i]} = </span>
							<span class="value moveSpace">'${inputArray[i]}'</span>`;
        }
      }
    }
  } else {
    var count = 1;
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] != "X" && inputArray[i] != -1) {
        if (count === 1) {
          ret += `<span>${inputName[i]} = </span>
							<span class="value moveSpace">"${inputArray[i]}"</span>`;
          count++;
        } else {
          ret += `<span class="in"> and </span>
							<span>${inputName[i]} = </span>
							<span class="value moveSpace">"${inputArray[i]}"</span>`;
        }
      }
    }
  }

  return ret;
}

function VHDLInit() {
  // inputTypeFlag = 0;
  // outputTypeFlag = 0;
  // inputName = [];
  // outputName = [];
  lineNumber = 0;

  // copy button
  $(".VHDL").hover(
    function () {
      $("#VHDLCopy").css("display", "block");
      $("#VHDLToTestBench").css("display", "block");
    },
    function () {
      $("#VHDLCopy").css("display", "none");
      $("#VHDLToTestBench").css("display", "none");
    }
  );

  $("#updateBtn").css("display", "block");
  $("#showBtn").css("display", "none");

  //clear the previous contents and change the bcg if it is the first time
  $(".content").css("background-color", "#eef0f4");
  $(".prettyprint").css("background-color", "#eef0f4");

  /**
   * copy operation
   */
  $(".codeArea .VHDL").scroll(function () {
    // console.log($(this).scrollTop(), $(this).scrollLeft());//number
    $("#VHDLCopy").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 10 + $(this).scrollTop() + "px",
    });

    /**
     * lineNumber and scroll
     */
    $(".VHDL .pre-numbering").css({
      left: 0 + $(this).scrollLeft() + "px", //px
    });

    $("#VHDLToTestBench").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 450 + $(this).scrollTop() + "px",
    });
  });
}

$("#VHDLToTestBench").click(() => {
  $(".VHDLTestBench").fadeIn(1000);
  $(".VHDL").css("display", "none");
});

var clipboard = new ClipboardJS("#VHDLCopy");

clipboard.on("success", function (e) {
  // console.info('Action:', e.action);
  // console.info('Text:', e.text);
  // console.info('Trigger:', e.trigger);
  // alert('successfully copied!');
  $("#copyReminder").fadeIn(500).fadeOut(3000);
  e.clearSelection();
});

clipboard.on("error", function (e) {
  alert("error！failed to copy");
});
