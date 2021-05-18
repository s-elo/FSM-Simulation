import { updateData } from "../../../dataHandler/dataHandler.js";
import {
  pointDistance,
  pointOnCircle,
  drawSelfCur,
  drawCurves,
} from "../../drag/drag.js";

export default function cirBindDragEventById(id) {
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
