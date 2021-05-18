export default function syncParaTable(data) {
  // synchronize the state number
  stateNumber = data.stateNumber;
  document.getElementById("table").innerHTML = `State Number: ${stateNumber}`;

  // synchronize the start state
  startState[data.start] = 1;

  // synchronize the self link angle
  selfLinkAngle = data.selfLinkAngle;

  // synchronize the parasetting table
  const entityInput = document.querySelector("#entityName");
  entityInput.value = data.entityName;

  const inputNumber = document.querySelector("#inputNumber");
  const outputNumber = document.querySelector("#outputNumber");
  inputNumber.value = data.inputNum;
  outputNumber.value = data.outputNum;

  const inputType = document.querySelector("#inputType");
  const outputType = document.querySelector("#outputType");

  inputType.value = data.inputTypeVal;
  outputType.value = data.outputTypeVal;

  if (inputType.value === "bit_vector") {
    const inputRange = document.getElementById("inputRange");
    const inputFrom = document.getElementById("inputFrom");

    inputRange.style.display = "block";
    inputFrom.value = data.inputFromVal;
  }

  if (outputType.value === "bit_vector") {
    const outputRange = document.getElementById("outputRange");
    const outputFrom = document.getElementById("outputFrom");

    outputRange.style.display = "block";
    outputFrom.value = data.outputFromVal;
  }

  document.getElementById("stepOne").click();

  for (let i = 0; i < data.inputNum; i++) {
    const inputName = document.querySelector("#input" + (i + 1));
    inputName.value = data.inputName[i];
  }
  for (let i = 0; i < data.outputNum; i++) {
    const outputName = document.querySelector("#output" + (i + 1));
    outputName.value = data.outputName[i];
  }

  document.getElementById("finish").click();
}
