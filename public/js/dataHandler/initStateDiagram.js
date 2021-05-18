import { addHtmlById } from "../utils.js";
import createLineTable from "./createLineTable.js";
import syncParaTable from "./syncParaTable.js";
import {
  cirBindDragEventById,
  circleClick,
  circleDoubleClick,
  bigCircleMouseEnter,
  bigCircleMouseDown,
  bigCircleMouseLeave,
  textBindDragEventById,
  textClick,
  textDoubleClick,
  lineClick,
} from "../design/elmOperation/elmOperation.js";

export default function initStateDiagram() {
  const storage = window.localStorage;

  if (storage.getItem("data")) {
    const data = JSON.parse(storage.getItem("data"));

    if (data.stateNumber === 0) {
      return;
    }

    const svgDom = document.querySelector("svg");

    // draw the circles and text
    for (let i = 1; i <= data.stateNumber; i++) {
      svgDom.insertAdjacentHTML("beforeEnd", data.bigCircleStr[i]);
      svgDom.insertAdjacentHTML("beforeEnd", data.circleStr[i]);
      svgDom.insertAdjacentHTML("beforeEnd", data.textStr[i]);

      // get the dom elements
      const circle = document.querySelector("#c" + i);
      const bigCircle = document.querySelector("#C" + i);
      const text = document.querySelector("#t" + i);

      // synchronize
      circleArray[i] = circle;
      bigCircleArray[i] = bigCircle;
      textArray[i] = text;

      // bind the events
      cirBindDragEventById("c" + i); // include binding the bigcircle
      circle.addEventListener("click", circleClick);
      circle.addEventListener("dblclick", circleDoubleClick);

      bigCircle.addEventListener("mouseenter", bigCircleMouseEnter);
      bigCircle.addEventListener("mousedown", bigCircleMouseDown);
      bigCircle.addEventListener("mouseleave", bigCircleMouseLeave);

      textBindDragEventById("t" + i);
      text.addEventListener("click", textClick);
      text.addEventListener("dblclick", textDoubleClick);

      //display current state
      let content = `<div id = ${"table" + i}>
                              <h4>Current State: </h4>
                              <p id = ${"circle" + i}>${
        textArray[i].innerHTML
      }</p>
                              <hr />
                              <h4>output:</h4>
                              <div id = ${"cirOutput" + i}></div>
                             </div>`;
      addHtmlById("dataTable", "beforeEnd", content);
    }

    // only show the selected circle table
    // the default one is the first one
    for (let i = 1; i <= data.stateNumber; i++) {
      if (i != 1) {
        document.getElementById("table" + i).style.display = "none";
        circleArray[i].setAttribute("stroke-width", "3");
        circleFlag[i] = 0;
      } else {
        circleFlag[i] = 1;
        circleArray[i].setAttribute("stroke-width", "5");
        circleArray[i].setAttribute("stroke", "black");
      }
    }

    // draw the lines
    for (let i = 1; i < data.Tline.length; i++) {
      for (let j = 1; j < data.Tline[i].length; j++) {
        if (data.pathStr[i][j] != 0) {
          svgDom.insertAdjacentHTML("beforeEnd", data.pathStr[i][j]);

          // get the dom elements
          const curLine = svgDom.lastChild;

          // synchronize
          Tline[i][j] = curLine;

          // bind events
          curLine.addEventListener("click", lineClick);

          // create the related table
          createLineTable(i, j);
        }
      }
    }

    //make other line tables invisible
    for (let q = 1; q < lineFlag.length; q++) {
      for (let t = 1; t < lineFlag[q].length; t++) {
        if (Tline[q][t] != 0) {
          Tline[q][t].setAttribute("stroke", "black");
          Tline[q][t].setAttribute("stroke-width", "3");
          document.getElementById("table" + q + t).style.display = "none";
        }
      }
    }

    syncParaTable(data);

    // synchronize the conditions and outputs
    for (let i = 1; i < data.Tline.length; i++) {
      for (let j = 1; j < data.Tline[i].length; j++) {
        if (data.pathStr[i][j] != 0) {
          for (let k = 0; k < data.inputNum; k++) {
            const inputCondition = document.querySelector(
              "#input" + i + j + (k + 1)
            );

            inputCondition.value = data.inputCondition[i][j][k];
          }
          for (let k = 0; k < data.outputNum; k++) {
            const output = document.querySelector("#output" + i + j + (k + 1));

            const cirOutput = document.querySelector(
              "#cirOutput" + i + j + (k + 1)
            );

            output.value = data.outputForEachTran[i][j][k];
            cirOutput.innerHTML = `${data.outputName[k]}: ${data.outputForEachTran[i][j][k]}`;
          }
        }
      }
    }
  }
}
