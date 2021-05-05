/************************** drawing letiables setting*******************************/
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("svg");
const svgWidth = svg.getAttribute("width");
const svgHeight = svg.getAttribute("height");

const CX = "100";
const CY = "200";
const R = "40";
const BR = "50";
const textFontSize = "20";
const enterColor = "blue";
const leaveColor = "black";
const controlAngle = 20;
const rotateAngle = 15;
const limStateNumber = 11;

let stateNumber = 0;
let circleArray = [].fill(null);
let bigCircleArray = [].fill(null);
let textArray = [].fill(null);

let Tline = []; //line(start state, end state)
for (let i = 0; i < limStateNumber; i++) {
  Tline[i] = new Array(limStateNumber).fill(0);
}

let selfLinkAngle = [];

let lineFlag = []; //record if the line being selected
for (let i = 0; i < limStateNumber; i++) {
  lineFlag[i] = new Array(limStateNumber).fill(0);
}

let circleFlag = new Array(limStateNumber).fill(0); //record if the circle being selected

let startState = new Array(limStateNumber).fill(0);

/************get data from the local storage************************/
initStateDiagram();

function syncParaTable(data) {
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

function initStateDiagram() {
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

      bigCircle.addEventListener("mouseenter", BigCircleMouseEnter);
      bigCircle.addEventListener("mousedown", BigCircleMouseDown);
      bigCircle.addEventListener("mouseleave", BigCircleMouseLeave);

      texBindDragEventById("t" + i);
      text.addEventListener("click", textClick);
      text.addEventListener("dblclick", textDoubleClick);

      //display current state
      let content = `<div id = ${"table" + i}>
							<h4>Current State: </h4>
							<p id = ${"circle" + i}>${textArray[i].innerHTML}</p>
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

/**************************set a start state*******************************/
const startBtn = document.getElementById("setStartState");
startBtn.onclick = function () {
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
};
/**************************delete*******************************/
const deleteBtn = document.getElementById("delete");
deleteBtn.onclick = function () {
  let TlineFlag = []; //avoid repeatedly handling
  for (let i = 0; i < limStateNumber; i++) {
    TlineFlag[i] = new Array(limStateNumber).fill(0);
  }

  for (let i = 1; i < lineFlag.length; i++) {
    //when select a circle
    if (circleFlag[i] === 1) {
      circleFlag[i] = 0;

      //delete the inputframe
      let forn = document.getElementById("f" + i);
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
          let lineTable = document.getElementById("table" + i + k);
          lineTable.parentNode.removeChild(lineTable);
        }
        if (Tline[k][i] != 0) {
          Tline[k][i].parentNode.removeChild(Tline[k][i]);
          //Rline[i][k] = 0;
          Tline[k][i] = 0;
          let lineTable = document.getElementById("table" + k + i);
          lineTable.parentNode.removeChild(lineTable);

          //delete the infor of the output at the k circle
          let circle = document.getElementById("circle" + k + i);
          circle.parentNode.removeChild(circle);

          let cirOutput = document.getElementById("cirOutput" + k + i);
          cirOutput.parentNode.removeChild(cirOutput);
        }
      }

      circleArray[i].parentNode.removeChild(circleArray[i]);
      bigCircleArray[i].parentNode.removeChild(bigCircleArray[i]);
      textArray[i].parentNode.removeChild(textArray[i]);

      circleArray[i] = null;
      bigCircleArray[i] = null;
      textArray[i] = null;

      //delete information table of this state
      let ti = document.getElementById("table" + i);
      ti.parentNode.removeChild(ti);

      for (let q = i; q < stateNumber; q++) {
        //handle circles
        circleArray[q] = circleArray[q + 1];
        circleArray[q].setAttribute("id", "c" + q);
        circleArray[q + 1] = null;
        let table = document.getElementById("table" + (q + 1));
        table.setAttribute("id", "table" + q);

        let circleinfo = document.getElementById("circle" + (q + 1));
        circleinfo.setAttribute("id", "circle" + q);
        circleinfo.innerHTML = `${textArray[q + 1].innerHTML}`;

        let cirOutput = document.getElementById("cirOutput" + (q + 1));
        cirOutput.setAttribute("id", "cirOutput" + q);

        //handle lines
        for (let p = 1; p <= stateNumber; p++) {
          //from p to q+1
          if (Tline[p][q + 1] != 0 && TlineFlag[p][q + 1] === 0) {
            if (p < i) {
              Tline[p][q] = Tline[p][q + 1];
              Tline[p][q + 1] = 0;
              TlineFlag[p][q] = 1;

              let lineTable = document.getElementById("table" + p + (q + 1));
              lineTable.setAttribute("id", "table" + p + q);

              let line = document.getElementById("line" + p + (q + 1));
              line.setAttribute("id", "line" + p + q);
              //line.innerHTML = textArray[]
              let condition = document.getElementById(
                "condition" + p + (q + 1)
              );
              condition.setAttribute("id", "condition" + p + q);

              let Output = document.getElementById("output" + p + (q + 1));
              Output.setAttribute("id", "output" + p + q);

              for (let g = 1; g <= inputNumber; g++) {
                let input = document.getElementById("input" + p + (q + 1) + g);
                input.setAttribute("id", "input" + p + q + g);
              }

              for (let g = 1; g <= outputNumber; g++) {
                let output = document.getElementById(
                  "output" + p + (q + 1) + g
                );
                output.setAttribute("id", "output" + p + q + g);
              }

              //output at circle table
              let circle = document.getElementById("circle" + p + (q + 1));
              circle.setAttribute("id", "circle" + p + q);

              let circleOutput = document.getElementById(
                "cirOutput" + p + (q + 1)
              );
              circleOutput.setAttribute("id", "cirOutput" + p + q);

              for (let g = 1; g <= outputNumber; g++) {
                let ciroutput = document.getElementById(
                  "cirOutput" + p + (q + 1) + g
                );
                ciroutput.setAttribute("id", "cirOutput" + p + q + g);
              }

              // //update selflinkAngle
              // if (p === q) {
              // 	selfLinkAngle[p] = selfLinkAngle[p];
              // }
            } else {
              Tline[p - 1][q] = Tline[p][q + 1];
              Tline[p][q + 1] = 0;
              TlineFlag[p - 1][q] = 1;

              let lineTable = document.getElementById("table" + p + (q + 1));
              lineTable.setAttribute("id", "table" + (p - 1) + q);

              let line = document.getElementById("line" + p + (q + 1));
              line.setAttribute("id", "line" + (p - 1) + q);

              let condition = document.getElementById(
                "condition" + p + (q + 1)
              );
              condition.setAttribute("id", "condition" + (p - 1) + q);

              let Output = document.getElementById("output" + p + (q + 1));
              Output.setAttribute("id", "output" + (p - 1) + q);

              for (let g = 1; g <= inputNumber; g++) {
                let input = document.getElementById("input" + p + (q + 1) + g);
                input.setAttribute("id", "input" + (p - 1) + q + g);
              }

              for (let g = 1; g <= outputNumber; g++) {
                let output = document.getElementById(
                  "output" + p + (q + 1) + g
                );
                output.setAttribute("id", "output" + (p - 1) + q + g);
              }

              //output at circle table
              let circle = document.getElementById("circle" + p + (q + 1));
              circle.setAttribute("id", "circle" + (p - 1) + q);

              let circleOutput = document.getElementById(
                "cirOutput" + p + (q + 1)
              );
              circleOutput.setAttribute("id", "cirOutput" + (p - 1) + q);

              for (let g = 1; g <= outputNumber; g++) {
                let ciroutput = document.getElementById(
                  "cirOutput" + p + (q + 1) + g
                );
                ciroutput.setAttribute("id", "cirOutput" + (p - 1) + q + g);
              }

              //update selflinkAngle
              if (p - 1 === q) {
                selfLinkAngle[p - 1] = selfLinkAngle[p];
              }
            }
          }

          //from q+1 to p
          if (Tline[q + 1][p] != 0 && p != i && TlineFlag[q + 1][p] === 0) {
            //if the state order is smaller than the deleted state
            //no need to sub 1
            if (p < i) {
              Tline[q][p] = Tline[q + 1][p];
              Tline[q + 1][p] = 0;
              TlineFlag[q][p] = 1;
              //Rline[p][q] = Rline[p][q+1];
              //Rline[p][q+1] = 0;
              let lineTable = document.getElementById("table" + (q + 1) + p);
              lineTable.setAttribute("id", "table" + q + p);

              let line = document.getElementById("line" + (q + 1) + p);
              line.setAttribute("id", "line" + q + p);

              let condition = document.getElementById(
                "condition" + (q + 1) + p
              );
              condition.setAttribute("id", "condition" + q + p);

              let Output = document.getElementById("output" + (q + 1) + p);
              Output.setAttribute("id", "output" + q + p);

              for (let g = 1; g <= inputNumber; g++) {
                let input = document.getElementById("input" + (q + 1) + p + g);
                input.setAttribute("id", "input" + q + p + g);
              }

              for (let g = 1; g <= outputNumber; g++) {
                let output = document.getElementById(
                  "output" + (q + 1) + p + g
                );
                output.setAttribute("id", "output" + q + p + g);
              }

              //output at circle table
              let circle = document.getElementById("circle" + (q + 1) + p);
              circle.setAttribute("id", "circle" + q + p);

              let circleOutput = document.getElementById(
                "cirOutput" + (q + 1) + p
              );
              circleOutput.setAttribute("id", "cirOutput" + q + p);

              for (let g = 1; g <= outputNumber; g++) {
                let ciroutput = document.getElementById(
                  "cirOutput" + (q + 1) + p + g
                );
                ciroutput.setAttribute("id", "cirOutput" + q + p + g);
              }

              //update selflinkAngle
              if (q === p) {
                selfLinkAngle[q] = selfLinkAngle[q + 1];
              }
            }
            //if the state order is bigger than the deleted state
            //need to sub 1
            else {
              // alert((q+1));
              // alert(p);
              Tline[q][p - 1] = Tline[q + 1][p];
              Tline[q + 1][p] = 0;
              TlineFlag[q][p - 1] = 1;
              //Rline[p-1][q] = Rline[p][q+1];
              //Rline[p][q+1] = 0;
              let lineTable = document.getElementById("table" + (q + 1) + p);
              lineTable.setAttribute("id", "table" + q + (p - 1));

              let line = document.getElementById("line" + (q + 1) + p);
              line.setAttribute("id", "line" + q + (p - 1));

              let condition = document.getElementById(
                "condition" + (q + 1) + p
              );
              condition.setAttribute("id", "condition" + q + (p - 1));

              let Output = document.getElementById("output" + (q + 1) + p);
              Output.setAttribute("id", "output" + q + (p - 1));

              for (let g = 1; g <= inputNumber; g++) {
                let input = document.getElementById("input" + (q + 1) + p + g);
                input.setAttribute("id", "input" + q + (p - 1) + g);
              }

              for (let g = 1; g <= outputNumber; g++) {
                let output = document.getElementById(
                  "output" + (q + 1) + p + g
                );
                output.setAttribute("id", "output" + q + (p - 1) + g);
              }

              //output at circle table
              let circle = document.getElementById("circle" + (q + 1) + p);
              circle.setAttribute("id", "circle" + q + (p - 1));

              let circleOutput = document.getElementById(
                "cirOutput" + (q + 1) + p
              );
              circleOutput.setAttribute("id", "cirOutput" + q + (p - 1));

              for (let g = 1; g <= outputNumber; g++) {
                let ciroutput = document.getElementById(
                  "cirOutput" + (q + 1) + p + g
                );
                ciroutput.setAttribute("id", "cirOutput" + q + (p - 1) + g);
              }

              //update selflinkAngle
              if (q === p - 1) {
                selfLinkAngle[q] = selfLinkAngle[q + 1];
              }
            }
          }
        }
        bigCircleArray[q] = bigCircleArray[q + 1];
        bigCircleArray[q].setAttribute("id", "C" + q);
        bigCircleArray[q + 1] = null;

        textArray[q] = textArray[q + 1];
        textArray[q].setAttribute("id", "t" + q);
        textArray[q + 1] = null;

        //textArray[q].innerHTML = table.textName[q];
        cirBindDragEventById("c" + q);
        texBindDragEventById("t" + q);
      }

      stateNumber--;
      document.getElementById(
        "table"
      ).innerHTML = `State Number: ${stateNumber}`;

      // update reset
      if (stateNumber === 0) {
        document.getElementById(
          "resetShow"
        ).innerHTML = `reset = 1 --> no state yet`;
      }

      //chaneg the start state and selected state when the deleted state is a start state
      if (startState[i] === 1) {
        startState[i] = 0;
      }
      //all go to the state1 defaultly
      if (stateNumber != 0) {
        startState.fill(0);
        startState[1] = 1;
        bigCircleArray[1].setAttribute("stroke", "black");
        circleArray[1].setAttribute("stroke-width", "5");
        circleFlag[1] = 1;
        document.getElementById("table1").style.display = "inline-block";

        // update the reset
        document.getElementById(
          "resetShow"
        ).innerHTML = `reset = 1 --> ${textArray[1].innerHTML}`;
      }

      updateData();
      return;
    }

    //when select a line
    for (let j = 1; j < lineFlag[i].length; j++) {
      if (lineFlag[i][j] === 1) {
        lineFlag[i][j] = 0;
        Tline[i][j].parentNode.removeChild(Tline[i][j]);
        Tline[i][j] = 0;

        //delete the table
        let lineTable = document.getElementById("table" + i + j);
        lineTable.parentNode.removeChild(lineTable);
        //Rline[j][i] = 0;

        //handle the output at circle table
        let circle = document.getElementById("circle" + i + j);
        circle.parentNode.removeChild(circle);

        let cirOutput = document.getElementById("cirOutput" + i + j);
        cirOutput.parentNode.removeChild(cirOutput);

        updateData();
        return;
      }
    }
  }
  alert("please select at least a element");
};

/***************clear all states ************/
const clearAllBtn = document.querySelector("#clearAll");
clearAllBtn.onclick = function () {
  if (stateNumber === 0) {
    return;
  }

  if (circleFlag.findIndex((x) => x === 1) != -1) {
    const curStateNum = stateNumber;
    for (let i = 0; i < curStateNum; i++) {
      deleteBtn.click();
    }
  } else {
    //  make sure all the lines are not selected
    for (let i = 0; i < lineFlag.length; i++) {
      lineFlag[i].fill(0);
    }

    // select the first state
    circleFlag.fill(0);
    circleFlag[1] = 1;

    // trigger itself
    this.click();
  }
};

/**************************add a new state or circle*******************************/
function BigCircleMouseEnter() {
  let i = this.getAttribute("id").slice(1, this.getAttribute("id").length);
  let circle = document.getElementById("c" + i);
  //this.style.stroke = enterColor;
  this.style.cursor = "crosshair";
  circle.style.stroke = enterColor;
}

function BigCircleMouseDown(event) {
  let groupIndex = this.getAttribute("id").slice(
    1,
    this.getAttribute("id").length
  );
  groupIndex = parseInt(groupIndex);
  let circleCx = circleArray[groupIndex].getAttribute("cx");
  let circleCy = circleArray[groupIndex].getAttribute("cy");

  event = event || window.event;
  event.preventDefault(); //avoid the text being selected

  let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
  let scrollY = document.documentElement.scrollTop || document.body.scrollTop;

  let svgLeft = getElementLeft(document.getElementById("svgContainer"));
  let svgTop = getElementTop(document.getElementById("svgContainer"));

  let x = event.clientX - svgLeft + scrollX;
  let y = event.clientY - svgTop + scrollY;

  let dis = pointDistance(circleCx, circleCy, x, y);

  //(startX-circleCx)/(x-circleCx) = R/dis
  //(circleCy-startY)/(circleCy-y) = R/dis
  startX = (R / dis) * (x - circleCx) + parseInt(circleCx);
  startY = parseInt(circleCy) - (R / dis) * (circleCy - y);

  let newLine = createElem("path", {
    class: "line",
    d: "M" + startX + " " + startY + "L" + startX + " " + startY,
    stroke: "black",
    fill: "transparent",
    "stroke-width": "3",
  });
  newLine.setAttribute("marker-end", "url(#markerArrow)");
  svg.appendChild(newLine);

  document.onmousemove = (event) => {
    //avoid the text being selected
    // this is the newBigCircle
    this.releaseCapture && this.releaseCapture();
    event = event || window.event;
    let scrollX =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;

    let xm = event.clientX - svgLeft + scrollX;
    let ym = event.clientY - svgTop + scrollY;

    let dism = pointDistance(circleCx, circleCy, xm, ym);

    //(startXm-circleCx)/(xm-circleCx) = R/dis
    //(circleCy-startYm)/(circleCy-ym) = R/dis
    startXm = (R / dism) * (xm - circleCx) + parseInt(circleCx);
    startYm = parseInt(circleCy) - (R / dism) * (circleCy - ym);

    if (dism <= BR) {
      //if there is not a selfLink
      if (Tline[groupIndex][groupIndex] === 0) {
        drawSelfCur(newLine, circleCx, circleCy, xm, ym, groupIndex);
        newLine.setAttribute("marker-end", "url(#markerArrow)");
      }
    } else {
      newLine.setAttribute(
        "d",
        "M" + startXm + " " + startYm + "L" + xm + " " + ym
      );
      newLine.setAttribute("marker-end", "url(#markerArrow)");
    }
  };

  document.onmouseup = (event) => {
    //avoid the text being selected
    // this is the newBigCircle
    this.releaseCapture && this.releaseCapture();

    event = event || window.event;
    let scrollX =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;

    let xu = event.clientX - svgLeft + scrollX;
    let yu = event.clientY - svgTop + scrollY;

    let disu = pointDistance(circleCx, circleCy, xu, yu);

    startXu = (R / disu) * (xu - circleCx) + parseInt(circleCx);
    startYu = parseInt(circleCy) - (R / disu) * (circleCy - yu);

    let flag = 0;
    for (let i = 1; i <= stateNumber; i++) {
      let bcir = document.getElementById("C" + i);
      let bcx = bcir.getAttribute("cx");
      let bcy = bcir.getAttribute("cy");

      let disu = pointDistance(bcx, bcy, xu, yu);
      let dis = pointDistance(bcx, bcy, circleCx, circleCy);

      if (disu <= BR && Tline[groupIndex][i] === 0) {
        flag = 1;
        if (i === groupIndex) {
          drawSelfCur(newLine, circleCx, circleCy, xu, yu, groupIndex);
          Tline[groupIndex][i] = newLine;
          //Rline[i][groupIndex] = newLine;
        } else {
          let tr = parseInt(R) + 10; //give some space for arrow
          //(endX-circleCx)/(bcx-circleCx) = (dis-tr)/dis
          //(endY-circleCy)/(bcy-circleCy) = (dis-tr)/dis
          let endX = ((dis - tr) / dis) * (bcx - circleCx) + parseInt(circleCx);
          let endY = ((dis - tr) / dis) * (bcy - circleCy) + parseInt(circleCy);

          //when two links
          if (Tline[i][groupIndex] != 0) {
            //draw the curve
            drawCurves(
              newLine,
              groupIndex,
              i,
              startXu,
              startYu,
              endX,
              endY,
              controlAngle,
              rotateAngle,
              tr
            );
            Tline[groupIndex][i] = newLine;
            //Rline[i][groupIndex] = newLine;

            //reverse
            endX = (tr / disu) * (xu - circleCx) + parseInt(circleCx);
            endY = parseInt(circleCy) - (tr / disu) * (circleCy - yu);
            startXu = ((dis - R) / dis) * (bcx - circleCx) + parseInt(circleCx);
            startYu = ((dis - R) / dis) * (bcy - circleCy) + parseInt(circleCy);
            drawCurves(
              Tline[i][groupIndex],
              i,
              groupIndex,
              startXu,
              startYu,
              endX,
              endY,
              controlAngle,
              rotateAngle,
              tr
            );
          } else {
            //link the two circles
            Tline[groupIndex][i] = newLine;
            Tline[groupIndex][i].setAttribute(
              "d",
              "M" + startXu + " " + startYu + "L" + endX + " " + endY
            );
            //Rline[i][groupIndex] = newLine;
          }
        }

        createLineTable(groupIndex, i);

        //remind user to set the parameters first
        let remindFlag = 0;
        if (stepOneFlag === 1) {
          for (let i = 1; i <= inputNumber; i++) {
            if (document.getElementById("input" + i).value === "") {
              alert("please set the parameters at the left table first");
              remindFlag = 1;
            }
          }
          for (let i = 1; i <= outputNumber; i++) {
            if (
              document.getElementById("output" + i).value === "" &&
              remindFlag === 0
            ) {
              alert("please set the parameters at the left table first");
              //remindFlag = 1;
            }
          }
        } else {
          alert("please set the parameters at the left table first");
          //remindFlag = 1;
        }

        //select this new line
        //make other line tables invisible
        for (let q = 1; q < lineFlag.length; q++) {
          for (let t = 1; t < lineFlag[q].length; t++) {
            if (Tline[q][t] != 0) {
              lineFlag[q][t] = 0;
              Tline[q][t].setAttribute("stroke", "black");
              Tline[q][t].setAttribute("stroke-width", "3");
              document.getElementById("table" + q + t).style.display = "none";
            }
          }
        }
        document.getElementById("table" + groupIndex + i).style.display =
          "block";
        Tline[groupIndex][i].setAttribute("stroke", "blue");
        Tline[groupIndex][i].setAttribute("stroke-width", "5");
        lineFlag[groupIndex][i] = 1;

        //make circle tables invisible
        for (let i = 1; i <= stateNumber; i++) {
          circleArray[i].setAttribute("stroke-width", "3");
          circleFlag[i] = 0;
          document.getElementById("table" + i).style.display = "none";
        }
      }

      /**************************binding the events of lines (delete)*******************************/
      if (Tline[groupIndex][i] != 0) {
        Tline[groupIndex][i].addEventListener("click", lineClick);
      }
    }

    //see if there is a linked circle
    if (flag === 0) {
      newLine.parentNode.removeChild(newLine);
    }

    document.onmousemove = null;
    document.onmouseup = null;

    updateData();
  };
}

function createLineTable(groupIndex, i) {
  //create a info table for this line
  let lineTableContent = `<div class="lineTable" id=${"table" + groupIndex + i}>
						<h4>Current Line:</h4>
						<p id=${"line" + groupIndex + i}>
						${textArray[groupIndex].innerHTML} => ${textArray[i].innerHTML}</p>
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
    let outputValue = document.getElementById("output" + groupIndex + i + k)
      .value;
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

function lineClick(event) {
  //remind user to set the parameters first
  let remindFlag = 0;
  if (stepOneFlag === 1) {
    for (let i = 1; i <= inputNumber; i++) {
      if (document.getElementById("input" + i).value === "") {
        alert("please set the parameters at the left table first");
        remindFlag = 1;
      }
    }
    for (let i = 1; i <= outputNumber; i++) {
      if (
        document.getElementById("output" + i).value === "" &&
        remindFlag === 0
      ) {
        alert("please set the parameters at the left table first");
        //remindFlag = 1;
      }
    }
  } else {
    alert("please set the parameters at the left table first");
    //remindFlag = 1;
  }

  event.stopPropagation(); //avoid click the SVG
  this.setAttribute("stroke", "blue");
  this.setAttribute("stroke-width", "5");
  line = this;

  let groupIndex1;
  let groupIndex2;
  for (let i = 1; i < limStateNumber; i++) {
    if (i <= stateNumber) {
      circleArray[i].setAttribute("stroke-width", "3");
      circleFlag[i] = 0;
    }

    for (let j = 1; j < limStateNumber; j++) {
      if (Tline[i][j] === this) {
        groupIndex1 = i;
        groupIndex2 = j;
        //alert(i + ' ' + j);
        lineFlag[i][j] = 1;
      }
      if (Tline[i][j] != 0 && Tline[i][j] != this) {
        lineFlag[i][j] = 0;
        Tline[i][j].setAttribute("stroke", "black");
        Tline[i][j].setAttribute("stroke-width", "3");
        //Rline[j][i].setAttribute('stroke', 'black');
        //Rline[j][i].setAttribute('stroke-width', '3');
      }
    }
  }

  svg.onclick = function () {
    lineFlag[groupIndex1][groupIndex2] = 0;
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "3");
    this.onclick = null;
  };

  //make table information for circles invisible
  for (let i = 1; i <= stateNumber; i++) {
    document.getElementById("table" + i).style.display = "none";
  }

  //make table information for lines invisible
  for (let q = 1; q < lineFlag.length; q++) {
    for (let t = 1; t < lineFlag[q].length; t++) {
      if (document.getElementById("table" + q + t)) {
        document.getElementById("table" + q + t).style.display = "none";
      }
    }
  }
  document.getElementById("table" + groupIndex1 + groupIndex2).style.display =
    "block";
}

function BigCircleMouseLeave() {
  let i = this.getAttribute("id").slice(1, this.getAttribute("id").length);
  let circle = document.getElementById("c" + i);
  //this.style.stroke = leaveColor;
  circle.style.stroke = leaveColor;
}

function circleClick(event) {
  event.stopPropagation(); //avoid click the SVG
  this.setAttribute("stroke-width", "5");
  circle = this;

  let index;
  for (let i = 1; i < circleFlag.length; i++) {
    if (circleArray[i] === this) {
      index = i;
      circleFlag[i] = 1;
    }
    if (circleArray[i] && circleArray[i] != this && i <= stateNumber) {
      circleArray[i].setAttribute("stroke-width", "3");
      circleFlag[i] = 0;
    }
    for (let j = 1; j < circleFlag.length; j++) {
      if (Tline[i][j] != 0) {
        lineFlag[i][j] = 0;
        Tline[i][j].setAttribute("stroke", "black");
        Tline[i][j].setAttribute("stroke-width", "3");
        //Rline[j][i].setAttribute("stroke", "black");
        //Rline[j][i].setAttribute("stroke-width", "3");
      }
    }
  }
  svg.onclick = function () {
    circle.setAttribute("stroke-width", "3");
    circleFlag[index] = 0;

    //avoid  other inputframe at other circles
    for (let j = 1; j <= stateNumber; j++) {
      let forn = document.getElementById("f" + j);
      //alert(foreign);
      let txt = document.getElementById("t" + j);
      if (forn) {
        txt.innerHTML = forn.firstChild.value;
        forn.parentNode.removeChild(forn);
      }
    }
    this.onclick = null;
  };

  //table information for circles
  for (let i = 1; i <= stateNumber; i++) {
    document.getElementById("table" + i).style.display = "none";
  }
  document.getElementById("table" + index).style.display = "inline-block";

  //make table information for lines invisible
  for (let q = 1; q < lineFlag.length; q++) {
    for (let t = 1; t <= lineFlag[q].length; t++) {
      if (document.getElementById("table" + q + t)) {
        document.getElementById("table" + q + t).style.display = "none";
      }
    }
  }
}

function circleDoubleClick() {
  let x = this.getAttribute("cx") - R + 5;
  let y = this.getAttribute("cy") - textFontSize / 2 - 8;
  let i = this.getAttribute("id").slice(1, this.getAttribute("id").length);
  let cir = document.getElementById("c" + i);
  let text = document.getElementById("t" + i);

  //avoid  other inputframe at other circles
  for (let j = 1; j <= stateNumber; j++) {
    let forn = document.getElementById("f" + j);
    //alert(foreign);
    let txt = document.getElementById("t" + j);
    if (forn && j != i) {
      txt.innerHTML = forn.firstChild.value;
      forn.parentNode.removeChild(forn);
    }
  }

  //avoid creating multiple inputFrame
  if (document.getElementById("f" + i)) {
    return;
  }

  let foreign = createElem("foreignObject", {
    id: "f" + i,
    x: x,
    y: y,
    width: "70",
    height: "30",
  });
  foreign.innerHTML = "<input type='text' maxlength='6'/>";
  svg.appendChild(foreign);

  //save the last value;
  foreign.firstChild.value = text.innerHTML;
  let tempText = text.innerHTML;
  //temperorily set blank for being invisible behind the input frame
  text.innerHTML = "";
  //show the cursor and select the value at the beginning
  foreign.firstChild.focus();
  foreign.firstChild.selectionStart = 0;
  foreign.firstChild.selectionEnd = foreign.firstChild.value.length;

  //when click beyond the circles, delete the input frame
  svg.onclick = function (event) {
    event = event || window.event;

    let svgLeft = getElementLeft(document.getElementById("svgContainer"));
    let svgTop = getElementTop(document.getElementById("svgContainer"));
    let dis = pointDistance(
      cir.getAttribute("cx"),
      cir.getAttribute("cy"),
      event.clientX - svgLeft,
      event.clientY - svgTop
    );
    //alert(dis);
    if (dis > R) {
      updateData();
      if (foreign.firstChild.value.length === 0) {
        text.innerHTML = tempText;
      } else {
        text.innerHTML = foreign.firstChild.value;
      }
      // table.textName[i] = foreign.firstChild.value;
      // table.textName.reverse().reverse();

      document.getElementById(
        "circle" + i
      ).innerHTML = `${textArray[i].innerHTML}`;

      // update reset
      document.getElementById(
        "resetShow"
      ).innerHTML = `reset = 1 --> ${textArray[i].innerHTML}`;

      //change the stateName at line info table
      for (let k = 1; k < lineFlag.length; k++) {
        if (Tline[i][k] != 0) {
          let lineinfo = document.getElementById("line" + i + k);
          lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
        }
        if (Tline[k][i] != 0) {
          let lineinfo = document.getElementById("line" + k + i);
          lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;

          let nextText = document.getElementById("circle" + k + i);
          nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
        }
      }

      foreign.parentNode.removeChild(foreign);
      this.onclick = null; //cancel this event everytime
    }
  };

  foreign.firstChild.onchange = function () {
    //let text = document.getElementById("t"+i);
    if (this.value != "") {
      updateData();
      text.innerHTML = this.value;
      // table.textName[i] = this.value;
      // table.textName.reverse().reverse();

      document.getElementById(
        "circle" + i
      ).innerHTML = `${textArray[i].innerHTML}`;

      // update reset
      document.getElementById(
        "resetShow"
      ).innerHTML = `reset = 1 --> ${textArray[i].innerHTML}`;

      //change the stateName at line info table
      for (let k = 1; k < lineFlag.length; k++) {
        if (Tline[i][k] != 0) {
          let lineinfo = document.getElementById("line" + i + k);
          lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
        }
        if (Tline[k][i] != 0) {
          let lineinfo = document.getElementById("line" + k + i);
          lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;

          let nextText = document.getElementById("circle" + k + i);
          nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
        }
      }

      foreign.parentNode.removeChild(foreign);
    } else {
      alert("please enter the value~");
      this.focus();
    }
  };
}

function textClick(event) {
  event.stopPropagation();
  let num = this.getAttribute("id").slice(1, this.getAttribute("id").length);
  circleArray[num].setAttribute("stroke-width", "5");

  let index;
  for (let i = 1; i < circleFlag.length; i++) {
    if (circleArray[i] === circleArray[num]) {
      index = i;
      circleFlag[i] = 1;
    }
    if (circleArray[i] && circleArray[i] != circleArray[num]) {
      circleArray[i].setAttribute("stroke-width", "3");
      circleFlag[i] = 0;
    }
    for (let j = 1; j < circleFlag.length; j++) {
      if (Tline[i][j] != 0) {
        lineFlag[i][j] = 0;
        Tline[i][j].setAttribute("stroke", "black");
        Tline[i][j].setAttribute("stroke-width", "3");
        //Rline[j][i].setAttribute("stroke", "black");
        //Rline[j][i].setAttribute("stroke-width", "3");
      }
    }
  }
  svg.onclick = function () {
    circleArray[num].setAttribute("stroke-width", "3");
    circleFlag[index] = 0;

    for (let j = 1; j <= stateNumber; j++) {
      let forn = document.getElementById("f" + j);
      //alert(foreign);
      let txt = document.getElementById("t" + j);
      if (forn) {
        txt.innerHTML = forn.firstChild.value;
        forn.parentNode.removeChild(forn);
      }
    }
    this.onclick = null;
  };

  //make table information for circles invisible
  for (let i = 1; i <= stateNumber; i++) {
    document.getElementById("table" + i).style.display = "none";
  }
  document.getElementById("table" + index).style.display = "inline-block";

  //make table information for lines invisible
  for (let q = 1; q < lineFlag.length; q++) {
    for (let t = 1; t <= lineFlag[q].length; t++) {
      if (document.getElementById("table" + q + t)) {
        document.getElementById("table" + q + t).style.display = "none";
      }
    }
  }
  document.onmousemove = null;
}

function textDoubleClick() {
  document.onmousemove = null;

  let i = this.getAttribute("id").slice(1, this.getAttribute("id").length);
  let cir = document.getElementById("c" + i);
  let text = document.getElementById("t" + i);

  let x = cir.getAttribute("cx") - R + 5;
  let y = cir.getAttribute("cy") - textFontSize / 2 - 8;

  for (let j = 1; j <= stateNumber; j++) {
    let forn = document.getElementById("f" + j);
    let txt = document.getElementById("t" + j);
    if (forn && j != i) {
      txt.innerHTML = forn.firstChild.value;
      forn.parentNode.removeChild(forn);
    }
  }

  //avoid creating multiple inputFrame
  if (document.getElementById("f" + i)) {
    return;
  }

  let foreign = createElem("foreignObject", {
    id: "f" + i,
    x: x,
    y: y,
    width: "70",
    height: "30",
  });
  foreign.innerHTML = "<input type='text' maxlength='6'/>";
  svg.appendChild(foreign);

  //save the last value;
  foreign.firstChild.value = text.innerHTML;
  let tempText = text.innerHTML;
  //temperorily set blank
  text.innerHTML = "";
  //show the cursor and select the value at the beginning
  foreign.firstChild.focus();
  foreign.firstChild.selectionStart = 0;
  foreign.firstChild.selectionEnd = foreign.firstChild.value.length;

  //when click beyond the circles, delete the input frame
  svg.onclick = function (event) {
    event = event || window.event;
    let svgLeft = getElementLeft(document.getElementById("svgContainer"));
    let svgTop = getElementTop(document.getElementById("svgContainer"));
    let dis = pointDistance(
      cir.getAttribute("cx"),
      cir.getAttribute("cy"),
      event.clientX - svgLeft,
      event.clientY - svgTop
    );

    if (dis > R) {
      updateData();
      if (foreign.firstChild.value.length === 0) {
        text.innerHTML = tempText;
      } else {
        text.innerHTML = foreign.firstChild.value;
      }
      // table.textName[i] = foreign.firstChild.value;
      // table.textName.reverse().reverse();

      document.getElementById(
        "circle" + i
      ).innerHTML = `${textArray[i].innerHTML}`;

      // update reset
      document.getElementById(
        "resetShow"
      ).innerHTML = `reset = 1 --> ${textArray[i].innerHTML}`;

      //change the stateName at line info table
      for (let k = 1; k < lineFlag.length; k++) {
        if (Tline[i][k] != 0) {
          let lineinfo = document.getElementById("line" + i + k);
          lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
        }
        if (Tline[k][i] != 0) {
          let lineinfo = document.getElementById("line" + k + i);
          lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;

          let nextText = document.getElementById("circle" + k + i);
          nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
        }
      }

      //console.log(table.textName[i]);
      foreign.parentNode.removeChild(foreign);
      this.onclick = null; //cancel this event everytime
    }
  };

  foreign.firstChild.onchange = function () {
    let text = document.getElementById("t" + i);
    if (this.value != "") {
      updateData();
      text.innerHTML = this.value;
      // table.textName[i] = this.value;
      // table.textName.reverse().reverse();

      document.getElementById(
        "circle" + i
      ).innerHTML = `${textArray[i].innerHTML}`;

      // update reset
      document.getElementById(
        "resetShow"
      ).innerHTML = `reset = 1 --> ${textArray[i].innerHTML}`;

      //change the stateName at line info table
      for (let k = 1; k < lineFlag.length; k++) {
        if (Tline[i][k] != 0) {
          let lineinfo = document.getElementById("line" + i + k);
          lineinfo.innerHTML = `${textArray[i].innerHTML} => ${textArray[k].innerHTML}`;
        }
        if (Tline[k][i] != 0) {
          let lineinfo = document.getElementById("line" + k + i);
          lineinfo.innerHTML = `${textArray[k].innerHTML} => ${textArray[i].innerHTML}`;

          let nextText = document.getElementById("circle" + k + i);
          nextText.innerHTML = `=> ${textArray[i].innerHTML}`;
        }
      }
      foreign.parentNode.removeChild(foreign);
    } else {
      alert("please enter the value~");
      this.focus();
    }
  };

  updateData();
}

const addStateBtn = document.getElementById("addState");
addStateBtn.onclick = function () {
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
  texBindDragEventById("t" + stateNumber);

  //record each obj
  circleArray[stateNumber] = newCircle;
  bigCircleArray[stateNumber] = newBigCircle;
  textArray[stateNumber] = newText;

  //display current state
  let content = `<div id = ${"table" + stateNumber} >
				      <h4>Current State: </h4>
					  <p id = ${"circle" + stateNumber}>${textArray[stateNumber].innerHTML}</p>
					  <hr />
					  <h4>output:</h4>
					  <div id = ${"cirOutput" + stateNumber}></div>
				   </div>`;
  addHtmlById("dataTable", "beforeEnd", content);

  //select this new state
  circleFlag[stateNumber] = 1;
  circleArray[stateNumber].setAttribute("stroke-width", "5");
  /**************************binding the events of big circles*******************************/
  newBigCircle.addEventListener("mouseenter", BigCircleMouseEnter);

  newBigCircle.addEventListener("mousedown", BigCircleMouseDown);

  newBigCircle.addEventListener("mouseleave", BigCircleMouseLeave);

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
};

/**************************functions definition********************************/
/*createElem("circle", {'cx':'500', 'cy':'500', 'r':'50'})
 *JSON format*/
function createElem(tag, objAttr) {
  let elem = document.createElementNS(svgNS, tag);
  for (let attr in objAttr) {
    elem.setAttribute(attr, objAttr[attr]);
  }
  return elem;
}

//when drag text
function texBindDragEventById(id) {
  let text = document.getElementById(id);
  let groupIndex = id.slice(1, id.length);
  groupIndex = parseInt(groupIndex);
  let circle = document.getElementById("c" + groupIndex);
  let bigCircle = document.getElementById("C" + groupIndex);

  //change style
  text.onmouseenter = function () {
    circle.style.stroke = enterColor;
    //bigCircle.style.stroke = enterColor;
  };
  text.onmouseleave = function () {
    circle.style.stroke = leaveColor;
    //bigCircle.style.stroke = leaveColor;
  };

  text.onmousedown = function (event) {
    event = event || window.event;
    let dx = event.clientX - text.getAttribute("x");
    let dy = event.clientY - text.getAttribute("y");

    //change style
    // circle.setAttribute("r", parseInt(R)+5);
    // bigCircle.setAttribute("r", parseInt(BR)+5);

    document.onmousemove = function (event) {
      event = event || window.event;
      let left = event.clientX - dx;
      let top = event.clientY - dy;

      let cirLeft = left;
      let cirTop = top - textFontSize / 2 + 2;

      //deal with the boundary
      if (cirLeft <= bigCircle.getAttribute("r")) {
        cirLeft = bigCircle.getAttribute("r");
        left = cirLeft;
      }
      if (cirTop <= bigCircle.getAttribute("r")) {
        cirTop = bigCircle.getAttribute("r");
        //top = cirTop + textFontSize/2 - 2;
        top = 58;
      }
      if (svgWidth - cirLeft <= bigCircle.getAttribute("r")) {
        cirLeft = svgWidth - bigCircle.getAttribute("r");
        left = cirLeft;
      }
      if (svgHeight - cirTop <= bigCircle.getAttribute("r")) {
        cirTop = svgHeight - bigCircle.getAttribute("r");
        top = cirTop + textFontSize / 2 - 2;
      }

      //avoid overlap(only two)
      let elemIndex = parseInt(id.slice(1, id.length));
      //circlePosition[elemIndex] = [cirLeft, cirTop];

      if (stateNumber > 1) {
        for (let i = 1; i < stateNumber + 1; i++) {
          if (elemIndex != i) {
            let cir = document.getElementById("c" + i);
            let cirLeft1 = parseInt(cir.getAttribute("cx"));
            let cirTop1 = parseInt(cir.getAttribute("cy"));

            let dis = pointDistance(cirLeft, cirTop, cirLeft1, cirTop1);
            if (dis <= parseInt(2 * BR + 5)) {
              //similar triangle principle
              let offY = ((2 * BR + 5 - dis) / dis) * (cirTop1 - cirTop);
              let offX = ((2 * BR + 5 - dis) / dis) * (cirLeft1 - cirLeft);
              cirLeft = cirLeft - offX;
              cirTop = cirTop - offY;

              //boudary problem
              if (cirTop <= BR) {
                cirTop = BR;
                if (cirLeft >= cirLeft1) {
                  cirLeft =
                    cirLeft1 + Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
                } else {
                  cirLeft =
                    cirLeft1 - Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
                }
              }
              if (svgHeight - cirTop <= BR) {
                cirTop = svgHeight - BR;
                if (cirLeft >= cirLeft1) {
                  cirLeft =
                    cirLeft1 +
                    Math.sqrt((2 * BR) ** 2 - (svgHeight - BR - cirTop1) ** 2);
                } else {
                  cirLeft =
                    cirLeft1 -
                    Math.sqrt((2 * BR) ** 2 - (svgHeight - BR - cirTop1) ** 2);
                }
              }

              if (cirLeft <= BR) {
                cirLeft = BR;
                if (cirTop >= cirTop1) {
                  cirTop =
                    cirTop1 + Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
                } else {
                  cirTop =
                    cirTop1 - Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
                }
              }
              if (svgWidth - cirLeft <= BR) {
                cirLeft = svgWidth - BR;
                if (cirTop >= cirTop1) {
                  cirTop =
                    cirTop1 +
                    Math.sqrt((2 * BR) ** 2 - (svgWidth - BR - cirLeft1) ** 2);
                } else {
                  cirTop =
                    cirTop1 -
                    Math.sqrt((2 * BR) ** 2 - (svgWidth - BR - cirLeft1) ** 2);
                }
              }

              left = cirLeft;
              top = cirTop + textFontSize / 2 - 2;
              if (cirTop === bigCircle.getAttribute("r")) {
                top = 58;
              }
            }
          }
        }
      }

      text.setAttribute("x", left);
      text.setAttribute("y", top);

      circle.setAttribute("cx", cirLeft);
      circle.setAttribute("cy", cirTop);

      bigCircle.setAttribute("cx", cirLeft);
      bigCircle.setAttribute("cy", cirTop);

      //lines
      for (let i = 1; i <= stateNumber; i++) {
        //as a start circle
        if (Tline[groupIndex][i] != 0) {
          let cx = circleArray[i].getAttribute("cx");
          let cy = circleArray[i].getAttribute("cy");

          //if it is a selflink
          if (i === groupIndex) {
            let x = pointOnCircle(
              cx,
              cy,
              parseInt(cx) + R,
              cy,
              selfLinkAngle[i],
              R
            )[0];
            let y = pointOnCircle(
              cx,
              cy,
              parseInt(cx) + R,
              cy,
              selfLinkAngle[i],
              R
            )[1];

            drawSelfCur(Tline[groupIndex][i], cx, cy, x, y, i);
          } else {
            let dis = pointDistance(cx, cy, cirLeft, cirTop);

            let tr = parseInt(R) + 10; //give some space for arrow
            //(startX-cirleft)/(cx-cirleft) = R/dis
            //(startY-cirtop)/(cy-cirtop) = R/dis
            let startX = (R / dis) * (cx - cirLeft) + parseInt(cirLeft);
            let startY = (R / dis) * (cy - cirTop) + parseInt(cirTop);

            //(endX-cirLeft)/(cx-cirLeft) = (dis-tr)/dis
            //(endY-cirTop)/(cy-cirTop) = (dis-tr)/dis
            let endX = ((dis - tr) / dis) * (cx - cirLeft) + parseInt(cirLeft);
            let endY = ((dis - tr) / dis) * (cy - cirTop) + parseInt(cirTop);

            //if two links
            if (Tline[i][groupIndex] != 0) {
              drawCurves(
                Tline[groupIndex][i],
                groupIndex,
                i,
                startX,
                startY,
                endX,
                endY,
                controlAngle,
                rotateAngle,
                tr
              );

              //reverse
              startX = ((dis - R) / dis) * (cx - cirLeft) + parseInt(cirLeft);
              startY = ((dis - R) / dis) * (cy - cirTop) + parseInt(cirTop);
              endX = (tr / dis) * (cx - cirLeft) + parseInt(cirLeft);
              endY = (tr / dis) * (cy - cirTop) + parseInt(cirTop);
              drawCurves(
                Tline[i][groupIndex],
                i,
                groupIndex,
                startX,
                startY,
                endX,
                endY,
                controlAngle,
                rotateAngle,
                tr
              );
            } else {
              Tline[groupIndex][i].setAttribute(
                "d",
                "M" + startX + " " + startY + "L" + endX + " " + endY
              );
            }
          }
          continue;
        }
        //as a end circle
        if (Tline[i][groupIndex] != 0) {
          let cx = circleArray[i].getAttribute("cx");
          let cy = circleArray[i].getAttribute("cy");
          let dis = pointDistance(cx, cy, cirLeft, cirTop);

          let tr = parseInt(R) + 10; //give some space for arrow
          //(startX-cx)/(cirleft-cx) = R/dis
          //(startY-cy)/(cirtop-cy) = R/dis
          let startX = (R / dis) * (cirLeft - cx) + parseInt(cx);
          let startY = (R / dis) * (cirTop - cy) + parseInt(cy);

          //(endX-cx)/(cirLeft-cx) = (dis-tr)/dis
          //(endY-cy)/(cirTop-cy) = (dis-tr)/dis
          let endX = ((dis - tr) / dis) * (cirLeft - cx) + parseInt(cx);
          let endY = ((dis - tr) / dis) * (cirTop - cy) + parseInt(cy);

          Tline[i][groupIndex].setAttribute(
            "d",
            "M" + startX + " " + startY + "L" + endX + " " + endY
          );
        }
      }

      document.onmouseup = function () {
        //change style
        // circle.setAttribute("r", parseInt(R));
        // bigCircle.setAttribute("r", parseInt(BR));

        document.onmousemove = null;
        document.onmouseup = null;
        updateData();
      };
      return false;
    };
  };
}

//when drag circles
function cirBindDragEventById(id) {
  let groupIndex = id.slice(1, id.length);
  groupIndex = parseInt(groupIndex);
  let elem = document.getElementById(id);
  let elemText = document.getElementById("t" + groupIndex);
  let bigCircle = document.getElementById("C" + groupIndex);

  //change style
  elem.onmouseenter = function () {
    this.style.stroke = enterColor;
    //bigCircle.style.stroke = enterColor;
  };
  elem.onmouseleave = function () {
    this.style.stroke = leaveColor;
    //bigCircle.style.stroke = leaveColor;
  };

  elem.onmousedown = function (event) {
    elem.setCapture && elem.setCapture();
    event = event || window.event;
    let dx = event.clientX - elem.getAttribute("cx");
    let dy = event.clientY - elem.getAttribute("cy");

    //change style
    // elem.setAttribute("r", parseInt(R)+5);
    // bigCircle.setAttribute("r", parseInt(BR)+5);

    document.onmousemove = function (event) {
      event = event || window.event;
      let left = event.clientX - dx;
      let top = event.clientY - dy;

      //deal with the boundary
      //bigCircle.getAttribute("r") = BR
      if (left <= bigCircle.getAttribute("r")) {
        left = bigCircle.getAttribute("r");
      }
      if (top <= bigCircle.getAttribute("r")) {
        top = bigCircle.getAttribute("r");
      }
      if (svgWidth - left <= bigCircle.getAttribute("r")) {
        left = svgWidth - bigCircle.getAttribute("r");
      }
      if (svgHeight - top <= bigCircle.getAttribute("r")) {
        top = svgHeight - bigCircle.getAttribute("r");
      }

      //avoid overlap(only two)
      let elemIndex = parseInt(id.slice(1, id.length));
      //circlePosition[elemIndex] = [left, top];

      if (stateNumber > 1) {
        for (let i = 1; i < stateNumber + 1; i++) {
          if (elemIndex != i) {
            let cir = document.getElementById("c" + i);
            let cirLeft1 = parseInt(cir.getAttribute("cx"));
            let cirTop1 = parseInt(cir.getAttribute("cy"));
            let dis = pointDistance(left, top, cirLeft1, cirTop1);
            if (dis <= parseInt(2 * BR + 5)) {
              //similar triangle
              let offY = ((2 * BR + 5 - dis) / dis) * (cirTop1 - top);
              let offX = ((2 * BR + 5 - dis) / dis) * (cirLeft1 - left);
              left = left - offX;
              top = top - offY;

              //boudary problem
              if (top <= BR) {
                top = BR;
                if (left >= cirLeft1) {
                  left =
                    cirLeft1 + Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
                } else {
                  left =
                    cirLeft1 - Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
                }
              }
              if (svgHeight - top <= BR) {
                top = svgHeight - BR;
                if (left >= cirLeft1) {
                  left =
                    cirLeft1 +
                    Math.sqrt((2 * BR) ** 2 - (svgHeight - BR - cirTop1) ** 2);
                } else {
                  left =
                    cirLeft1 -
                    Math.sqrt((2 * BR) ** 2 - (svgHeight - BR - cirTop1) ** 2);
                }
              }

              if (left <= BR) {
                left = BR;
                if (top >= cirTop1) {
                  top =
                    cirTop1 + Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
                } else {
                  top =
                    cirTop1 - Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
                }
              }
              if (svgWidth - left <= BR) {
                left = svgWidth - BR;
                if (top >= cirTop1) {
                  top =
                    cirTop1 +
                    Math.sqrt((2 * BR) ** 2 - (svgWidth - BR - cirLeft1) ** 2);
                } else {
                  top =
                    cirTop1 -
                    Math.sqrt((2 * BR) ** 2 - (svgWidth - BR - cirLeft1) ** 2);
                }
              }
            }
          }
        }
      }

      elem.setAttribute("cx", left);
      elem.setAttribute("cy", top);

      bigCircle.setAttribute("cx", left);
      bigCircle.setAttribute("cy", top);

      let textLeft = left;
      let textTop = top + textFontSize / 2 - 2;
      if (top === bigCircle.getAttribute("r")) {
        textTop = 58;
      }
      elemText.setAttribute("x", textLeft);
      elemText.setAttribute("y", textTop);

      //inputframe
      if (document.getElementById("f" + id.slice(1, id.length))) {
        let inputText = document.getElementById("f" + id.slice(1, id.length));
        let inputLeft = left - R + 5;
        let inputTop = top - textFontSize / 2 - 8;

        inputText.setAttribute("x", inputLeft);
        inputText.setAttribute("y", inputTop);
      }

      //lines
      for (let i = 1; i <= stateNumber; i++) {
        //as a start circle
        if (Tline[groupIndex][i] != 0) {
          let cx = circleArray[i].getAttribute("cx");
          let cy = circleArray[i].getAttribute("cy");

          if (i === groupIndex) {
            let x = pointOnCircle(
              cx,
              cy,
              parseInt(cx) + R,
              cy,
              selfLinkAngle[i],
              R
            )[0];
            let y = pointOnCircle(
              cx,
              cy,
              parseInt(cx) + R,
              cy,
              selfLinkAngle[i],
              R
            )[1];

            drawSelfCur(Tline[groupIndex][i], cx, cy, x, y, i);
          } else {
            let dis = pointDistance(cx, cy, left, top);

            let tr = parseInt(R) + 10; //give some space for arrow
            //(startX-left)/(cx-left) = R/dis
            //(startY-top)/(cy-top) = R/dis
            let startX = (R / dis) * (cx - left) + parseInt(left);
            let startY = (R / dis) * (cy - top) + parseInt(top);

            //(endX-Left)/(cx-Left) = (dis-tr)/dis
            //(endY-Top)/(cy-Top) = (dis-tr)/dis
            let endX = ((dis - tr) / dis) * (cx - left) + parseInt(left);
            let endY = ((dis - tr) / dis) * (cy - top) + parseInt(top);

            if (Tline[i][groupIndex] != 0) {
              drawCurves(
                Tline[groupIndex][i],
                groupIndex,
                i,
                startX,
                startY,
                endX,
                endY,
                controlAngle,
                rotateAngle,
                tr
              );

              //reverse
              startX = ((dis - R) / dis) * (cx - left) + parseInt(left);
              startY = ((dis - R) / dis) * (cy - top) + parseInt(top);
              endX = (tr / dis) * (cx - left) + parseInt(left);
              endY = (tr / dis) * (cy - top) + parseInt(top);
              drawCurves(
                Tline[i][groupIndex],
                i,
                groupIndex,
                startX,
                startY,
                endX,
                endY,
                controlAngle,
                rotateAngle,
                tr
              );
            } else {
              Tline[groupIndex][i].setAttribute(
                "d",
                "M" + startX + " " + startY + "L" + endX + " " + endY
              );
            }
          }
          continue;
        }
        //as a end circle
        if (Tline[i][groupIndex] != 0) {
          let cx = circleArray[i].getAttribute("cx");
          let cy = circleArray[i].getAttribute("cy");
          let dis = pointDistance(cx, cy, left, top);

          let tr = parseInt(R) + 10; //give some space for arrow
          //(startX-cx)/(left-cx) = R/dis
          //(startY-cy)/(top-cy) = R/dis
          let startX = (R / dis) * (left - cx) + parseInt(cx);
          let startY = (R / dis) * (top - cy) + parseInt(cy);

          //(endX-cx)/(Left-cx) = (dis-tr)/dis
          //(endY-cy)/(Top-cy) = (dis-tr)/dis
          let endX = ((dis - tr) / dis) * (left - cx) + parseInt(cx);
          let endY = ((dis - tr) / dis) * (top - cy) + parseInt(cy);

          Tline[i][groupIndex].setAttribute(
            "d",
            "M" + startX + " " + startY + "L" + endX + " " + endY
          );
        }
      }
    };

    document.onmouseup = function () {
      elem.releaseCapture && elem.releaseCapture();
      // elem.setAttribute("r", parseInt(R));
      // bigCircle.setAttribute("r", parseInt(BR));
      document.onmousemove = null;
      document.onmouseup = null;

      updateData();
    };
    return false;
  };
}

function pointDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current != null) {
    actualLeft = actualLeft + current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current != null) {
    actualTop = actualTop + current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

//get the curve controling point by angle, starPoint and endPoint
function getControlPoint(startX, startY, endX, endY, angle) {
  let point = [];
  angle = angle * (Math.PI / 180);
  let a = pointDistance(startX, startY, endX, endY) / 2;
  let b = a / Math.cos(angle);
  //alert("a: "+a+" "+"b: "+b);
  let phase1 = Math.atan(Math.abs(startY - endY) / Math.abs(startX - endX));
  //alert("phase1:"+phase1);
  //alert("angle:"+angle);
  let phase2 = Math.abs(angle - phase1);
  //alert("phase2:"+phase2);
  if (startX < endX && startY < endY) {
    if (angle > phase1) {
      point[0] = startX + b * Math.cos(phase2);
      point[1] = startY - b * Math.sin(phase2);
    } else {
      point[0] = startX + b * Math.cos(phase2);
      point[1] = startY + b * Math.sin(phase2);
    }
  }

  if (startX > endX && startY > endY) {
    if (angle > phase1) {
      point[0] = startX - b * Math.cos(phase2);
      point[1] = startY + b * Math.sin(phase2);
    } else {
      point[0] = startX - b * Math.cos(phase2);
      point[1] = startY - b * Math.sin(phase2);
    }
  }

  if (startX > endX && startY < endY) {
    if (angle > phase1) {
      point[0] = endX + b * Math.cos(phase2);
      point[1] = endY + b * Math.sin(phase2);
    } else {
      point[0] = endX + b * Math.cos(phase2);
      point[1] = endY - b * Math.sin(phase2);
    }
  }

  if (startX < endX && startY > endY) {
    if (angle > phase1) {
      point[0] = endX - b * Math.cos(phase2);
      point[1] = endY - b * Math.sin(phase2);
    } else {
      point[0] = endX - b * Math.cos(phase2);
      point[1] = endY + b * Math.sin(phase2);
    }
  }
  return point;
}

//get the point on the circle turnning an angle relative to (x,y)
function pointOnCircle(cx, cy, x, y, angle, r) {
  let point = [];
  angle = angle * (Math.PI / 180);
  cx = parseInt(cx);
  cy = parseInt(cy);
  if (x > cx) {
    phase1 = Math.atan((cy - y) / (x - cx));
  } else {
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

function drawCurves(
  line,
  startIndex,
  endIndex,
  startX,
  startY,
  endX,
  endY,
  contrAngle,
  rotAngle,
  r
) {
  let scx = circleArray[startIndex].getAttribute("cx");
  let scy = circleArray[startIndex].getAttribute("cy");
  let ecx = circleArray[endIndex].getAttribute("cx");
  let ecy = circleArray[endIndex].getAttribute("cy");

  //for Tline
  let conStarPoint = pointOnCircle(scx, scy, startX, startY, rotAngle, R);
  let conSx = conStarPoint[0];
  let conSy = conStarPoint[1];

  let conEndPoint = pointOnCircle(ecx, ecy, endX, endY, -rotAngle, r);
  let conEx = conEndPoint[0];
  let conEy = conEndPoint[1];

  let controlPoint = getControlPoint(conSx, conSy, conEx, conEy, contrAngle);
  line.setAttribute(
    "d",
    "M" +
      conSx +
      " " +
      conSy +
      "Q" +
      controlPoint[0] +
      " " +
      controlPoint[1] +
      " " +
      conEx +
      " " +
      conEy
  );
}

//dis(cx, cy, x, y)<=BR
function drawSelfCur(line, cx, cy, x, y, index) {
  cx = parseInt(cx);
  cy = parseInt(cy);
  //(cy-y)/(cy-endY)=dis(cx, cy, x, y)/R
  //(cx-x)/(cx-endX)=dis(cx, cy, x, y)/R
  let tr = parseInt(R) + 10;
  let endX = cx - ((cx - x) * tr) / pointDistance(cx, cy, x, y);
  let endY = cy - ((cy - y) * tr) / pointDistance(cx, cy, x, y);

  // record the angle of selflink line
  selfLinkAngle[index] = Math.atan((cy - endY) / (endX - cx)) * (180 / Math.PI);
  if (endX < cx) {
    selfLinkAngle[index] = selfLinkAngle[index] + 180;
  }
  let starPoint = pointOnCircle(cx, cy, endX, endY, 30, R);
  let startX = starPoint[0];
  let startY = starPoint[1];

  let Sphase = 10;
  let Ephase = -4;
  let r = parseInt(R) + 100;

  let startControl = pointOnCircle(cx, cy, startX, startY, Sphase, R);
  startControl[0] =
    cx -
    ((cx - startControl[0]) * r) /
      pointDistance(cx, cy, startControl[0], startControl[1]);
  startControl[1] =
    cy -
    ((cy - startControl[1]) * r) /
      pointDistance(cx, cy, startControl[0], startControl[1]);

  let endControl = pointOnCircle(cx, cy, endX, endY, Ephase, R);
  endControl[0] =
    cx -
    ((cx - endControl[0]) * r) /
      pointDistance(cx, cy, endControl[0], endControl[1]);
  endControl[1] =
    cy -
    ((cy - endControl[1]) * r) /
      pointDistance(cx, cy, endControl[0], endControl[1]);

  line.setAttribute(
    "d",
    "M" +
      startX +
      " " +
      startY +
      "C" +
      startControl[0] +
      " " +
      startControl[1] +
      " " +
      endControl[0] +
      " " +
      endControl[1] +
      " " +
      endX +
      " " +
      endY
  );
}

//add one new HTML between a specified positon by id
function addHtmlById(id, pos, content) {
  let Code = document.getElementById(id);
  Code.insertAdjacentHTML(pos, content);
}

//Decimal to binary
function decToBinary(dec, binaryLen) {
  let str = "";
  let restr = [];
  let reverse = "";

  for (let i = 0; i < binaryLen; i++) {
    str = str + (dec % 2);
    dec = parseInt(dec / 2);
  }

  if (str.length > 0) {
    restr = str.split("").reverse().join("");
  }
  for (let i = 0; i < str.length; i++) {
    reverse = reverse + restr[i];
  }
  return reverse;
}
