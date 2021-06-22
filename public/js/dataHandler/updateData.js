import { eleToString } from "../utils.js";

export default function updateData() {
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

  if (localStorage.getItem("data")) {
    localStorage.removeItem("data");
  }

  localStorage.setItem("data", JSON.stringify(data));
}
