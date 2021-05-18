import { pointDistance, drawSelfCur, drawCurves } from "../../drag/drag.js";
import { createElem, getElementLeft, getElementTop } from "../../../utils.js";
import {
  updateData,
  createLineTable,
} from "../../../dataHandler/dataHandler.js";
import lineClick from '../line/lineClick.js';

export default function bigCircleMouseDown(event) {
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
  let startX = (R / dis) * (x - circleCx) + parseInt(circleCx);
  let startY = parseInt(circleCy) - (R / dis) * (circleCy - y);

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
    let startXm = (R / dism) * (xm - circleCx) + parseInt(circleCx);
    let startYm = parseInt(circleCy) - (R / dism) * (circleCy - ym);

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

    let startXu = (R / disu) * (xu - circleCx) + parseInt(circleCx);
    let startYu = parseInt(circleCy) - (R / disu) * (circleCy - yu);

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
