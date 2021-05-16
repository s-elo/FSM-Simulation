import updateData from "../../dataHandler/updateData.js";

export default function setStartState() {
  for (let i = 1; i <= stateNumber; i++) {
    if (circleFlag[i] === 1) {
      bigCircleArray[i].setAttribute("stroke", "black");
      startState[i] = 1;

      document.getElementById(
        "resetShow"
      ).innerHTML = `reset = 1 --> ${textArray[i].innerHTML}`;
    } else {
      bigCircleArray[i].setAttribute("stroke", "transparent");
      startState[i] = 0;
    }
  }
  updateData();
}
