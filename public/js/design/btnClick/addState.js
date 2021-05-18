import { createElem, addHtmlById } from "../../utils.js";
import { updateData } from "../../dataHandler/dataHandler.js";
import {
  cirBindDragEventById,
  textBindDragEventById,
  bigCircleMouseEnter,
  bigCircleMouseDown,
  bigCircleMouseLeave,
  circleClick,
  circleDoubleClick,
  textClick,
  textDoubleClick,
} from "../elmOperation/elmOperation.js";

export default function addState() {
  //see if the params has been set
  if (!stepOneFlag || !finishFlag)
    return alert("please finish the parameters setting at the left side");

  for (let i = 1; i <= stateNumber; i++) {
    document.getElementById("table" + i).style.display = "none";
    circleArray[i].setAttribute("stroke-width", "3");
    circleFlag[i] = 0;
  }

  stateNumber++;

  document.getElementById("table").innerHTML = `State Number: ${stateNumber}`;
  let newCircle = createElem("circle", {
    class: "circle",
    id: "c" + stateNumber,
    cx: CX,
    cy: CY,
    r: R,
    stroke: "black",
    "stroke-width": "3",
    fill: "transparent",
  });
  let newBigCircle = createElem("circle", {
    class: "circle",
    id: "C" + stateNumber,
    cx: CX,
    cy: CY,
    r: BR,
    stroke: "transparent",
    "stroke-width": "2",
    fill: "transparent",
  });
  if (stateNumber === 1) {
    newBigCircle.setAttribute("stroke", "black");
    startState[1] = 1;

    // update the reset
    // first time the name always is state1
    document.getElementById("resetShow").innerHTML = `reset = 1 --> state1`;
  }
  svg.appendChild(newBigCircle);
  svg.appendChild(newCircle);

  //get the text coordinates
  let tx = CX;
  let ty = parseInt(CY) + parseInt(textFontSize) / 2 - 2;

  let newText = createElem("text", {
    class: "text",
    id: "t" + stateNumber,
    x: tx,
    y: ty,
    "font-size": textFontSize,
    "text-anchor": "middle",
  });
  newText.innerHTML = "state" + stateNumber;
  // table.textName[table.stateNumber] = newText.innerHTML;
  // table.textName.reverse().reverse();//keep updated in HTML

  svg.appendChild(newText);
  cirBindDragEventById("c" + stateNumber); // include binding the bigcircle
  textBindDragEventById("t" + stateNumber);

  //record each obj
  circleArray[stateNumber] = newCircle;
  bigCircleArray[stateNumber] = newBigCircle;
  textArray[stateNumber] = newText;

  //display current state
  let content = `<div id = ${"table" + stateNumber} >
                        <h4>Current State: </h4>
                        <p id = ${"circle" + stateNumber}>${
    textArray[stateNumber].innerHTML
  }</p>
                        <hr />
                        <h4>output:</h4>
                        <div id = ${"cirOutput" + stateNumber}></div>
                     </div>`;
  addHtmlById("dataTable", "beforeEnd", content);

  //select this new state
  circleFlag[stateNumber] = 1;
  circleArray[stateNumber].setAttribute("stroke-width", "5");
  /**************************binding the events of big circles*******************************/
  newBigCircle.addEventListener("mouseenter", bigCircleMouseEnter);

  newBigCircle.addEventListener("mousedown", bigCircleMouseDown);

  newBigCircle.addEventListener("mouseleave", bigCircleMouseLeave);

  /**************************binding the events of circles*******************************/
  //when select a circle
  newCircle.addEventListener("click", circleClick);

  //when double click the circles, create the input frame
  newCircle.addEventListener("dblclick", circleDoubleClick);

  /**************************binding the events of text*******************************/
  //when click text => select the circle
  newText.addEventListener("click", textClick);

  //when double click the text, create the input frame
  newText.addEventListener("dblclick", textDoubleClick);

  updateData();
}
