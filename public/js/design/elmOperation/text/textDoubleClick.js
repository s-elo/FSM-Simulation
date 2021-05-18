import { createElem, getElementLeft, getElementTop } from "../../../utils.js";
import { pointDistance } from "../../drag/drag.js";
import { updateData } from "../../../dataHandler/dataHandler.js";

export default function textDoubleClick() {
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
      try {
        foreign.parentNode.removeChild(foreign);
      } catch (err) {}
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
