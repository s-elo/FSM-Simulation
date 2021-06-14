import clearAllClick from "../design/btnClick/clearAll";

export default function clearStateDiagram() {
  const clearAllBtn = document.querySelector("#clearAll");

  // clear all states
  clearAllClick.apply(clearAllBtn);

  // clear the parameterSetting table
  const finishLast = document.querySelector("#finishLast");
  const stepTwoLast = document.querySelector("#stepTwoLast");

  if (finishLast) {
    finishLast.click();
  }

  if (stepTwoLast) {
    stepTwoLast.click();
  }

  // handle the first page of the paramSetting table
  const entityInput = document.querySelector("#entityName");
  entityInput.value = "";

  const inputNumber = document.querySelector("#inputNumber");
  const outputNumber = document.querySelector("#outputNumber");
  inputNumber.value = 1;
  outputNumber.value = 1;

  const inputType = document.querySelector("#inputType");
  const outputType = document.querySelector("#outputType");

  inputType.value = "bit";
  outputType.value = "bit";

  const inputRange = document.getElementById("inputRange");
  const inputFrom = document.getElementById("inputFrom");

  inputRange.style.display = "none";
  inputFrom.value = 1;

  const outputRange = document.getElementById("outputRange");
  const outputFrom = document.getElementById("outputFrom");

  outputRange.style.display = "none";
  outputFrom.value = 1;
}
