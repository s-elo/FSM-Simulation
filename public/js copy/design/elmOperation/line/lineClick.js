export default function lineClick(event) {
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
  const line = this;

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
