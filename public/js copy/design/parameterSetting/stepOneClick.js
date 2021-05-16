import { addHtmlById, decToBinary } from "../../utils.js";

export default function stepOneClick() {
  let entityName = "";
  const entityNameId = document.getElementById("entityName");
  let inputNumber = 0;
  let outputNumber = 0;
  const inputNumberId = document.getElementById("inputNumber");
  const outputNumberId = document.getElementById("outputNumber");

  if (entityNameId.value === "") {
    alert("please give an name to this FSM");
    return;
  }

  stepOneFlag = 1;

  entityName = entityNameId.value;
  inputNumber = parseInt(inputNumberId.value);
  outputNumber = parseInt(outputNumberId.value);

  let group1 = document.getElementById("group1");
  group1.style.display = "none";

  let group2Content = `<div id="group2">
                              <h4>Step Two</h4><br />
                              <label>input names: </label>`;

  //inputName input generation
  for (let i = 1; i <= inputNumber; i++) {
    group2Content += `<div class="input-group input-group-sm">
                              <span class="input-group-addon">input${i}</span> 
                              <input id=${
                                "input" + i
                              } type="text" class="form-control" aria-describedby="sizing-addon1"
                                     placeholder="please give a name"></div><br />`;
  }
  group2Content += `<br />
                        <label>output names: </label>`;
  //outputName input generation
  for (let i = 1; i <= outputNumber; i++) {
    group2Content += `<div class="input-group input-group-sm">
                              <span class="input-group-addon">output${i}</span> 
                              <input id=${
                                "output" + i
                              } type="text" class="form-control" aria-describedby="sizing-addon1"
                              placeholder="please give a name"></div><br />`;
  }

  group2Content += `<br />
                        <button class="btn btn-primary" " type="button" id="stepTwoLast">Prev</button>
                        <button class="btn btn-primary" " type="button" id="finish">Finish</button>
                        </div>`;

  addHtmlById("paraSetting", "beforeEnd", group2Content);
  let stepTwoLast = document.getElementById("stepTwoLast");
  stepTwoLast.onclick = function () {
    stepOneFlag = 0;

    let group2 = document.getElementById("group2");
    group2.parentNode.removeChild(group2);
    //group2.style.display = 'none';
    group1.style.display = "block";
  };

  let finish = document.getElementById("finish");
  finish.onclick = function () {
    finishFlag = 1;

    //remind
    for (let i = 1; i <= inputNumber; i++) {
      if (document.getElementById("input" + i).value === "") {
        alert("please give the name");
        return;
      }
    }
    for (let i = 1; i <= outputNumber; i++) {
      if (document.getElementById("output" + i).value === "") {
        alert("please give the name");
        return;
      }
    }

    let group2 = document.getElementById("group2");
    group2.style.display = "none";

    //create the group3
    let group3Content = `<div id="group3">
                                  <p><h4>entityName: </h4>${entityName}</p><hr />
                                  <p><h4>input: </h4></p>`;

    if (inputType.value === "bit") {
      group3Content += `<p>(bit)</p>`;
    } else {
      group3Content += `<p>from ${inputFrom.value} to ${inputTo.value}</p>`;
    }
    for (let i = 1; i <= inputNumber; i++) {
      let inputName = document.getElementById("input" + i).value;
      group3Content += `<p>input${i}: ${inputName}</p>`;
    }

    // present the reset
    let startIndex = startState.findIndex((x) => x === 1);
    if (startIndex === -1) {
      group3Content += `<p id="resetShow">reset = 1 --> no state yet</p>`;
    } else {
      group3Content += `<p id="resetShow">reset = 1 --> ${textArray[startIndex].innerHTML}</p>`;
    }

    group3Content += `<hr /><p><h4>output: </h4></p>`;

    if (outputType.value === "bit") {
      group3Content += `<p>(bit)</p>`;
    } else {
      group3Content += `<p>from ${outputFrom.value} to ${outputTo.value}</p>`;
    }
    for (let i = 1; i <= outputNumber; i++) {
      let outputName = document.getElementById("output" + i).value;
      group3Content += `<p>output${i}: ${outputName}</p>`;
    }

    group3Content += `<br />
                            <button class="btn btn-primary" type="button" id="finishLast">Prev</button>
                            </div>`;

    addHtmlById("paraSetting", "beforeEnd", group3Content);

    let finishLast = document.getElementById("finishLast");
    finishLast.onclick = function () {
      finishFlag = 0;

      let group3 = document.getElementById("group3");
      group3.parentNode.removeChild(group3);
      //group3.style.display = 'none';
      group2.style.display = "block";
    };

    //change the info table
    for (let i = 1; i < lineFlag.length; i++) {
      for (let j = 1; j < lineFlag[i].length; j++) {
        if (Tline[i][j] != 0) {
          //alert('fff');
          //input condition
          let condition = document.getElementById("condition" + i + j);
          let conditionContent = ``;

          let inlen = 1;
          if (inputType.value === "bit") {
            inlen = 1;
          } else {
            inlen = parseInt(inputFrom.value) + 1;
          }

          for (let k = 1; k <= inputNumber; k++) {
            let inputName = document.getElementById("input" + k).value;
            conditionContent += `<p>${inputName}: 
                                               <select id=${
                                                 "input" + i + j + k
                                               }>`;
            for (let b = 0; b < 2 ** inlen; b++) {
              let str = decToBinary(b, inlen);
              conditionContent += `<option value=${str}>${str}</option>`;
            }
            conditionContent += `<option value='X'>X</option>`;
            conditionContent += `</select></p>`;
          }

          condition.innerHTML = conditionContent;

          //output
          let output = document.getElementById("output" + i + j);
          let outputContent = ``;

          let outlen = 1;
          if (outputType.value === "bit") {
            outlen = 1;
          } else {
            outlen = parseInt(outputFrom.value) + 1;
          }

          for (let k = 1; k <= outputNumber; k++) {
            let outputName = document.getElementById("output" + k).value;
            outputContent += `<p>${outputName}: 
                                               <select id=${
                                                 "output" + i + j + k
                                               }>`;
            for (let b = 0; b < 2 ** outlen; b++) {
              let str = decToBinary(b, outlen);
              outputContent += `<option value=${str}>${str}</option>`;
            }
            outputContent += `</select></p>`;
          }

          output.innerHTML = outputContent;

          //at circle tables
          let cirOutputContent = ``;

          for (let k = 1; k <= outputNumber; k++) {
            let outputName = document.getElementById("output" + k).value;
            let outputValue = document.getElementById(
              "output" + i + j + k
            ).value;
            cirOutputContent += `<p id = ${"cirOutput" + i + j + k}>
                                               ${outputName}: ${outputValue}</p>`;
          }
          cirOutputContent += `<hr /></div>`;
          document.getElementById("cirOutput" + i + j).innerHTML =
            cirOutputContent;

          //binding the ouput value event to syncronize the value at circle table
          for (let k = 1; k <= outputNumber; k++) {
            let outputValue = document.getElementById("output" + i + j + k);

            outputValue.onchange = function () {
              //get the id of this outputValue
              let id = this.getAttribute("id");
              let a = id.slice(6, 7);
              let b = id.slice(7, 8);
              let c = id.slice(8, 9);

              let outputName;
              if (document.getElementById("output" + c)) {
                outputName = document.getElementById("output" + c).value;
              } else {
                outputName = "";
              }

              let cirOutput = document.getElementById("cirOutput" + a + b + c);
              cirOutput.innerHTML = `${outputName}: ${this.value}`;
            };
          }
        }
      }
    }

    if (updateFirstTime) {
      updateFirstTime = 0;
    } else {
      updateData();
    }
  };
}
