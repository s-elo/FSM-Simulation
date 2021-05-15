import updateData from "../../dataHandler/updateData.js";

export function setStartState(
  stateNumber,
  circleFlag,
  bigCircleArray,
  textArray,
  startState
) {
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

export function deleteClick() {
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
}

export function clearAllClick() {
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
}
