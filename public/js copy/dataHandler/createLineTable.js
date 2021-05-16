import {decToBinary, addHtmlById} from '../utils.js';
import updateData from './updateData.js';

export default function createLineTable(groupIndex, i) {
  //create a info table for this line
  let lineTableContent = `<div class="lineTable" id=${"table" + groupIndex + i}>
                          <h4>Current Line:</h4>
                          <p id=${"line" + groupIndex + i}>
                          ${textArray[groupIndex].innerHTML} => ${
    textArray[i].innerHTML
  }</p>
                          <br />
                          <h4>condition: </h4>
                          <div id=${"condition" + groupIndex + i}>`;

  let inlen = 1;
  if (inputType.value === "bit") {
    inlen = 1;
  } else {
    inlen = parseInt(inputFrom.value) + 1;
  }

  let inputName;
  for (let k = 1; k <= inputNumber; k++) {
    if (document.getElementById("input" + k)) {
      inputName = document.getElementById("input" + k).value;
    } else {
      inputName = "";
    }
    lineTableContent += `<p>${inputName}: 
                                  <select id=${"input" + groupIndex + i + k}>`;
    for (let b = 0; b < 2 ** inlen; b++) {
      let str = decToBinary(b, inlen);
      lineTableContent += `<option value=${str}>${str}</option>`;
    }
    lineTableContent += `<option value='X'>X</option>`;
    lineTableContent += `</select></p>`;
  }
  lineTableContent += `</div><br />
                              <h4>output: </h4>
                              <div id=${"output" + groupIndex + i}>`;

  let outlen = 1;
  if (outputType.value === "bit") {
    outlen = 1;
  } else {
    outlen = parseInt(outputFrom.value) + 1;
  }

  let outputName;
  for (let k = 1; k <= outputNumber; k++) {
    //alert(document.getElementById('input' + k))
    if (document.getElementById("output" + k)) {
      outputName = document.getElementById("output" + k).value;
    } else {
      outputName = "";
    }

    lineTableContent += `<p>${outputName}: 
                                  <select id=${"output" + groupIndex + i + k}>`;
    for (let b = 0; b < 2 ** outlen; b++) {
      let str = decToBinary(b, outlen);
      lineTableContent += `<option value=${str}>${str}</option>`;
    }
    lineTableContent += `</select></p>`;
  }
  lineTableContent += `</div></div>`;
  addHtmlById("dataTable", "beforeEnd", lineTableContent);

  // listen the change of the inputCondition
  for (let k = 1; k <= inputNumber; k++) {
    let ele = document.getElementById("input" + groupIndex + i + k);

    ele.onchange = () => {
      updateData();
    };
  }

  // listen the change of the output setting
  // at the paraSetting.js

  //ouput infor at circle table
  //let cirOutput = document.getElementById('cirOutput' + groupIndex);
  let cirOutputContent = `<p id = ${"circle" + groupIndex + i}>=> ${
    textArray[i].innerHTML
  }:</p>
                              <div id = ${"cirOutput" + groupIndex + i}>`;

  // let outputName;
  for (let k = 1; k <= outputNumber; k++) {
    if (document.getElementById("output" + k)) {
      outputName = document.getElementById("output" + k).value;
    } else {
      outputName = "";
    }
    let outputValue = document.getElementById(
      "output" + groupIndex + i + k
    ).value;
    cirOutputContent += `<p id = ${"cirOutput" + groupIndex + i + k}>
                                  ${outputName}: ${outputValue}</p>`;
  }
  cirOutputContent += `<hr /></div>`;
  addHtmlById("cirOutput" + groupIndex, "beforeEnd", cirOutputContent);

  //binding the ouput value event to syncronize the value at circle table
  for (let k = 1; k <= outputNumber; k++) {
    let outputValue = document.getElementById("output" + groupIndex + i + k);

    outputValue.onchange = function () {
      // alert('555');
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

      updateData();
    };
  }
}
