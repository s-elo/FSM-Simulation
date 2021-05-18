export default function textClick(event) {
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
